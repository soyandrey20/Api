import { Router } from "express";

import { creatUser, deleteUser, getPassword, getUser, getUsers, updateUser } from "../controllers/users.controller.js";

const router = Router();

router.get("/Usuarios", getUsers);

router.get("/Usuarios/:id", getUser);

router.post("/Usuarios", creatUser);

router.put("/Usuarios/:id", updateUser);

router.delete("/Usuarios/:id", deleteUser);

router.get("/enviarcorreo/:id", getPassword);


export default router;