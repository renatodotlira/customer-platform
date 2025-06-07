import { Router } from "express";
import { authorizeRoles } from "../../infrastructure/middleware/auth.middleware";
import { PhoneRepository } from "../../domain/repositories/PhoneRepository";
import { WhatsappInstanceFactory } from "../../application/factories/WhatsappInstanceFactory";
import { WhatsappInstanceController } from "../controllers/whatsappInstance.controller";
import { EvolutionRepository } from "../../domain/repositories/EvolutionRepository";

const router = Router();

const phoneRepository = new PhoneRepository();
const evolutionRepository = new EvolutionRepository();
const whatsappInstanceFactory = new WhatsappInstanceFactory(phoneRepository, evolutionRepository);
const whatsappInstanceController = new WhatsappInstanceController(whatsappInstanceFactory);

// Routes for business-related operations
router.get(
    '/business/:businessId',
    authorizeRoles(["EMPLOYEE", "ADMIN"]),
    whatsappInstanceController.getByBusinessId.bind(whatsappInstanceController)
);

// Routes for instance creation and status updates
router.post(
    '/',
    authorizeRoles(["EMPLOYEE", "ADMIN"]),
    whatsappInstanceController.create.bind(whatsappInstanceController)
);
router.put(
    '/:id/status',
    authorizeRoles(["EMPLOYEE", "ADMIN"]),
    whatsappInstanceController.updateStatus.bind(whatsappInstanceController)
);

// Routes for instance reconnection and connection management
router.post(
    '/reconnect',
    authorizeRoles(["EMPLOYEE", "ADMIN"]),
    whatsappInstanceController.reconnect.bind(whatsappInstanceController)
);
router.get(
    '/:instanceCode/connect',
    authorizeRoles(["EMPLOYEE", "ADMIN"]),
    whatsappInstanceController.connect.bind(whatsappInstanceController)
);
router.get(
    '/:instanceCode',
    authorizeRoles(["EMPLOYEE", "ADMIN"]),
    whatsappInstanceController.getInstanceByInstanceCode.bind(whatsappInstanceController)
);

router.post(
    '/:id/disconnect',
    authorizeRoles(["EMPLOYEE", "ADMIN"]),
    whatsappInstanceController.disconnect.bind(whatsappInstanceController)
);


export { router as whatsappInstanceRoutes };
