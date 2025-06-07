import { UserRepository } from "../../../domain/repositories/UserRepository";
import { configService } from "../../../infrastructure/configs/env.config";
import { Logger } from "../../../infrastructure/configs/logger.config";
import { BadRequestException } from "../../../shared/exceptions";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class UserLoginUserCase {

	private readonly logger = new Logger(UserLoginUserCase.name);

	constructor(private userRepository: UserRepository) { }

	async execute(userName: string, password: string): Promise<any> {
		this.logger.info(`start method UserLoginUserCase`);
		const userAccount = await this.userRepository.login(userName);
		if (!userAccount) {
			throw new BadRequestException("Usuário não encontrado.");
		}
		
		const isValid = await bcrypt.compare(password, userAccount.password);
		if (!isValid) {
			throw new BadRequestException("Senha inválida.");
		}
		const roles: string[] = [];
		userAccount.userAccountRoles.forEach(userAccountRole => {
			roles.push(userAccountRole.role.name);
		}); 
		const token = jwt.sign({ userAccountId: userAccount.id, businessId: userAccount.businessId, roles: roles }, configService.get("AUTHENTICATION").JWT.SECRET, {
			expiresIn: configService.get("AUTHENTICATION").JWT.EXPIRIN_IN,
		});
		this.logger.info(`start method UserLoginUserCase`);
		return {
			token: token,
			businessId: userAccount.businessId,
			userId: userAccount.id,
		};
	}
}