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
        msg: 'sensor creado',
       
    });
}
export const createParametro = async (req, res) => {
    console.log(req.body);

    const pool = await getConnection();

    const result = await pool
        .request()

        .input('inferior', sql.VarChar, req.body.inferior)
        .input('superior', sql.VarChar, req.body.superior)
        .input('id_tp_para', sql.Int, req.body.id_tp_para)
        .query('INSERT into Parametro ( id_Tp_Parametro,Rango_inferior,Rango_Superior) VALUES ( @id_tp_para,@inferior,@superior); ');
    console.log(result);
    res.json({
        msg: 'Parametro creado',
       
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


export const createParaSensor = async (req, res) => {
    console.log(req.body);

    const pool = await getConnection();

    const result = await pool
        .request()

        .input('id_sensor', sql.Int, req.body.id_sensor)
        .input('id_parametro', sql.Int, req.body.id_parametro)
        .query('INSERT into Parametro_sensor (id_sensor,id_parametro) VALUES (@id_sensor,@id_parametro);SELECT SCOPE_IDENTITY() as Descripcion;');
    console.log(result);
    res.json({
        msg: 'Parametro creado',
        Descripcion: req.body.Descripcion,
    });
}


export const getParaSensor = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Parametro_sensor');
    res.json(result.recordset);
    console.log(result.recordset);
}