import { getConnection } from '../database/connection.js';
import sql from 'mssql';

export const getUsers = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Usuarios");

    res.json(result.recordset);
}

export const getUser = async (req, res) => {

    console.log(req.params.id);

    const pool = await getConnection();
    const result = await pool.request()
        .input('id', sql.Int, req.params.id)
        .query("SELECT * FROM Usuarios WHERE id =  @id");

    if (result.rowsAffected[0] == 0) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
    } else {
        return res.json(result.recordset[0]);
    }
}


export const creatUser = async (req, res) => {
    console.log(req.body);

    const pool = await getConnection();

    const result = await pool
        .request()
        .input('name_1', sql.VarChar, req.body.name_1)
        .input('LastName_1', sql.VarChar, req.body.LastName_1)
        .input('LastName_2', sql.VarChar, req.body.LastName_2)
        .input('email', sql.VarChar, req.body.email)
        .input('password', sql.VarChar, req.body.password)
        .query('INSERT into Registros (name_1,LastName_1,LastName_2,email,password) VALUES (@name_1,@LastName_1,@LastName_2,@email,@password);SELECT SCOPE_IDENTITY() as id');
    console.log(result);
    res.json({
        id: result.recordset[0].id,
        name_1: req.body.name_1,
        LastName_1: req.body.LastName_1,
        LastName_2: req.body.LastName_2,
        email: req.body.email,
        password: req.body.password
    });
    

}

export const updateUser = async (req, res) => {

    const pool = await getConnection();
    const result = await pool.request()
        .input('id', sql.Int, req.params.id)
        .input('email', sql.VarChar, req.body.email)
        .input('password', sql.VarChar, req.body.password)
        .query(`UPDATE Usuarios SET email = @email, password = @password WHERE id = @id`);
    console.log(result);
    if (result.rowsAffected[0] == 0) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
    } else {
        return res.json({
            id: req.params.id,
            email: req.body.email,
            password: req.body.password
        });
    }
}

export const deleteUser = async (req, res) => {

    const pool = await getConnection();

    const result = await pool
        .request()
        .input('id', sql.Int, req.params.id)
        .query('DELETE FROM Usuarios WHERE id = @id');
    console.log(result);
    if (result.rowsAffected[0] == 0) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
    } else {
        return res.json({ msg: "Usuario eliminado" });
    }
}
