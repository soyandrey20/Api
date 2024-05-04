import { Router } from "express";

import { creatUser, deleteUser, getPassword, getUser, getUsers, updateUser } from "../controllers/users.controller.js";
import {  createSensors, getTipeParameters, getTipeSensors,deleteTipeSensor, createTipeParameters, createTipeSensors, createParaSensor, getParaSensor, createParametro } from "../controllers/parameters.controller.js";

const router = Router();

//obtener usuarios
router.get("/Usuarios", getUsers);
//obtener un usuario
router.get("/Usuarios/:id", getUser);
//crear un usuario
router.post("/Usuarios", creatUser);
//actualizar un usuario
router.put("/Usuarios/:id", updateUser);
//eliminar un usuario
router.put("/DeleteUsuarios/:id", deleteUser);
//enviar correo
router.get("/enviarcorreo/:id", getPassword);
//crear un tipo de parametro
router.post("/Tipo_parametro", createTipeParameters);
//obtener los tipos de parametros
router.get("/Tipo_parametro", getTipeParameters);
//crear un tipo de sensor
router.post("/Tipo_sensor", createTipeSensors);
//obtener los tipos de sensores
router.get("/Tipo_sensor", getTipeSensors);
//eliminar un tipo de sensor
router.delete("/Tipo_sensor/:Descripcion", deleteTipeSensor);
//crear un sensor
router.post("/sensor", createSensors);
//crear un parametro
router.post("/parametro", createParametro);
//crear parametro_sensor
router.post("/parametro_sensor", createParaSensor);
//obtener los parametros de un sensor
router.get("/parametro_sensor",getParaSensor);
//  DeleteUsuarios
export default router;