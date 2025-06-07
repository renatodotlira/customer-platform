import { IEvolutionRepository } from "../../interfaces/IEvolutionRepository";

export class UpdateInstanceStatusUseCase {
    private whatsappInstanceRepository: IEvolutionRepository;

    constructor(whatsappInstanceRepository: IEvolutionRepository) {
        this.whatsappInstanceRepository = whatsappInstanceRepository;
    }

    async execute(id: string, status: string): Promise<void> {
        //await this.whatsappInstanceRepository.updateStatusById(id, status);
    }
}