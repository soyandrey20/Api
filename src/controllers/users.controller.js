import { getConnection } from '../dataBase/connection.js';
import sql from 'mssql';
import { enviarCorreo } from '../mailer.js';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

export const getUsers = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM usuarios");
    console.table(result.recordset);
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
            console.table(result.recordset[0]);



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
    console.table(result.recordset);
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
    console.table(req.body);

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
    console.table(req.body.Cedula);
    const result = await pool.request()
        .input('cedula', sql.VarChar, req.body.Cedula)
        .input('id_tipo_persona', sql.Int, req.body.id_tipo_persona)
        .input('Nombre_1', sql.VarChar, req.body.Nombre_1)
        .input('Nombre_2', sql.VarChar, req.body.Nombre_2)
        .input('LastName_1', sql.VarChar, req.body.LastName_1)
        .input('LastName_2', sql.VarChar, req.body.LastName_2)
        .input('Email', sql.VarChar, req.body.Email)

        .query(`UPDATE persona SET id_tipo_persona = @id_tipo_persona, Nombre_1 = @Nombre_1, Nombre_2 = @Nombre_2, LastName_1 = @LastName_1, LastName_2 = @LastName_2, Email = @Email WHERE Cedula = @cedula`);

    if (result.rowsAffected[0] == 0) {
        console.table(result.rowsAffected[0]);
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






    console.table(req.body.Estado);
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
        console.table(cedula);
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
Estimado(a) ${name}\n:

Nos complace informarle que su solicitud de restablecimiento de contraseña ha sido procesada exitosamente. A continuación, encontrará sus credenciales de inicio de sesión para acceder a su cuenta de Techno Croption:\n

Nombre de usuario: ${cedula}\n
Contraseña:  ${contraseña} \n

Recomendaciones de seguridad:\n

-Por su seguridad, le recomendamos cambiar su contraseña actual por una nueva y compleja que incluya mayúsculas, minúsculas, números y símbolos especiales.\n
-Evite utilizar la misma contraseña para diferentes cuentas.\n
-No comparta su contraseña con nadie.\n
-Mantenga su información personal y de cuenta actualizada.\n

Soporte técnico:\n
Si tiene alguna pregunta o necesita asistencia adicional para acceder a su cuenta, no dude en ponerse en contacto con nuestro equipo de soporte técnico a través de los siguientes canales:\n

Correo electrónico: TechnoCroption@gmail.com\n
Teléfono: +1 (123) 456-7890\n
Chat en línea:  https://www.TechnoCroption.com/chat\n
Agradecimiento:\n

Agradecemos su comprensión y cooperación. Esperamos que continúe disfrutando de los servicios que ofrece Techno Croption.\n

Con cuidado,\n

El equipo de soporte Techno Croption\n
      `;

        enviarCorreo(email, 'Credenciales de inicio de sesión para su cuenta de Techno Croption', emailContent);

        res.json({ msg: "Correo enviado" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};
export const exportPDF = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query("SELECT * FROM persona");
  
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
  
      const headers = ['Cédula', 'Primer Nombre', 'Segundo Nombre', 'Primer Apellido', 'Segundo Apellido', 'Email', 'Estado', 'ID Tipo Persona'];
      const tableWidth = 500;
        const columnWidths = {
            Cedula: 100,
            'Primer Nombre': 100,
            'Segundo Nombre': 100,
            'Primer Apellido': 100,
            'Segundo Apellido': 100,
            Email: 100,
            Estado: 100,
            'ID Tipo Persona': 100,
        };
      const cellPadding = 15;
      const fontSize = 12;
      const textHeight = fontSize + cellPadding;
  
      let x = 50;
      let y = page.getHeight() - 50 - textHeight;
      let y0 = y;
  
      // Dibujar encabezados de la tabla
      headers.forEach(header => {
        const columnWidth = columnWidths[header] || (tableWidth / headers.length);
        page.drawText(header, {
          x,
          y,
          size: fontSize,
        });
        x += columnWidth;
      });
  
      x = 50;
      y -= textHeight;
  
      // Dibujar filas de la tabla
      result.recordset.forEach(row => {
        const rowData = [];
        headers.forEach(header => {
          rowData.push(row[header]);
        });
  
        rowData.forEach((cell, index) => {
          const columnWidth = columnWidths[headers[index]] || (tableWidth / headers.length);
          page.drawText(cell.toString(), {
            x,
            y,
            size: fontSize,
          });
          x += columnWidth;
        });
  
        x = 50;
        y -= textHeight;
      });
  
      // Guardar el PDF en un archivo
      const pdfBytes = await pdfDoc.save();
      fs.writeFileSync('Listado_usuarios.pdf', pdfBytes);
  
      // Enviar el archivo PDF como respuesta
      res.download('Listado_usuarios.pdf', 'Listado_usuarios.pdf', (err) => {
        if (err) {
          console.error('Error sending PDF file:', err);
        } else {
          console.log('PDF file sent successfully');
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  };
  