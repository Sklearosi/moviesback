import { createUser, login } from "../controller/auth-controller.js";
import express from "express";

const authRouter = express.Router();

authRouter.post("/register", createUser);
authRouter.post("/login", login);

export default authRouter;
