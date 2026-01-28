import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import { auth } from "./lib/auth";

const app: Application = express();
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:4000",
    credentials: true,
  }),
);
app.use(express.urlencoded());

app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome MediStore Home" });
});

export default app;
