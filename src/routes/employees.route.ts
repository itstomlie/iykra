import { Router } from "express";
import EmployeesController from "../controllers/employees.controller";
import EmployeesControllerV2 from "../controllers/employees.controller.v2";
import { versionMiddleware } from "../middlewares/versionMiddleware";

const router = Router();

router.get(
  "/",
  versionMiddleware("2.0.0"),
  EmployeesControllerV2.getAllEmployees
);

router.get("/", EmployeesController.getAllEmployees);

router.get("/:id", EmployeesController.getEmployeeById);

router.post("/", EmployeesController.createEmployee);

router.put("/:id", EmployeesController.updateEmployee);

router.delete("/:id", EmployeesController.deleteEmployee);

export default router;
