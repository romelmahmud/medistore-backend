import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { Application } from "express";
import { auth } from "./lib/auth";
import { errorHandler } from "./middleware/errorHandler";
import { categoryRouter } from "./modules/category/category.route";
import { medicineRouter } from "./modules/medicine/medicine.route";
import { userRouter } from "./modules/user/user.route";

const app: Application = express();
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:4000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded());
app.all("/api/auth/*splat", toNodeHandler(auth));

// app.use("/", (req: Request, res: Response) => {
//   res.json({ message: "Welcome MediStore Home" });
// });

app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/medicines", medicineRouter);
app.use("/api/v1/users", userRouter);

app.use(errorHandler);

export default app;
