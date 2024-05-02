import { getConnection } from '../dataBase/connection.js';
import sql from 'mssql';


export const createTipeParameters = async (req, res) => {
    console.log(req.body);

    const pool = await getConnection();

    const result = await pool
        .request()

        .input('Descripcion', sql.VarChar, req.body.Descripcion)
        .query('INSERT into Tipo_parametro (Descripcion) VALUES (@Descripcion);SELECT SCOPE_IDENTITY() as Descripcion;');
    console.log(result);
    res.json({
        msg: 'Parametro creado',
        Descripcion: req.body.Descripcion,
    });
}

export const getTipeParameters = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Tipo_parametro');
    console.log(result.recordset[0]);
    res.json(result.recordset);

}


export const createTipeSensors = async (req, res) => {
    console.log(req.body);

    const pool = await getConnection();

    const result = await pool
        .request()

        .input('Descripcion', sql.VarChar, req.body.Descripcion)
        .query('INSERT into Tipo_sensor (Descripcion) VALUES (@Descripcion);SELECT SCOPE_IDENTITY() as Descripcion;');
    console.log(result);
    res.json({
        msg: 'Parametro creado',
        Descripcion: req.body.Descripcion,
    });
}

export const createSensors = async (req, res) => {
    console.log(req.body);

    const pool = await getConnection();

    const result = await pool
        .request()

        .input('informacion', sql.VarChar, req.body.informacion)
        .input('id_tp_sensor', sql.Int, req.body.id_tp_sensor)
        .query('INSERT into sensor (informacion,id_tp_sensor) VALUES (@informacion,@id_tp_sensor);SELECT SCOPE_IDENTITY() as Descripcion;');
    console.log(result);
    res.json({
        msg: 'Parametro creado',
        Descripcion: req.body.Descripcion,
    });
}



export const getTipeSensors = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Tipo_sensor');
    res.json(result.recordset);
    console.log(result.recordset[0]);
}

export const deleteTipeSensor = async (req, res) => {

    const pool = await getConnection();

    const result = await pool
        .request()
        .input('Descripcion', sql.VarChar, req.params.Descripcion)
        .query('DELETE FROM Tipo_sensor WHERE Descripcion = @Descripcion');
    console.log(result);
    if (result.rowsAffected[0] == 0) {
        return res.status(404).json({ msg: "Tipo de sensor no encontrado" });
    } else {
        return res.json({ msg: "Tipo de sensor eliminado" });
    }
}