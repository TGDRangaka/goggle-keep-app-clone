import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database";
import routes from "./controllers/routes";
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const uri = process.env.DB_URI || 'mongodb+srv://---:---@cluster0.vllnh4g.mongodb.net/google-keep?retryWrites=true&w=majority&appName=Cluster0'
const contextPath = process.env.CONTEXT_PATH || '/google-keep/api/v1'

app.use(express.json());
app.use(cors({
  origin: "*"
}));

app.use(`${contextPath}/note`, routes.noteRouter);
app.use(`${contextPath}/user`, routes.userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  connectDatabase(uri);
});
