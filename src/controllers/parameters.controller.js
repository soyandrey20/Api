import { getConnection } from '../dataBase/connection.js';
import sql from 'mssql';
import { enviarCorreo } from '../mailer.js';

import bodyParser from 'body-parser';

import express from 'express';

const app = express();



/**-----------------------Tipo de parametros */
export const createTipeParameters = async (req, res) => {
    console.table(req.body);

    const pool = await getConnection();

    const result = await pool
        .request()

        .input('Descripcion', sql.VarChar, req.body.Descripcion)
        .input('estado', sql.Bit, true)
        .query('INSERT into Tipo_parametro (Descripcion,estado) VALUES (@Descripcion,@estado);SELECT SCOPE_IDENTITY() as Descripcion;');
    console.table(result);
    res.json({
        msg: 'Parametro creado',
        Descripcion: req.body.Descripcion,
    });
}

export const getTipeParameters = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Tipo_parametro');
    console.table(result.recordset[0]);
    res.json(result.recordset);

}

export const updateTipeParameters = async (req, res) => {

    const pool = await getConnection();
    const request = new sql.Request();
    await request
        .input('Id', sql.VarChar, req.body.id)
        .input('Descripcion', sql.VarChar, req.body.Descripcion)
        .input('estado', sql.Bit, req.body.estado)
        .query(`UPDATE Tipo_parametro SET Descripcion=@Descripcion,  estado=@estado WHERE ID = @Id`);

    console.table(req.body.estado);
    if (req.body.estado == 1) {
        res.json({ msg: "Usuario activado" });
    } else {
        res.json({ msg: "Usuario desactivado" });

    }

}

export const deleteTipeParameters = async (req, res) => {

    const pool = await getConnection();
    const request = new sql.Request();
    await request
        .input('Id', sql.VarChar, req.body.id)
        .input('estado', sql.Bit, req.body.estado)
        .query(`UPDATE Tipo_parametro SET    estado=@estado WHERE ID = @Id`);

    console.table(req.body.Estado);
    if (req.body.Estado == 1) {
        res.json({ msg: "Usuario activado" });
    } else {
        res.json({ msg: "Usuario desactivado" });

    }

}






/** ----------------------------tipo de sensores ------------------------ */



export const createTipeSensors = async (req, res) => {
    console.table(req.body);

    const pool = await getConnection();

    const result = await pool
        .request()

        .input('Descripcion', sql.VarChar, req.body.Descripcion)
        .input('estado', sql.Bit, true)
        .query('INSERT into Tipo_sensor (Descripcion,estado) VALUES (@Descripcion,@estado);SELECT SCOPE_IDENTITY() as Descripcion;');
    console.table(result);
    res.json({
        msg: 'sensor creado',
        Descripcion: req.body.Descripcion,
    });
}

export const getTipeSensors = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Tipo_sensor');
    res.json(result.recordset);
    console.table(result.recordset[0]);
}

export const updateTipeSensors = async (req, res) => {

    const pool = await getConnection();
    const request = new sql.Request();
    await request
        .input('Id', sql.VarChar, req.body.id)
        .input('Descripcion', sql.VarChar, req.body.Descripcion)
        .input('estado', sql.Bit, req.body.estado)
        .query(`UPDATE Tipo_sensor SET Descripcion=@Descripcion, estado=@estado WHERE Id = @Id`);

    console.table(req.body.estado);
    if (req.body.estado == 1) {
        res.json({ msg: "Usuario activado" });
    } else {
        res.json({ msg: "Usuario desactivado" });

    }

}




export const deleteTipeSensor = async (req, res) => {

    const pool = await getConnection();
    const request = new sql.Request();
    await request
        .input('Id', sql.VarChar, req.body.id)
        .input('estado', sql.Bit, req.body.estado)
        .query(`UPDATE Tipo_sensor SET    estado=@estado WHERE ID = @Id`);

    console.table(req.body.estado);
    if (req.body.estado == 1) {
        res.json({ msg: "Usuario activado" });
    } else {
        res.json({ msg: "Usuario desactivado" });

    }
}


