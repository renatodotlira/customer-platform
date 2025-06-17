import Service from "../../../domain/entities/service.model";
import { ServiceRepository } from "../../../domain/repositories/ServiceRepository";
import { Logger } from "../../../infrastructure/configs/logger.config";

export class GetServiceByBusinessIdUserCase {
	
	private readonly logger = new Logger(GetServiceByBusinessIdUserCase.name);

	constructor(private serviceRepository: ServiceRepository) { }

	async execute(businessId: string): Promise<Service[]> {
		this.logger.info(`Fetching services for business ID: ${businessId}`);
		const appointments = await this.serviceRepository.findAll(businessId);
		this.logger.info(`Found ${appointments.length} services for business ID: ${businessId}`);
		return appointments;
	}
}