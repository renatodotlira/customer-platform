import { IServiceRepository } from "../../application/interfaces/IServiceRepository";
import { Logger } from "../../infrastructure/configs/logger.config";
import Service, { ServiceAttributes } from "../entities/service.model";

export class ServiceRepository implements IServiceRepository {

	private readonly logger = new Logger(ServiceRepository.name);
	
	async findAll(businessId: string): Promise<Service[]> {
		this.logger.info(`Fetching all services for business ID: ${businessId}`);
		return await Service.findAll({ where: { businessId: businessId } })
			.catch(error => {
				this.logger.error(`Error fetching services for business ID ${businessId}: ${error.message}`);
				throw error;
			});
	}

	async findById(id: string): Promise<Service | null> {
		this.logger.info(`Fetching service by ID: ${id}`);
		return await Service.findByPk(id);
	}

	async save(service: ServiceAttributes): Promise<Service> {
		this.logger.info(`Saving service: ${JSON.stringify(service)}`);
		return await Service.create(service)
			.catch(error => {
				this.logger.error(`Error saving service: ${error.message}`);
				throw error;
			})
			.finally(() => {
				this.logger.info(`Service saved successfully`);
			});
	}

}