import { Logger } from "../../../infrastructure/configs/logger.config";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { OtpRepository } from "../../../domain/repositories/OtpRepository";
import { BadRequestException } from "../../../shared/exceptions";

export class ConfirmEmailUserCase {

	private readonly logger = new Logger(ConfirmEmailUserCase.name);

	constructor(private userRepository: UserRepository
		, private otpRepository: OtpRepository
	) { }

	async execute(token: string): Promise<any> {
		this.logger.info(`start method ConfirmEmailUserCase`);
		
		const otp = await this.otpRepository.findByToken(token);
		if (!otp) {
			this.logger.error(`Token not found`);
			throw new BadRequestException("O token não foi encontrado");
		}
		if (otp.consumed) {
			this.logger.error(`Token already consumed`);
			throw new BadRequestException("Token já foi consumido");
		}
		if (otp.expirationDate < new Date()) {
			this.logger.error(`Token expired`);
			throw new BadRequestException("Token expirado");
		}
		const user = await this.userRepository.findByEmail(otp.metadataValue);
		if (!user) {
			this.logger.error(`User not found`);
			throw new BadRequestException("Usuario não encontrado");
		}
		if (user.emailConfirmed) {
			this.logger.error(`user.already.confirmed`);
			throw new BadRequestException("Usuario já confirmado");
		}
		user.emailConfirmed = true;
		await user.save();
		otp.consumed = true;
		await otp.save();
		this.logger.info(`Token consumed`);
		this.logger.info(`User confirmed`);
		this.logger.info(`end method ConfirmEmailUserCase`);
		return {
			message: "User confirmed",
			user: user,
		};
	}
}