/** -------------------------------------------------------parametros ---------------------------------*/
export const createParametro = async (req, res) => {
    console.table(req.body);

    const pool = await getConnection();

    const result = await pool
        .request()

        .input('Rango_inferior', sql.VarChar, req.body.Rango_inferior)
        .input('Rango_Superior', sql.VarChar, req.body.Rango_Superior)
        .input('id_Tp_Parametro', sql.Int, req.body.id_Tp_Parametro)
        .input('estado', sql.Bit, true)
        .query('INSERT into Parametro (Rango_inferior,Rango_Superior,id_Tp_Parametro,estado) VALUES (@Rango_inferior,@Rango_Superior,@id_Tp_Parametro,@estado);SELECT SCOPE_IDENTITY() as Descripcion;');
    console.table(result);
    res.json({
        msg: 'Parametro creado',

    });
}
export const getParametro = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Parametro');
    res.json(result.recordset);
    console.table(result.recordset);
}

export const updateParametro = async (req, res) => {

    const pool = await getConnection();
    const request = new sql.Request();
    await request
        .input('id', sql.VarChar, req.body.id)
        .input('Rango_inferior', sql.VarChar, req.body.Rango_inferior)
        .input('Rango_Superior', sql.VarChar, req.body.Rango_Superior)
        .input('id_Tp_Parametro', sql.Int, req.body.id_Tp_Parametro)
        .input('estado', sql.Bit, req.body.estado)
        .query(`UPDATE parametro SET Rango_inferior=@Rango_inferior, Rango_Superior=@Rango_Superior, id_Tp_Parametro=@id_Tp_Parametro, estado=@estado WHERE id = @id`);

    console.table(req.body.estado);
    if (req.body.estado == 1) {
        res.json({ msg: "Usuario activado" });
    } else {
        res.json({ msg: "Usuario desactivado" });

    }

}




export const deleteParametro = async (req, res) => {

    const pool = await getConnection();
    const request = new sql.Request();
    await request
        .input('id', sql.VarChar, req.body.id)
        .input('estado', sql.Bit, req.body.estado)
        .query(`UPDATE parametro SET  estado=@estado WHERE id = @id`);

    console.table(req.body.estado);
    if (req.body.estado == 1) {
        res.json({ msg: "Usuario activado" });
    } else {
        res.json({ msg: "Usuario desactivado" });

    }
}





/**-----------------------create para-sensores----------------------------- */

export const createParaSensor = async (req, res) => {
    console.table(req.body);

    const pool = await getConnection();

    const result = await pool
        .request()

        .input('id_sensor', sql.Int, req.body.id_sensor)
        .input('id_parametro', sql.Int, req.body.id_parametro)
        .input('estado', sql.Bit, true)
        .query('INSERT into Parametro_sensor (id_sensor,id_parametro,estado) VALUES (@id_sensor,@id_parametro,@estado);SELECT SCOPE_IDENTITY() as Descripcion;');
    console.table(result);
    res.json({
        msg: 'Parametro creado',
        Descripcion: req.body.Descripcion,
    });
}


export const getParaSensor = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Parametro_sensor');
    res.json(result.recordset);
    console.table(result.recordset);
}

export const updateParaSensor = async (req, res) => {

    const pool = await getConnection();
    const request = new sql.Request();
    await request
        .input('id', sql.VarChar, req.body.id)
        .input('id_sensor', sql.VarChar, req.body.id_sensor)
        .input('id_parametro', sql.VarChar, req.body.id_parametro)
        .input('estado', sql.Bit, req.body.estado)
        .query(`UPDATE Parametro_sensor SET id_sensor=@id_sensor, id_parametro=@id_parametro,   estado=@estado WHERE Id = @id`);

    console.table(req.body.estado);
    if (req.body.estado == 1) {
        res.json({ msg: "Usuario activado" });
    } else {
        res.json({ msg: "Usuario desactivado" });

    }

}




export const deleteParaSensor = async (req, res) => {

    const pool = await getConnection();
    const request = new sql.Request();
    await request
        .input('id', sql.VarChar, req.body.id)

        .input('estado', sql.Bit, req.body.estado)
        .query(`UPDATE Parametro_sensor SET     estado=@estado WHERE Id = @id`);


    console.table(req.body.estado);
    if (req.body.estado == 1) {
        res.json({ msg: "Usuario activado" });
    } else {
        res.json({ msg: "Usuario desactivado" });

    }
}







