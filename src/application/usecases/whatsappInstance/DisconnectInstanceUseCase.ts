import { Logger } from "../../../infrastructure/configs/logger.config";
import { IEvolutionRepository } from "../../interfaces/IEvolutionRepository";
import { IPhoneRepository } from "../../interfaces/IPhoneRepository";

export class DisconnectInstanceUseCase {

    private readonly logger = new Logger(DisconnectInstanceUseCase.name);
    private repository: IPhoneRepository;
    private evolutionRepository: IEvolutionRepository;

    constructor(phoneRepository: IPhoneRepository, evolutionRepository: IEvolutionRepository) {
        this.evolutionRepository = evolutionRepository;
        this.repository = phoneRepository;
    }

    async execute(id: string): Promise<void> {
        this.logger.info(`start DisconnectInstanceUseCase`);

        const phone = await this.repository.findById(id);
        if (!phone) {
            throw new Error(`Phone with id ${id} not found`);
        }
        console.log(phone.instanceCode);
        await this.evolutionRepository.disconnectInstance(phone.instanceCode);
        await this.repository.updateStatusById(id, "DISCONNECTED");
        this.logger.info(`end DisconnectInstanceUseCase`);
    }
}