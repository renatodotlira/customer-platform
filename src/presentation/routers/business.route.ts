import { Router } from "express";
import { BusinessRepository } from "../../domain/repositories/BusinessRepository";
import { BusinessFactory } from "../../application/factories/BusinessFactory";
import { BusinessController } from "../controllers/business.controller";
import { UserRepository } from "../../domain/repositories/UserRepository";

const router = Router();

// Dependency Injection
const businessRepository = new BusinessRepository();
const userRepository = new UserRepository();
const businessFactory = new BusinessFactory(businessRepository, userRepository);
const businessController = new BusinessController(businessFactory);

// Routes
router.post('/:userId', businessController.createAndLinkToUserAccount.bind(businessController))
router.put('/', businessController.createAndLinkToUserAccount.bind(businessController))


export { router as businessRoutes };
