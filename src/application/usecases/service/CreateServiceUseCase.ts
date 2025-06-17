import Service, { ServiceAttributes } from "../../../domain/entities/service.model";
import { ServiceRepository } from "../../../domain/repositories/ServiceRepository";
import { v4 as uuidv4 } from 'uuid';

export class CreateServiceUseCase {

	constructor(private serviceRepository: ServiceRepository,
	) { }

	async execute(service: ServiceAttributes): Promise<Service> {
		try{
			service.id = uuidv4();
			return await this.serviceRepository.save(service);
		} catch (error) {
			console.error('Error creating service', error);
			throw new Error("Failed to create service");
		}
	}
}