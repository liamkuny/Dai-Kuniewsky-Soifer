import { getAll, getById, updateById, deleteById, insert } from './services/pizzaService.js';
import express from "express"
import Pizza from './models/pizza.js';

const app = express()
const port = 3000

app.use(express.json())

app.get('/', async(req, res) => {
    const pizzas = await getAll()
    res.status(200).send(pizzas)
})


app.get('/:id', async(req, res) => {
    const id = req.params.id
    if(id<1)
    {
        res.status(400).send()
    }
    const pizzasId = await getById(id)
    console.log(pizzasId)
     if(pizzasId[0]==null)
     {
        res.status(404).send()
     }
    res.status(200).send(pizzasId)
})


app.post('/', async(req, res) => {
    const pizza = new Pizza();
    pizza.Nombre = req.body.Nombre
    pizza.LibreGluten = req.body.LibreGluten
    pizza.Importe = req.body.Importe
    pizza.Descripcion = req.body.Descripcion
    console.log(pizza.Nombre)
    const pizzasCreadas = await insert(pizza)
    res.status(201).send(pizzasCreadas)
})

app.put('/:id', async(req, res) => {
    const id = req.params.id

    
    if(id!=req.body.Id)
    {
      res.status(400).send()
    }

    const pizza = new Pizza();
    pizza.Nombre = req.body.Nombre
    pizza.LibreGluten = req.body.LibreGluten
    pizza.Importe = req.body.Importe
    pizza.Descripcion = req.body.Descripcion

    const pizzasCambiadas = await updateById(id, pizza)

    if(pizzasCambiadas.rowsAffected[0]==0)
    {
        res.status(404).send()
    }
    res.status(200).send(pizzasCambiadas)
})

app.delete('/:id', async(req, res) => {
    const id = req.params.id
    if(id<1)
    {
        res.status(400).send()
    }
    const pizzasEliminadas = await deleteById(id)

    if(pizzasEliminadas.rowsAffected[0]==0)
    {
        res.status(404).send()
    }
    res.status(200).send(pizzasEliminadas)

})

app.listen(port, async( ) => {
    console.log(`Example app listening on port ${port}`)
})