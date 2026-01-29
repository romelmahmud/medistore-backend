import express, { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { medicineController } from "./medicine.controller";

const router = express.Router();

router.get("/", medicineController.getAllMedicine);
router.get("/:medicineId", medicineController.getSingleMedicine);
router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SELLER),
  medicineController.createMedicine,
);
router.patch(
  "/:medicineId",
  auth(UserRole.ADMIN, UserRole.SELLER),
  medicineController.updateMedicine,
);
router.delete(
  "/:medicineId",
  auth(UserRole.ADMIN, UserRole.SELLER),
  medicineController.deleteMedicine,
);

export const medicineRouter: Router = router;
