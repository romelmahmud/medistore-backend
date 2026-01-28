import express, { Application, Request, Response } from "express";

const app: Application = express();

app.use(express.json());

app.use("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome MediStore Home" });
});

export default app;
