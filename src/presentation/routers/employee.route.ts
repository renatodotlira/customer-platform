import { Router } from "express";
import { authorizeRoles } from "../../infrastructure/middleware/auth.middleware";
import { EmployeeRepository } from "../../domain/repositories/EmployeeRepository";
import { RowRepository } from "../../domain/repositories/RowRepository";
import { EmployeeFactory } from "../../application/factories/EmployeeFactory";
import { EmployeeController } from "../controllers/employee.controller";
import { ServiceRepository } from "../../domain/repositories/ServiceRepository";

const router = Router();

const employeeRepository = new EmployeeRepository();
const rowRepository = new RowRepository();
const serviceRepository = new ServiceRepository();
const employeeFactory = new EmployeeFactory(employeeRepository, rowRepository, serviceRepository);
const employeeController = new EmployeeController(employeeFactory);

router.get('/business/:businessId', authorizeRoles(["EMPLOYEE", "ADMIN"]), employeeController.getEmployeeByBusinessId.bind(employeeController));
router.post('/business/:businessId', authorizeRoles(["EMPLOYEE", "ADMIN"]), employeeController.createEmployee.bind(employeeController));
router.post('/:employeeId/business/:businessId/services/:serviceId/attach', authorizeRoles(["EMPLOYEE", "ADMIN"]), employeeController.attachServiceToEmployee.bind(employeeController));
router.post('/:employeeId/business/:businessId/services/:serviceId/detach', authorizeRoles(["EMPLOYEE", "ADMIN"]), employeeController.detachServiceFromEmployee.bind(employeeController));

export { router as employeeRoutes };
