import { Router } from "express";

import { createUser, deleteUser, getPassword, getPeople, getPerson, getUser, getUsers, updateUser } from "../controllers/users.controller.js";
import {
    getSensors, createSensors, getTipeParameters,
    getTipeSensors, deleteTipeSensor, createTipeParameters,
    createTipeSensors, createParaSensor, getParaSensor, createParametro,
    addDeparment, getDeparment, addCiudad, getCiudad, addVereda,
    getVereda,
    addTpPersona,
    getTpPersona,
    addFinca,
    getFinca,
    getParametro,
    updateCiudad,
    deleteCiudad,
    updateDeparment,
    deleteDeparment,
    updateFinca,
    deleteFinca,
    updateParametro,
    deleteParametro,
    updateSensors,
    deleteSensors,
    updateTipeParameters,
    deleteTipeParameters,
    updateTipeSensors,
    updateVereda,
    deleteVereda,
    updateParaSensor,
    deleteParaSensor,
    updateTpPersona,
    DeleteTpPersona
} from "../controllers/parameters.controller.js";

const router = Router();


//obtener personas
router.get("/persona", getPeople);

//obtener una persona
router.get("/persona/:id", getPerson);

//obtener usuarios
router.get("/Usuarios", getUsers);
//obtener un usuario
router.get("/Usuarios/:id", getUser);

//crear una persona
router.post("/Usuarios", createUser);
//actualizar un usuario
router.put("/persona/:id", updateUser);

//eliminar un usuario
router.put("/DeleteUsuarios/:id", deleteUser);



//enviar correo
router.post("/enviarcorreo", getPassword);



//crear un tipo de parametro
router.post("/Tipo_parametro", createTipeParameters);
//obtener los tipos de parametros
router.get("/Tipo_parametro", getTipeParameters);
//update tipo de parametro
router.put("/Tipo_parametro/:id", updateTipeParameters);
//eliminar un tipo de parametro
router.put("/DeleteTipo_parametro/:id", deleteTipeParameters);





//crear un tipo de sensor
router.post("/Tipo_sensor", createTipeSensors);
//obtener los tipos de sensores
router.get("/Tipo_sensor", getTipeSensors);
// update tipo de sensor
router.put("/Tipo_sensor/:id", updateTipeSensors);
//eliminar un tipo de sensor
router.put("/DeleteTipo_sensor/:id", deleteTipeSensor);





//crear un sensor
router.post("/sensor", createSensors);
//obtener los sensores
router.get("/sensor", getSensors);
//update sensor
router.put("/sensor/:id", updateSensors);
//eliminar un sensor
router.put("/deleteSensor/:id", deleteSensors);




//crear un parametro
router.post("/parametro", createParametro);
//obtener los parametros
router.get("/parametro", getParametro);
//actualizar los parametro
router.put("/parametro/:id", updateParametro);
//eliminar un parametro
router.put("/DeleteParametro/:id", deleteParametro);




//crear parametro_sensor
router.post("/parametro_sensor", createParaSensor);
//obtener los parametros de un sensor
router.get("/parametro_sensor", getParaSensor);
//actualizar los parametros de un sensor
router.put("/parametro_sensor/:id", updateParaSensor);
//eliminar los parametros de un sensor
router.put("/DeleteParametro_sensor/:id", deleteParaSensor);




//add departamentos
router.post("/Departamento", addDeparment);
//get departamentos
router.get("/Departamento", getDeparment);
//update departamentos
router.put("/Departamento/:id", updateDeparment);
//delete departamentos
router.put("/deleteDepartamento/:id", deleteDeparment)



//add ciudad
router.post("/ciudad", addCiudad)
//get ciudad
router.get("/ciudad", getCiudad)
//update ciudad
router.put("/ciudad/:id", updateCiudad)
//delete ciudad
router.put("/deleteCiudad/:id", deleteCiudad)



//add vereda
router.post("/vereda", addVereda)
//get vereda
router.get("/vereda", getVereda)
//update vereda
router.put("/vereda/:id", updateVereda)
//delete vereda
router.put("/deleteVereda/:id", deleteVereda)


//add tipo de persona
router.post("/Tipo_persona", addTpPersona)
//get tipo de persona
router.get("/Tipo_persona", getTpPersona)
//update tipo de persona
 router.put("/Tipo_persona/:id", updateTpPersona)
//delete tipo de persona
router.put("/deleteTipo_persona/:id", DeleteTpPersona)



//add fincas
router.post("/Fincas", addFinca)
//obtener fincas
router.get("/Fincas", getFinca)
//update fincas
router.put("/Fincas/:id", updateFinca)
//delete fincas
router.put("/deleteFincas/:id", deleteFinca)


export default router;