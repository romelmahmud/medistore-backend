import express, { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { medicineController } from "./medicine.controller";

const router = express.Router();

router.get("/", medicineController.getAllMedicine);
router.get("/:medicineId", medicineController.getSingleMedicine);
router.patch(
  "/:medicineId",
  auth(UserRole.ADMIN, UserRole.SELLER),
  medicineController.updateMedicine,
);

export const medicineRouter: Router = router;