/**-------------------sensors----------------------------- */
export const getSensors = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM sensor');
    res.json(result.recordset);
    console.table(result.recordset);
}
export const createSensors = async (req, res) => {
    console.table(req.body);

    const pool = await getConnection();

    const result = await pool
        .request()

        .input('informacion', sql.VarChar, req.body.informacion)
        .input('id_tp_sensor', sql.Int, req.body.id_tp_sensor)
        .input('estado', sql.Bit, true)
        .query('INSERT into sensor (informacion,id_tp_sensor,estado) VALUES (@informacion,@id_tp_sensor,@estado);SELECT SCOPE_IDENTITY() as Descripcion;');
    console.table(result);
    res.json({
        msg: 'sensor creado',

    });
}

export const updateSensors = async (req, res) => {

    const pool = await getConnection();
    const request = new sql.Request();
    await request
        .input('id', sql.VarChar, req.body.id)
        .input('informacion', sql.VarChar, req.body.informacion)
        .input('id_tp_sensor', sql.VarChar, req.body.id_tp_sensor)

        .input('estado', sql.Bit, req.body.estado)
        .query(`UPDATE sensor SET informacion=@informacion, id_tp_sensor=@id_tp_sensor , estado=@estado WHERE Id = @id`);

    console.table(req.body.estado);
    if (req.body.estado == 1) {
        res.json({ msg: "Usuario activado" });
    } else {
        res.json({ msg: "Usuario desactivado" });

    }

}




export const deleteSensors = async (req, res) => {

    const pool = await getConnection();
    const request = new sql.Request();
    await request
        .input('id', sql.VarChar, req.body.id)

        .input('estado', sql.Bit, req.body.estado)
        .query(`UPDATE sensor SET estado=@estado WHERE Id = @id`);


    console.table(req.body.estado);
    if (req.body.estado == 1) {
        res.json({ msg: "Usuario activado" });
    } else {
        res.json({ msg: "Usuario desactivado" });

    }
}





/**----------------------Departamentos--------------------------------- */

export const addDeparment = async (req, res) => {
    console.table(req.body);

    const pool = await getConnection();

    const result = await pool
        .request()

        .input('nombre', sql.VarChar, req.body.nombre)
        .input('estado', sql.Bit, true)
        .query('INSERT into Departamento (nombre,estado) VALUES (@nombre,@estado);SELECT SCOPE_IDENTITY() as name;');

    res.json({
        msg: 'Departamento creado',
        name: req.body.name,
    });
}

export const getDeparment = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Departamento');
    res.json(result.recordset);
    console.table(result.recordset);
}

export const updateDeparment = async (req, res) => {

    const pool = await getConnection();
    const result = await pool.request()
        .input('id', sql.Int, req.body.id)
        .input('nombre', sql.VarChar, req.body.nombre)
        .input('estado', sql.Bit, req.body.estado)
        .query('UPDATE Departamento SET nombre = @nombre,estado = @estado WHERE id = @id');

    if (result.rowsAffected[0] == 0) {
        return res.status(404).json({ msg: "Departamento no encontrado" });
    } else {
        return res.json({ msg: "Departamento actualizado" });
    }
}

export const deleteDeparment = async (req, res) => {

    const pool = await getConnection();
    const result = await pool.request()
        .input('id', sql.Int, req.body.id)

        .input('estado', sql.Bit, req.body.estado)
        .query('UPDATE Departamento SET  estado = @estado WHERE id = @id');

    if (result.rowsAffected[0] == 0) {
        return res.status(404).json({ msg: "Departamento no encontrado" });
    } else {
        return res.json({ msg: "Departamento eliminado" });
    }
}
/** --------------------ciudad------------------------ */

export const addCiudad = async (req, res) => {
    console.table(req.body);

    const pool = await getConnection();

    const result = await pool
        .request()

        .input('nombre', sql.VarChar, req.body.nombre)
        .input('id_departamento', sql.Int, req.body.id_departamento)
        .input('estado', sql.Bit, true)
        .query('INSERT into ciudad (nombre,Id_departamento,estado) VALUES (@nombre,@id_departamento,@estado);SELECT SCOPE_IDENTITY() as name;');
    console.table(result);
    res.json({
        msg: 'Ciudad creada',
        name: req.body.name,
    });
}


export const getCiudad = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM ciudad');
    res.json(result.recordset);
    console.table(result.recordset);
}

