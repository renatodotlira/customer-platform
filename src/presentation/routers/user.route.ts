import { Router } from "express";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserController } from "../controllers/user.controller";
import { UserFactory } from "../../application/factories/UserFactory";
import { BusinessRepository } from "../../domain/repositories/BusinessRepository";

const router = Router();

// Dependency Injection
const userRepository = new UserRepository();
const businessRepository = new BusinessRepository();
const userFactory = new UserFactory(userRepository, businessRepository);
const userController = new UserController(userFactory);

// Routes
router.post('/login', userController.login.bind(userController))
router.post('/auth-google', userController.loginGoogle.bind(userController))
router.post('/register', userController.createUser.bind(userController))
router.get('/confirm-email/:token', userController.confirmEmail.bind(userController));
router.post('/:userId/add-business-id', userController.addBusinessId.bind(userController));

export { router as userRoutes };
