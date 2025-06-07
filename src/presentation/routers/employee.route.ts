import { Router } from "express";
import { authorizeRoles } from "../../infrastructure/middleware/auth.middleware";
import { EmployeeRepository } from "../../domain/repositories/EmployeeRepository";
import { EmployeeFactory } from "../../application/factories/EmployeeFactory";
import { EmployeeController } from "../controllers/employee.controller";

const router = Router();

const employeeRepository = new EmployeeRepository();
const employeeFactory = new EmployeeFactory(employeeRepository);
const employeeController = new EmployeeController(employeeFactory);

router.get('/business/:businessId', authorizeRoles(["EMPLOYEE", "ADMIN"]), employeeController.getEmployeeByBusinessId.bind(employeeController));
router.post('/', authorizeRoles(["EMPLOYEE", "ADMIN"]), employeeController.createEmployee.bind(employeeController));

export { router as employeeRoutes };