export const updateCiudad = async (req, res) => {

    const pool = await getConnection();
    const result = await pool.request()
        .input('id', sql.Int, req.body.id)
        .input('nombre', sql.VarChar, req.body.nombre)
        .input('id_departamento', sql.Int, req.body.id_departamento)
        .input('estado', sql.Bit, req.body.estado)
        .query('UPDATE ciudad SET nombre = @nombre,Id_departamento = @id_departamento,estado = @estado WHERE id = @id');
    console.table(result);
    if (result.rowsAffected[0] == 0) {
        return res.status(404).json({ msg: "Ciudad no encontrada" });
    } else {
        return res.json({ msg: "Ciudad actualizada" });
    }
}

export const deleteCiudad = async (req, res) => {

    const pool = await getConnection();
    const result = await pool.request()
        .input('id', sql.Int, req.body.id)

        .input('estado', sql.Bit, req.body.estado)
        .query('UPDATE ciudad SET  estado = @estado WHERE id = @id');
    console.table(result);
    if (result.rowsAffected[0] == 0) {
        return res.status(404).json({ msg: "Ciudad no encontrada" });
    } else {
        return res.json({ msg: "Ciudad eliminada" });
    }
}

/**---------------------------------------vereda------------------------------------------------ */
export const addVereda = async (req, res) => {
    console.table(req.body);

    const pool = await getConnection();

    const result = await pool
        .request()

        .input('nombre', sql.VarChar, req.body.nombre)
        .input('id_ciudad', sql.Int, req.body.id_ciudad)
        .input('estado', sql.Bit, true)
        .query('INSERT into vereda (nombre,id_ciudad,estado) VALUES (@nombre,@id_ciudad,@estado);SELECT SCOPE_IDENTITY() as name;');
    console.table(result);
    res.json({
        msg: 'Vereda creada',
        name: req.body.name,
    });
}

export const getVereda = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM vereda');
    res.json(result.recordset);
    console.table(result.recordset);
}

export const updateVereda = async (req, res) => {

    const pool = await getConnection();
    const result = await pool.request()
        .input('id', sql.Int, req.body.id)
        .input('nombre', sql.VarChar, req.body.nombre)
        .input('id_ciudad', sql.Int, req.body.id_ciudad)
        .input('estado', sql.Bit, req.body.estado)
        .query('UPDATE vereda SET nombre = @nombre,id_ciudad = @id_ciudad,estado = @estado WHERE id = @id');
    console.table(result);
    if (result.rowsAffected[0] == 0) {
        return res.status(404).json({ msg: "Vereda no encontrada" });
    } else {
        return res.json({ msg: "Vereda actualizada" });
    }
}

export const deleteVereda = async (req, res) => {

    const pool = await getConnection();
    const result = await pool.request()
        .input('id', sql.Int, req.body.id)

        .input('estado', sql.Bit, req.body.estado)
        .query('UPDATE vereda SET  estado = @estado WHERE id = @id');
    console.table(result);
    if (result.rowsAffected[0] == 0) {
        return res.status(404).json({ msg: "Vereda no encontrada" });
    } else {
        return res.json({ msg: "Vereda eliminada" });
    }
}



/**----------------------------------------tp persona------------------------------------ */

export const addTpPersona = async (req, res) => {

    const pool = await getConnection();
    const result = await pool
        .request()
        .input('Descripcion', sql.VarChar, req.body.descripcion)
        .input('estado', sql.Bit, true)
        .query('INSERT into Tipo_persona (descripcion,estado) VALUES (@Descripcion,@estado);SELECT SCOPE_IDENTITY() as Descripcion;');
}

export const getTpPersona = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Tipo_persona');
    res.json(result.recordset);
    console.table(result.recordset);
}

export const updateTpPersona = async (req, res) => {

    const pool = await getConnection();
    const result = await pool.request()
        .input('id', sql.Int, req.body.id)
        .input('Descripcion', sql.VarChar, req.body.descripcion)
        .input('estado', sql.Bit, req.body.estado)
        .query('UPDATE Tipo_persona SET descripcion = @Descripcion,estado = @estado WHERE id = @id');
    console.table(result);
    if (result.rowsAffected[0] == 0) {
        return res.status(404).json({ msg: "Tipo de persona no encontrado" });
    } else {
        return res.json({ msg: "Tipo de persona actualizado" });
    }
}


