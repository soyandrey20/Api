import { getConnection } from '../dataBase/connection.js';
import sql from 'mssql';

export const getUsers = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM usuarios");
    console.log(result.recordset);
    res.json(result.recordset);
}

export const getUser = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('cedula', sql.Int, req.params.id)

            .query("SELECT * FROM usuarios WHERE cedula = @cedula");

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        } else {
            console.log(result.recordset[0]);
            res.json(result.recordset[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
}



export const creatUser = async (req, res) => {
    console.log(req.body);

    const pool = await getConnection();

    const result = await pool
        .request()
        .input('Cedula', sql.VarChar, req.body.Cedula)
        .input('Name_1', sql.VarChar, req.body.name_1)
        .input('LastName_1', sql.VarChar, req.body.LastName_1)
        .input('LastName_2', sql.VarChar, req.body.LastName_2)
        .input('Email', sql.VarChar, req.body.email)
        .input('Password', sql.VarChar, req.body.password)
        .input('Permisos', sql.VarChar, req.body.Permisos)
        .query('INSERT into Usuarios (Cedula,Name_1,LastName_1,LastName_2,Email,Password,Permisos) VALUES (@Cedula,@Name_1,@LastName_1,@LastName_2,@Email,@Password,@Permisos);SELECT SCOPE_IDENTITY() as Cedula;');
    console.log(result);
    res.json({
        Cedula: req.body.Cedula,
        Name_1: req.body.Name_1,
        LastName_1: req.body.LastName_1,
        LastName_2: req.body.LastName_2,
        Email: req.body.Email,
        Password: req.body.Password,
        Permisos: req.body.Permisos
    });


}

export const updateUser = async (req, res) => {

    const pool = await getConnection();
    const result = await pool.request()
        .input('Cedula', sql.Int, req.body.cedula)
        .input('Email', sql.VarChar, req.body.email)
        .input('Password', sql.VarChar, req.body.password)
        .input('Name_1', sql.VarChar, req.body.name_1)
        .input('LastName_1', sql.VarChar, req.body.LastName_1)
        .input('LastName_2', sql.VarChar, req.body.LastName_2)
        .query(`UPDATE Usuarios SET  email = @email, password = @password, name_1 = @name_1, LastName_1 = @LastName_1, LastName_2 = @LastName_2 WHERE Cedula = @Cedula`);
    console.log(result);
    if (result.rowsAffected[0] == 0) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
    } else {
        return res.json({
            cedula: req.params.cedula,
            name_1: req.body.name_1,
            LastName_1: req.body.LastName_1,
            LastName_2: req.body.LastName_2,
            email: req.body.email,
            password: req.body.password
        });
    }
}

export const deleteUser = async (req, res) => {

    const pool = await getConnection();

    const result = await pool
        .request()
        .input('Cedula', sql.Int, req.params.cedula)
        .query('DELETE FROM Registros WHERE Cedula = @Cedula');
    console.log(result);
    if (result.rowsAffected[0] == 0) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
    } else {
        return res.json({ msg: "Usuario eliminado" });
    }
}
