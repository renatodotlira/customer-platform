import { PhoneRepository } from "../../../domain/repositories/PhoneRepository";

import { v4 as uuidv4 } from 'uuid';
import { Logger } from "../../../infrastructure/configs/logger.config";
import { EvolutionRepository } from "../../../domain/repositories/EvolutionRepository";
import Phone from "../../../domain/entities/phone.model";

export class ReconnectInstanceUseCase {

	private readonly logger = new Logger(ReconnectInstanceUseCase.name);

	constructor(
		private phoneRepository: PhoneRepository,
		private evolutionRepository: EvolutionRepository
	) { }

	async execute(phoneId: string): Promise<Phone> {
		this.logger.info(`start ReconnectInstanceUseCase`);
		const newInstanceCode = uuidv4();

		const phone = await this.phoneRepository.findById(phoneId);

		if (phone.status === "CONNECTED" || phone.status === "PENDING") {
			throw new Error('Não foi possível reconectar');
		}

		await this.evolutionRepository.createInstance(newInstanceCode);
		await this.phoneRepository.updateInstanceCodeAndStatusById(phoneId, newInstanceCode, 'CONNECTING');
		phone.status = "CONNECTING";
		phone.instanceCode = newInstanceCode;
		this.logger.info(`end ReconnectInstanceUseCase`);
		return phone;
	}
}