export const DeleteTpPersona = async (req, res) => {

    const pool = await getConnection();
    const result = await pool.request()
        .input('id', sql.Int, req.body.id)

        .input('estado', sql.Bit, req.body.estado)
        .query('UPDATE Tipo_persona SET  estado = @estado WHERE id = @id');
    console.table(result);
    if (result.rowsAffected[0] == 0) {
        return res.status(404).json({ msg: "Tipo de persona no encontrado" });
    } else {
        return res.json({ msg: "Tipo de persona eliminada" });
    }
}
/** -----------------------------------finca--------------------------------------------- */
export const addFinca = async (req, res) => {

    const pool = await getConnection();
    const result = await pool
        .request()
        .input('nombre_finca', sql.VarChar, req.body.nombre)
        .input('id_persona', sql.VarChar, req.body.cedula)
        .input('id_vereda', sql.Int, req.body.id_vereda)
        .input('estado', sql.Bit, true)
        .query('INSERT into Finca (nombre_finca,id_persona,id_vereda,estado) VALUES (@nombre_finca,@id_persona,@id_vereda,@estado);SELECT SCOPE_IDENTITY() as Descripcion;');

    res.json({
        msg: 'Finca creada',
        name: req.body.name,
    });

}

export const getFinca = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Finca');
    res.json(result.recordset);
    console.table(result.recordset);



}

export const updateFinca = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input('id', sql.Int, req.body.id)
        .input('nombre_finca', sql.VarChar, req.body.nombre)
        .input('id_persona', sql.VarChar, req.body.cedula)
        .input('id_vereda', sql.Int, req.body.id_vereda)
        .input('estado', sql.Bit, req.body.estado)
        .query('UPDATE Finca SET nombre_finca = @nombre_finca,id_persona = @id_persona,id_vereda = @id_vereda,estado = @estado WHERE id = @id');
    console.table(result);
    if (result.rowsAffected[0] == 0) {
        return res.status(404).json({ msg: "Finca no encontrada" });
    } else {
        return res.json({ msg: "Finca actualizada" });
    }
}


export const deleteFinca = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input('id', sql.Int, req.body.id)

        .input('estado', sql.Bit, req.body.estado)
        .query('UPDATE Finca SET  estado = @estado WHERE id = @id');
    console.table(result);
    if (result.rowsAffected[0] == 0) {
        return res.status(404).json({ msg: "Finca no encontrada" });
    } else {
        return res.json({ msg: "Finca eliminada" });
    }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let email = "";
