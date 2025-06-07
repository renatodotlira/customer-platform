import { UserRepository } from "../../domain/repositories/UserRepository";
import { EmailService } from "../../infrastructure/services/email/email.service";
import { OtpRepository } from "../../domain/repositories/OtpRepository";
import { CreateUserUseCase } from "../usecases/user/CreateUserUseCase";
import { GetUserByIdUseCase } from "../usecases/user/GetUserByIdUseCase";
import { GoogleLoginUserCase } from "../usecases/user/GoogleLoginUseCase";
import { UserLoginUserCase } from "../usecases/user/UserLoginUseCase";
import { ConfirmEmailUserCase } from "../usecases/user/ConfirmEmailUseCase";
import { AddBusinessIdUseCase } from "../usecases/user/AddBusinessIdUseCase";

export class UserFactory {
	public readonly getUserById: GetUserByIdUseCase;
	public readonly createUser: CreateUserUseCase;
	public readonly loginUser: UserLoginUserCase;
	public readonly googleLoginUser: GoogleLoginUserCase;
	public readonly confirmEmailUser: ConfirmEmailUserCase;
	public readonly addBusinessIdUseCase: AddBusinessIdUseCase;

	constructor(userRepository: UserRepository) {
		const otpRepository = new OtpRepository();
		const emailService = new EmailService(otpRepository);
		this.getUserById = new GetUserByIdUseCase(userRepository);
		this.createUser = new CreateUserUseCase(userRepository, emailService);
		this.loginUser = new UserLoginUserCase(userRepository);
		this.googleLoginUser = new GoogleLoginUserCase(userRepository);
		this.confirmEmailUser = new ConfirmEmailUserCase(userRepository, otpRepository);
		this.addBusinessIdUseCase = new AddBusinessIdUseCase(userRepository);
	}
}