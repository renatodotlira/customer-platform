import { Router } from "express";
import { authorizeRoles } from "../../infrastructure/middleware/auth.middleware";
import { ServiceRepository } from "../../domain/repositories/ServiceRepository";
import { ServiceFactory } from "../../application/factories/ServiceFactory";
import { ServiceController } from "../controllers/service.controller";

const router = Router();

const serviceRepository = new ServiceRepository();
const serviceFactory = new ServiceFactory(serviceRepository);
const serviceController = new ServiceController(serviceFactory);

router.get('/business/:businessId', authorizeRoles(["EMPLOYEE", "ADMIN"]), serviceController.getServiceByBusinessId.bind(serviceController));
router.post('/', authorizeRoles(["EMPLOYEE", "ADMIN"]), serviceController.createService.bind(serviceController));

export { router as serviceRoutes };
