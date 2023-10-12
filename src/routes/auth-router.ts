import authMiddleware from "../middlewares/auth-middleware.js";
import {
  createUser,
  getAllUser,
  getMovies,
  login,
} from "../controller/auth-controller.js";
import express from "express";

const authRouter = express.Router();

authRouter.post("/register", createUser);
authRouter.post("/login", login);
authRouter.get("/users", authMiddleware, getAllUser);
authRouter.get("/movies", getMovies)

export default authRouter;
