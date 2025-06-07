import { Router } from "express";
import { authorizeRoles } from "../../infrastructure/middleware/auth.middleware";
import { AppointmentController } from "../controllers/appointment.controller";
import { AppointmentRepository } from "../../domain/repositories/AppointmentRepository";
import { AppointmentFactory } from "../../application/factories/AppointmentFactory";

const router = Router();

const appointmentRepository = new AppointmentRepository();
const appointmentFactory = new AppointmentFactory(appointmentRepository);
const appointmentController = new AppointmentController(appointmentFactory);

router.get('/business/:businessId/date', authorizeRoles(["EMPLOYEE", "ADMIN"]), 
    appointmentController.getAppointmentsByDate.bind(appointmentController));

router.get('/business/:businessId/employee/:employeeId', authorizeRoles(["EMPLOYEE", "ADMIN"]), 
    appointmentController.getAppointments.bind(appointmentController));

router.get('/business/:businessId/month/:month', authorizeRoles(["EMPLOYEE", "ADMIN"]), 
    appointmentController.getAppointmentsByMonth.bind(appointmentController));

export { router as appointmentRoutes };
