import { Router } from "express";

import { creatUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/users.controller.js";

const router = Router();

router.get("/Usuarios", getUsers);

router.get("/Usuarios/:id", getUser);

router.post("/Registros", creatUser);

router.put("/Usuarios/:id", updateUser);

router.delete("/Usuarios/:id", deleteUser);




export default router;