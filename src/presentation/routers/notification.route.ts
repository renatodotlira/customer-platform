import { Router } from "express";
import { authorizeRoles } from "../../infrastructure/middleware/auth.middleware";
import { WhatsappInstanceController } from "../controllers/whatsappInstance.controller";
import { NotificationController } from "../controllers/notification.controller";

const router = Router();

const notificationController = new NotificationController();

router.get('/business/:businessId', authorizeRoles(["EMPLOYEE", "ADMIN"]), notificationController.status.bind(notificationController))

export { router as whatsappInstanceRoutes };
