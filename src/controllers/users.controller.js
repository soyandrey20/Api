import { getConnection } from '../dataBase/connection.js';
import sql from 'mssql';
import { enviarCorreo } from '../mailer.js';


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
            .input('cedula', sql.NVarChar, req.params.id)

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
        .input('Name_2', sql.VarChar, req.body.name_2)
        .input('LastName_1', sql.VarChar, req.body.LastName_1)
        .input('LastName_2', sql.VarChar, req.body.LastName_2)
        .input('Email', sql.VarChar, req.body.email)
        .input('Password', sql.VarChar, req.body.password)
        .input('Permisos', sql.VarChar, req.body.Permisos)
        .input('Estado', sql.Bit, req.body.Estado)
        .query('INSERT into Usuarios (Cedula,Name_1,Name_2,LastName_1,LastName_2,Email,Password,Permisos,Estado) VALUES (@Cedula,@Name_1,@Name_2,@LastName_1,@LastName_2,@Email,@Password,@Permisos,@Estado);SELECT SCOPE_IDENTITY() as Cedula;');
    console.log(result);
    res.json({
        Cedula: req.body.Cedula,
        Name_1: req.body.Name_1,
        Name_2: req.body.Name_2,
        LastName_1: req.body.LastName_1,
        LastName_2: req.body.LastName_2,
        Email: req.body.Email,
        Password: req.body.Password,
        Permisos: req.body.Permisos,
        Estado: req.body.Estado
    });


}

export const updateUser = async (req, res) => {

    const pool = await getConnection();
    const result = await pool.request()
        .input('Cedula', sql.VarChar, req.body.cedula)
        .input('Email', sql.VarChar, req.body.email)
        .input('Password', sql.VarChar, req.body.password)
        .input('Name_1', sql.VarChar, req.body.name_1)
        .input('Name_2', sql.VarChar, req.body.name_2)
        .input('LastName_1', sql.VarChar, req.body.LastName_1)
        .input('LastName_2', sql.VarChar, req.body.LastName_2)
        .input('Permisos', sql.VarChar, req.body.Permisos)
        .input('Estado', sql.Bit, req.body.Estado)

        .query(`UPDATE Usuarios SET  email = @email, password = @password, Name_1 = @Name_1, LastName_1 = @LastName_1, LastName_2 = @LastName_2, Permisos = @Permisos, Estado=@Estado WHERE Cedula = @Cedula`);
    console.log(req.body.Estado);
    if (result.rowsAffected[0] == 0) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
    } else {
        return res.json({
            cedula: req.params.cedula,
            name_1: req.body.name_1,
            name_2: req.body.name_2,
            LastName_1: req.body.LastName_1,
            LastName_2: req.body.LastName_2,
            email: req.body.email,
            password: req.body.password,
            permisos: req.body.Permisos,
            Estado: req.body.Estado
        });
    }
}

// export const deleteUser = async (req, res) => {

//     const pool = await getConnection();

//     const result = await pool
//         .request()
//         .input('Cedula', sql.Int, req.params.cedula)
//         .query('DELETE FROM Registros WHERE Cedula = @Cedula');
//     console.log(result);
//     if (result.rowsAffected[0] == 0) {
//         return res.status(404).json({ msg: "Usuario no encontrado" });
//     } else {
//         return res.json({ msg: "Usuario eliminado" });
//     }
// }

export const deleteUser = async (req, res) => {

    const pool = await getConnection();
    const result = await pool.request()
        .input('Cedula', sql.VarChar, req.body.cedula)

        .input('Estado', sql.Bit, req.body.Estado)

        .query(`UPDATE Usuarios SET   Estado=@Estado WHERE Cedula = @Cedula`);
    console.log(req.body.Estado);
    if (result.rowsAffected[0] == 0) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
    } else {
        return res.json({
            cedula: req.params.cedula,

            Estado: req.body.Estado
        });
    }
}

export const getPassword = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('cedula', sql.Int, req.params.id)

            .query("SELECT * FROM usuarios WHERE cedula = @cedula");

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        } else {



            enviarCorreo(result.recordset[0].Email,
                'Contraseña de tu Cuenta', 'Estimado ' + result.recordset[0].Name_1 +

                ',\n\n\nEspero que este mensaje te encuentre bien.' +
                ' En respuesta a tu solicitud de restablecimiento de contraseña,' +
                ' Aqui esta la contraseña para tu cuenta.' +
                '\nA continuación, encontrarás tus credenciales: ' +

                '\n\nNombre de usuario: ' + result.recordset[0].Cedula +
                '\nContraseña: ' + result.recordset[0].Password +

                '\n\n\nSi tienes alguna pregunta o necesitas asistencia adicional,' +
                ' no dudes en ponerte en contacto con nuestro equipo de soporte.' +

                '\n\n\nGracias por tu comprensión y cooperación. \n' +

            '\n\nAtentamente, \nEl equipo de soporte Techno Croption.'



            );

            res.json({
                msg: "Correo enviado",

            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }


}