import { getConnection } from '../dataBase/connection.js';
import sql from 'mssql';
import { enviarCorreo } from '../mailer.js';


export const getUsers = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM usuarios");

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
export const getPeople = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM persona");
    console.log(result.recordset);
    res.json(result.recordset);
}

export const getPerson = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('cedula', sql.NVarChar, req.params.id)

            .query("SELECT * FROM persona WHERE cedula = @cedula");

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        } else {



            res.json(result.recordset[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
}


export const createUser = async (req, res) => {
    console.log(req.body);

    const pool = await getConnection();

    const request = new sql.Request();

    // Primera consulta para insertar en la tabla persona
    await request
        .input('Cedula', sql.VarChar, req.body.Cedula)
        .input('id_tipo_persona', sql.Int, req.body.id_tipo_persona)
        .input('Nombre_1', sql.VarChar, req.body.Nombre_1)
        .input('Nombre_2', sql.VarChar, req.body.Nombre_2)
        .input('LastName_1', sql.VarChar, req.body.LastName_1)
        .input('LastName_2', sql.VarChar, req.body.LastName_2)
        .input('Email', sql.VarChar, req.body.Email)

        .input('Estado', sql.Bit, true)
        .query(`INSERT INTO persona (Cedula, id_tipo_persona, Nombre_1, Nombre_2, LastName_1, LastName_2, Email, Estado) VALUES (@Cedula, @id_tipo_persona, @Nombre_1, @Nombre_2, @LastName_1, @LastName_2, @Email, @Estado)`);
    // Segunda consulta para insertar en la tabla Usuarios
    await request
        .input('Cedula_usuario', sql.VarChar, req.body.Cedula)
        .input('Password', sql.VarChar, req.body.password)
        .input('Permisos_usuario', sql.VarChar, req.body.Permisos)
        .input('Estado_usuario', sql.Bit, true)
        .query(`INSERT INTO Usuarios (Cedula, Password, Permisos, Estado) VALUES (@Cedula_usuario, @Password, @Permisos_usuario, @Estado_usuario)`);
    res.json(req.body);
}


export const updateUser = async (req, res) => {
    const pool = await getConnection();
    console.log(req.body.Cedula);
    const result = await pool.request()
        .input('cedula', sql.VarChar, req.body.Cedula)
        .input('id_tipo_persona', sql.Int, req.body.id_tipo_persona)
        .input('Nombre_1', sql.VarChar, req.body.Nombre_1)
        .input('Nombre_2', sql.VarChar, req.body.Nombre_2)
        .input('LastName_1', sql.VarChar, req.body.LastName_1)
        .input('LastName_2', sql.VarChar, req.body.LastName_2)
        .input('Email', sql.VarChar, req.body.Email)
        .input('Estado', sql.Bit, req.body.Estado)
        .query(`UPDATE persona SET id_tipo_persona = @id_tipo_persona, Nombre_1 = @Nombre_1, Nombre_2 = @Nombre_2, LastName_1 = @LastName_1, LastName_2 = @LastName_2, Email = @Email, Estado = @Estado WHERE Cedula = @cedula`);

    if (result.rowsAffected[0] == 0) {
        console.log(result.rowsAffected[0]);
        return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    res.json({
        cedula: req.params.id,
        Nombre_1: req.body.Nombre_1,
        Nombre_2: req.body.Nombre_2,
        LastName_1: req.body.LastName_1,
        LastName_2: req.body.LastName_2,
        Email: req.body.Email,
        Estado: req.body.Estado
    });
}


export const deleteUser = async (req, res) => {

    const pool = await getConnection();
    const request = new sql.Request();
    await request
        .input('Cedula', sql.VarChar, req.body.cedula)
        .input('Estado', sql.Bit, req.body.Estado)
        .query(`UPDATE Usuarios SET   Estado=@Estado WHERE Cedula = @Cedula`);

    await request
        .input('Cedula_persona', sql.VarChar, req.body.cedula)
        .input('Estado_persona', sql.Bit, req.body.Estado)
        .query(`UPDATE persona SET   estado=@Estado_persona WHERE Cedula = @Cedula_persona`);






    console.log(req.body.Estado);
    if (req.body.Estado == 1) {
        res.json({ msg: "Usuario activado" });
    } else {
        res.json({ msg: "Usuario desactivado" });

    }

}

export const getPassword = async (req, res) => {
    try {
        const pool = await getConnection();
        const cedula = req.body.id; 
        console.log(cedula);
        const [usuariosResult, personaResult] = await Promise.all([
            new sql.Request()
                .input('cedula', sql.VarChar, cedula)
                .query("SELECT Password FROM usuarios WHERE Cedula = @cedula"),
            new sql.Request()
                .input('cedula', sql.VarChar, cedula)
                .query("SELECT Nombre_1 AS name, email FROM persona WHERE cedula = @cedula")
        ]);

        if (usuariosResult.recordset.length === 0 || personaResult.recordset.length === 0) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        const { Password: contraseña } = usuariosResult.recordset[0];
        const { name, email } = personaResult.recordset[0];

        const emailContent = `
        Estimado ${name},
  
        \n\n\nEspero que este mensaje te encuentre bien.
  
        En respuesta a tu solicitud de restablecimiento de contraseña, aquí está la contraseña para tu cuenta.
  
        \nA continuación, encontrarás tus credenciales:
  
        \n\nNombre de usuario: ${cedula}
        \nContraseña: ${contraseña}
  
        \n\n\nSi tienes alguna pregunta o necesitas asistencia adicional, no dudes en ponerte en contacto con nuestro equipo de soporte.
  
        \n\n\nGracias por tu comprensión y cooperación.
  
        \n\nAtentamente,
  
        El equipo de soporte Techno Croption.
      `;

        enviarCorreo(email, 'Contraseña de tu Cuenta', emailContent);

        res.json({ msg: "Correo enviado" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

