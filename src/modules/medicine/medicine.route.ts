import express, { Router } from "express";
import { medicineController } from "./medicine.controller";

const router = express.Router();

router.get("/", medicineController.getAllMedicine);
router.get("/:medicineId", medicineController.getSingleMedicine);

export const medicineRouter: Router = router;
