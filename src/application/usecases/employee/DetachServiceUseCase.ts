import { EmployeeRepository } from "../../../domain/repositories/EmployeeRepository";
import { ServiceRepository } from "../../../domain/repositories/ServiceRepository";
import RelationEmployeeService from "../../../domain/entities/relationEmployeeService.model";

export class DetachServiceUseCase {

	constructor(private employeeRepository: EmployeeRepository,
				private serviceRepository: ServiceRepository
	) { }

	async execute(employeeId: number, businessId: string, serviceId: string): Promise<void> {
		if (!employeeId || !businessId || !serviceId) 
			throw new Error("Invalid input: employeeId, businessId, and serviceId are required");

		try{

			const employee = await this.employeeRepository.findById(employeeId);

			if (!employee) {
				throw new Error("Employee not found");
			}
			if (employee.businessId !== businessId) {
				throw new Error("Employee does not belong to the specified business");
			}
			const service = await this.serviceRepository.findById(serviceId);

			if (!service) {
				throw new Error("Service not found");
			}
			if (service.businessId !== businessId) {
				throw new Error("Service does not belong to the specified business");
			}

			await RelationEmployeeService.destroy({
				where: {
					employeeId: employeeId,
					serviceId: serviceId
				}
			});

		} catch (error) {
			console.error('Error creating employee service relation', error);
			throw new Error("Failed to create employee service relation");
		}
	}
}