let fechaa = "";
let fincaa = "";
let informacionn = "";
let nombree = "";
let apellidoo = "";
let count = 0;
export const getValoresArduino = async (req, res) => {


    try {





        const { valor, correo, finca, informacion, fecha, nombre, apellido } = req.body;

        console.log(req.body);
        while (count == 0) {
            email = correo;
            fincaa = finca;
            informacionn = informacion;
            fechaa = fecha;
            nombree = nombre;
            apellidoo = apellido;
            count++;
        }
 
        if (valor !== undefined && email !== undefined) {
            if (valor > 10 && valor < 29) {
                // Enviar una respuesta de éxito al cliente por correo
                enviarCorreo(email, `¡Buenas noticias! El agua de la finca ${fincaa} cumple con la norma de turbidez`, `
Asunto: ¡Buenas noticias! El agua de la finca ${fincaa} cumple con la norma de turbidez
Estimado(a) ${nombree} ${apellidoo}:\n

Nos complace informarle que el reciente análisis del agua de su finca ${fincaa} ha arrojado resultados satisfactorios en cuanto al parámetro de turbidez.\n

Resultado del análisis:\n

Fecha de análisis:  ${fechaa}\n

Parámetro: Turbidez\n

Resultado:  ${valor} NTU\n

Interpretación:\n

El valor obtenido de ${valor} NTU se encuentra dentro del rango aceptable de 0 a 5 NTU establecido por las normas de calidad del agua para consumo humano. Esto significa que el agua de su finca es apta para consumo en este momento.\n

Recomendaciones:\n

A pesar de que el agua de su finca cumple con la norma de turbidez, le recomendamos continuar con las siguientes prácticas para garantizar su calidad:\n

-Monitorear la calidad del agua de manera periódica: Es importante realizar análisis del agua al menos una vez al año para detectar cualquier cambio en sus características.\n
-Adoptar medidas preventivas: Implementar prácticas que protejan la fuente de agua de posibles contaminantes, como el manejo adecuado de residuos agrícolas o la construcción de cercas perimetrales.\n
-Mantenerse informado: Estar al tanto de las alertas o avisos emitidos por las autoridades locales relacionados con la calidad del agua en su zona.\n

Nos alegramos de informarle que el agua de su finca es segura para el consumo humano.\n

Con cuidado,\n

TECHNO CROPTION S.A.S.\n

TECHNO CROPTION S.A.S. no se hace responsable por la información proporcionada en este correo. Para obtener asesoramiento profesional, consulte a un especialista en calidad del agua.\n

cualquier duda o inquietud no dude en contactarnos. ¡Gracias por tu colaboración!`);
            } else if (valor >= 30 && valor < 50) {
                enviarCorreo(email, `Alerta de turbidez en el agua de la finca ${fincaa}`, `Estimado(a) ${nombree} ${apellidoo}:\n

Nos dirigimos a usted con atención en relación al reciente análisis del agua de su finca ${fincaa}. Si bien el resultado de turbidez se encuentra dentro del límite de la norma (${valor} NTU), nos preocupa que este valor se acerca al límite máximo establecido (5 NTU).\n

Nivel de riesgo actual:\n

El agua de su finca aún es apta para consumo, sin embargo, es importante prestar atención a este parámetro, ya que un ligero aumento podría llevarla a superar la norma y hacerla no segura para beber.\n

Acciones recomendadas:\n

Ante esta situación, le solicitamos tomar las siguientes medidas de manera preventiva:\n

- Monitoreo frecuente: Es crucial realizar análisis del agua de la finca con mayor frecuencia, al menos cada [Frecuencia recomendada] semanas, para vigilar de cerca la evolución de la turbidez.\n

- Implementar medidas preventivas: Revise y refuerce las prácticas que protegen la fuente de agua de posibles contaminantes, como el manejo adecuado de residuos, la limpieza de canales y la verificación del estado de las instalaciones de agua.\n

- Estar atento a cambios: Observe si hay alguna alteración visible en el aspecto o el sabor del agua, ya que esto podría ser un indicio de contaminación.\n

- Contactar a un especialista: Si nota cambios en el agua o tiene dudas sobre su calidad, no dude en consultar con un experto en calidad del agua para obtener una evaluación más profunda y recomendaciones personalizadas.\n

Soporte adicional:\n

Nos mantenemos a su disposición para brindarle cualquier información o apoyo adicional que requiera. No dude en contactarnos a través de Technocroption@gmail.com.\n

Con cuidado,\n

TECHNO CROPTION S.A.S.\n

TECHNO CROPTION S.A.S. no se hace responsable por la información proporcionada en este correo. Para obtener asesoramiento profesional, consulte a un especialista en calidad del agua.\n

cualquier duda o inquietud no dude en contactarnos. ¡Gracias por tu colaboración!`);
            } else {
                enviarCorreo(email, `Resultados del análisis de agua de la finca ${fincaa}`, `Estimado(a)   ${nombree} ${apellidoo}:\n

Nos complace informarle que el análisis del agua de su finca ${fincaa} ha finalizado con éxito. A continuación, le presentamos los resultados obtenidos: \n

Fecha de análisis:  ${fechaa} \n
Parámetro: Turbidez \n
Resultado: ${valor} NTU \n
Interpretación:\n

De acuerdo a los estándares de calidad del agua para consumo humano, un valor de turbidez superior a 5 NTU se considera peligroso para el consumo. En este caso, el valor obtenido de ${valor} NTU supera el límite establecido, lo que indica que el agua de su finca no es apta para consumo humano en este momento.\n

Recomendaciones:\n

En vista de los resultados obtenidos, le recomendamos tomar las siguientes medidas:\n

-No consumir el agua directamente de la fuente.\n
-Hervir el agua antes de beberla.\n
-Implementar un sistema de tratamiento de agua adecuado para su finca.\n
-Consultar con un especialista en calidad del agua para obtener una evaluación más detallada y recomendaciones específicas.\n
Agradecemos su colaboración al reportar este caso y nos mantenemos a su disposición para cualquier consulta o inquietud que pueda tener.\n

Con cuidado,\n

TECHNO CROPTION S.A.S.\n

TECHNO CROPTION S.A.S. no se hace responsable por la información proporcionada en este correo. Para obtener asesoramiento profesional, consulte a un especialista en calidad del agua.\n

cualquier duda o inquietud no dude en contactarnos. ¡Gracias por tu colaboración!`);
            }
        }
        // Enviar una respuesta de éxito al cliente
        res.status(200).send("Datos recibidos correctamente.");
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        // Enviar una respuesta de error al cliente
        res.status(500).send("Error al procesar la solicitud.");
    }
}
