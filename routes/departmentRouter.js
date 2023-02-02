import express from "express";
const router = express.Router();
import authMiddleWare from "../middlewares/auth.js"

import {
  createDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";

router
  .route("/")
  .post(authMiddleWare, createDepartment)
  .get(getAllDepartments)
  .patch(authMiddleWare, updateDepartment)
  .delete(authMiddleWare, deleteDepartment);

export default router;
