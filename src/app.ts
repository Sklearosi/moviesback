import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./config/mongo.js";
import authRouter from "./routes/auth-router.js";
import swaggerMiddleware from "./middlewares/swagger-middleware.js";

dotenv.config();
connect();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api", authRouter);

app.use("/", ...swaggerMiddleware);

app.listen(process.env.PORT || 3000);
