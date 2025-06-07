import { Logger } from "../../../infrastructure/configs/logger.config";
import { EvolutionRepository } from "../../../domain/repositories/EvolutionRepository";
import Phone from "../../../domain/entities/phone.model";

export class ConnectInstanceUseCase {

	private readonly logger = new Logger(ConnectInstanceUseCase.name);

	constructor(
		private evolutionRepository: EvolutionRepository
	) { }

	async execute(instanceCode: string): Promise<Phone> {
		this.logger.info(`start ConnectInstanceUseCase`);
		const resp = await this.evolutionRepository.connectInstance(instanceCode);
		this.logger.info(`end ConnectInstanceUseCase`);
		return resp;
	}
}