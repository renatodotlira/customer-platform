import { UserRepository } from "../../../domain/repositories/UserRepository";
import { configService } from "../../../infrastructure/configs/env.config";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Logger } from "../../../infrastructure/configs/logger.config";

export class GoogleLoginUserCase {

	private readonly logger = new Logger(GoogleLoginUserCase.name);

	constructor(private userRepository: UserRepository) { }

	async execute(credential: string): Promise<any> {
		this.logger.info(`start method GoogleLoginUserCase`);
		const { email, sub }: any = jwt.decode(credential);
		let userAccount = await this.userRepository.login(email);

		if (!userAccount) {
			const passwordEncrypted = await bcrypt.hash(sub, 10);
			userAccount = await this.userRepository.save({ email: email, password: passwordEncrypted });
		}

		const roles: string[] = [];
		userAccount.userAccountRoles?.forEach(userAccountRole => {
			roles.push(userAccountRole.role.name);
		});
		const token = jwt.sign({ userAccountId: userAccount.id, businessId: userAccount.businessId, roles: roles }, configService.get("AUTHENTICATION").JWT.SECRET, {
			expiresIn: configService.get("AUTHENTICATION").JWT.EXPIRIN_IN,
		});
		this.logger.info(`end method GoogleLoginUserCase`);
		return {
			token: token,
			businessId: userAccount.businessId,
		};
	}
}
