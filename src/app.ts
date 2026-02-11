import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import { auth } from "./lib/auth";
import { errorHandler } from "./middleware/errorHandler";
import { categoryRouter } from "./modules/category/category.route";
import { medicineRouter } from "./modules/medicine/medicine.route";
import { orderRouter } from "./modules/order/order.route";
import { reviewRouter } from "./modules/review/review.route";
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

app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/medicines", medicineRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/reviews", reviewRouter);

app.use("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome MediStore Home" });
});

app.use(errorHandler);

export default app;
