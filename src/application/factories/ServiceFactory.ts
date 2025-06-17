import { ServiceRepository } from "../../domain/repositories/ServiceRepository";
import { CreateServiceUseCase } from "../usecases/service/CreateServiceUseCase";
import { GetServiceByBusinessIdUserCase } from "../usecases/service/GetServiceByBusinessIdUseCase";

export class ServiceFactory {
	public readonly getServiceByBusinessId: GetServiceByBusinessIdUserCase;
	public readonly createService: CreateServiceUseCase;

	constructor(serviceRepository: ServiceRepository) {
		this.getServiceByBusinessId = new GetServiceByBusinessIdUserCase(serviceRepository);
		this.createService = new CreateServiceUseCase(serviceRepository);
	}
}