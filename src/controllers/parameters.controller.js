import { getConnection } from '../dataBase/connection.js';
import sql from 'mssql';


/**-----------------------Tipo de parametros */
export const createTipeParameters = async (req, res) => {
    console.log(req.body);

    const pool = await getConnection();

    const result = await pool
        .request()

        .input('Descripcion', sql.VarChar, req.body.Descripcion)
        .input('estado', sql.Bit, true)
        .query('INSERT into Tipo_parametro (Descripcion,estado) VALUES (@Descripcion,@estado);SELECT SCOPE_IDENTITY() as Descripcion;');
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

export const updateTipeParameters = async (req, res) => {

    const pool = await getConnection();
    const request = new sql.Request();
    await request
        .input('Id', sql.VarChar, req.body.id)
        .input('Descripcion', sql.VarChar, req.body.Descripcion)
        .input('estado', sql.Bit, req.body.estado)
        .query(`UPDATE Tipo_parametro SET Descripcion=@Descripcion,  estado=@estado WHERE ID = @Id`);

    console.log(req.body.estado);
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

    console.log(req.body.Estado);
    if (req.body.Estado == 1) {
        res.json({ msg: "Usuario activado" });
    } else {
        res.json({ msg: "Usuario desactivado" });

    }

}






/** ----------------------------tipo de sensores ------------------------ */



export const createTipeSensors = async (req, res) => {
    console.log(req.body);

    const pool = await getConnection();

    const result = await pool
        .request()

        .input('Descripcion', sql.VarChar, req.body.Descripcion)
        .input('estado', sql.Bit, true)
        .query('INSERT into Tipo_sensor (Descripcion,estado) VALUES (@Descripcion,@estado);SELECT SCOPE_IDENTITY() as Descripcion;');
    console.log(result);
    res.json({
        msg: 'sensor creado',
        Descripcion: req.body.Descripcion,
    });
}

export const getTipeSensors = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Tipo_sensor');
    res.json(result.recordset);
    console.log(result.recordset[0]);
}

export const updateTipeSensors = async (req, res) => {

    const pool = await getConnection();
    const request = new sql.Request();
    await request
        .input('Id', sql.VarChar, req.body.id)
        .input('Descripcion', sql.VarChar, req.body.Descripcion)
        .input('estado', sql.Bit, req.body.estado)
        .query(`UPDATE Tipo_sensor SET Descripcion=@Descripcion, estado=@estado WHERE Id = @Id`);

    console.log(req.body.estado);
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

    console.log(req.body.estado);
    if (req.body.estado == 1) {
        res.json({ msg: "Usuario activado" });
    } else {
        res.json({ msg: "Usuario desactivado" });

    }
}


/** -------------------------------------------------------parametros ---------------------------------*/
export const createParametro = async (req, res) => {
    console.log(req.body);

    const pool = await getConnection();

    const result = await pool
        .request()

        .input('Rango_inferior', sql.VarChar, req.body.Rango_inferior)
        .input('Rango_Superior', sql.VarChar, req.body.Rango_Superior)
        .input('id_Tp_Parametro', sql.Int, req.body.id_Tp_Parametro)
        .input('estado', sql.Bit, true)
        .query('INSERT into Parametro (Rango_inferior,Rango_Superior,id_Tp_Parametro,estado) VALUES (@Rango_inferior,@Rango_Superior,@id_Tp_Parametro,@estado);SELECT SCOPE_IDENTITY() as Descripcion;');
    console.log(result);
    res.json({
        msg: 'Parametro creado',

    });
}
export const getParametro = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Parametro');
    res.json(result.recordset);
    console.log(result.recordset);
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

    console.log(req.body.estado);
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

    console.log(req.body.estado);
    if (req.body.estado == 1) {
        res.json({ msg: "Usuario activado" });
    } else {
        res.json({ msg: "Usuario desactivado" });

    }
}





/**-----------------------create para-sensores----------------------------- */

