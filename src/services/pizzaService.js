import sql from 'mssql';
import configDB from '../models/db.js';

export const getAll = async () => {
    const conn = await sql.connect(configDB);
    const results = await conn.request().query('SELECT * FROM Pizzas');
    return results.recordset;
}


export const getById = async (id) => {
    const conn = await sql.connect(configDB);
    const results = await conn.request().input("pId",id).query('SELECT * FROM Pizzas WHERE @pId = id');
    return results.recordset;
}

export const insert = async (pizza) => {
    const conn = await sql.connect(configDB);
    const results = await conn.request() 
    .input( "pNombre", sql.VarChar, pizza.Nombre)
    .input("pLibreGluten", sql.Bit, pizza.LibreGluten)
    .input( "pImporte", sql.Float, pizza.Importe)
    .input("pDescripcion", sql.VarChar, pizza.Descripcion)
    .query('INSERT INTO Pizzas (Nombre, LibreGluten, Importe, Descripcion) VALUES (@pNombre, @pLibreGluten, @pImporte, @pDescripcion)');

    return results.recordset;
}



export const updateById = async (id, pizza) => {
    const conn = await sql.connect(configDB);
    const results = await conn.request().input("pId", id)
    .input( "pNombre", sql.VarChar, pizza.Nombre)
    .input("pLibreGluten", sql.Bit, pizza.LibreGluten)
    .input( "pImporte", sql.Float, pizza.Importe)
    .input("pDescripcion", sql.VarChar, pizza.Descripcion)
    .query('UPDATE Pizzas SET Nombre = @pNombre, Descripcion = @pDescripcion, LibreGluten = @pLibreGluten, Importe = @pImporte  WHERE @pId = id ');

    return results;
}


export const deleteById = async (id) => {
    const conn = await sql.connect(configDB);
    const results = await conn.request().input("pId", id).query('DELETE FROM Pizzas WHERE @pId = id');

    return results;
}