export const createParaSensor = async (req, res) => {
    console.log(req.body);

    const pool = await getConnection();

    const result = await pool
        .request()

        .input('id_sensor', sql.Int, req.body.id_sensor)
        .input('id_parametro', sql.Int, req.body.id_parametro)
        .input('estado', sql.Bit, true)
        .query('INSERT into Parametro_sensor (id_sensor,id_parametro,estado) VALUES (@id_sensor,@id_parametro,@estado);SELECT SCOPE_IDENTITY() as Descripcion;');
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

export const updateParaSensor = async (req, res) => {

    const pool = await getConnection();
    const request = new sql.Request();
    await request
        .input('id', sql.VarChar, req.body.id)
        .input('id_sensor', sql.VarChar, req.body.id_sensor)
        .input('id_parametro', sql.VarChar, req.body.id_parametro)
        .input('estado', sql.Bit, req.body.estado)
        .query(`UPDATE Parametro_sensor SET id_sensor=@id_sensor, id_parametro=@id_parametro,   estado=@estado WHERE Id = @id`);

    console.log(req.body.estado);
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


    console.log(req.body.estado);
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
    console.log(result.recordset);
}
export const createSensors = async (req, res) => {
    console.log(req.body);

    const pool = await getConnection();

    const result = await pool
        .request()

        .input('informacion', sql.VarChar, req.body.informacion)
        .input('id_tp_sensor', sql.Int, req.body.id_tp_sensor)
        .input('estado', sql.Bit, true)
        .query('INSERT into sensor (informacion,id_tp_sensor,estado) VALUES (@informacion,@id_tp_sensor,@estado);SELECT SCOPE_IDENTITY() as Descripcion;');
    console.log(result);
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

    console.log(req.body.estado);
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


    console.log(req.body.estado);
    if (req.body.estado == 1) {
        res.json({ msg: "Usuario activado" });
    } else {
        res.json({ msg: "Usuario desactivado" });

    }
}





/**----------------------Departamentos--------------------------------- */

export const addDeparment = async (req, res) => {
    console.log(req.body);

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
    console.log(result.recordset);
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
    console.log(req.body);

    const pool = await getConnection();

    const result = await pool
        .request()

        .input('nombre', sql.VarChar, req.body.nombre)
        .input('id_departamento', sql.Int, req.body.id_departamento)
        .input('estado', sql.Bit, true)
        .query('INSERT into ciudad (nombre,Id_departamento,estado) VALUES (@nombre,@id_departamento,@estado);SELECT SCOPE_IDENTITY() as name;');
    console.log(result);
    res.json({
        msg: 'Ciudad creada',
        name: req.body.name,
    });
}


export const getCiudad = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM ciudad');
    res.json(result.recordset);
    console.log(result.recordset);
}

export const updateCiudad = async (req, res) => {

    const pool = await getConnection();
    const result = await pool.request()
        .input('id', sql.Int, req.body.id)
        .input('nombre', sql.VarChar, req.body.nombre)
        .input('id_departamento', sql.Int, req.body.id_departamento)
        .input('estado', sql.Bit, req.body.estado)
        .query('UPDATE ciudad SET nombre = @nombre,Id_departamento = @id_departamento,estado = @estado WHERE id = @id');
    console.log(result);
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
    console.log(result);
    if (result.rowsAffected[0] == 0) {
        return res.status(404).json({ msg: "Ciudad no encontrada" });
    } else {
        return res.json({ msg: "Ciudad eliminada" });
    }
}

/**---------------------------------------vereda------------------------------------------------ */
export const addVereda = async (req, res) => {
    console.log(req.body);

    const pool = await getConnection();

    const result = await pool
        .request()

        .input('nombre', sql.VarChar, req.body.nombre)
        .input('id_ciudad', sql.Int, req.body.id_ciudad)
        .input('estado', sql.Bit, true)
        .query('INSERT into vereda (nombre,id_ciudad,estado) VALUES (@nombre,@id_ciudad,@estado);SELECT SCOPE_IDENTITY() as name;');
    console.log(result);
    res.json({
        msg: 'Vereda creada',
        name: req.body.name,
    });
}

export const getVereda = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM vereda');
    res.json(result.recordset);
    console.log(result.recordset);
}

export const updateVereda = async (req, res) => {

    const pool = await getConnection();
    const result = await pool.request()
        .input('id', sql.Int, req.body.id)
        .input('nombre', sql.VarChar, req.body.nombre)
        .input('id_ciudad', sql.Int, req.body.id_ciudad)
        .input('estado', sql.Bit, req.body.estado)
        .query('UPDATE vereda SET nombre = @nombre,id_ciudad = @id_ciudad,estado = @estado WHERE id = @id');
    console.log(result);
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
    console.log(result);
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
        .input('Descripcion', sql.VarChar, req.body.nombre)
        .input('estado', sql.Bit, true)
        .query('INSERT into Tipo_persona (descripcion,estado) VALUES (@Descripcion,@estado);SELECT SCOPE_IDENTITY() as Descripcion;');
}

export const getTpPersona = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Tipo_persona');
    res.json(result.recordset);
    console.log(result.recordset);
}

export const updateTpPersona = async (req, res) => {

    const pool = await getConnection();
    const result = await pool.request()
        .input('id', sql.Int, req.body.id)
        .input('Descripcion', sql.VarChar, req.body.nombre)
        .input('estado', sql.Bit, req.body.estado)
        .query('UPDATE Tipo_persona SET descripcion = @Descripcion,estado = @estado WHERE id = @id');
    console.log(result);
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
    console.log(result);
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
}

export const getFinca = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Finca');
    res.json(result.recordset);



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
    console.log(result);
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
    console.log(result);
    if (result.rowsAffected[0] == 0) {
        return res.status(404).json({ msg: "Finca no encontrada" });
    } else {
        return res.json({ msg: "Finca eliminada" });
    }
}