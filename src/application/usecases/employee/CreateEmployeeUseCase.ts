import Employee, { EmployeeAttributes } from "../../../domain/entities/employee.model";
import { EmployeeRepository } from "../../../domain/repositories/EmployeeRepository";
import { RowRepository } from "../../../domain/repositories/RowRepository";
import { ServiceRepository } from "../../../domain/repositories/ServiceRepository";
import RelationEmployeeService from "../../../domain/entities/relationEmployeeService.model";

export class CreateEmployeeUseCase {

	constructor(private employeeRepository: EmployeeRepository,
				private rowRepository: RowRepository,
				private serviceRepository: ServiceRepository
	) { }

	async execute(employee: EmployeeAttributes): Promise<Employee> {
		try{

			const services = await this.serviceRepository.findAll(employee.businessId);

			if (!services || services.length === 0) {
				throw new Error("No services found for the business");
			}
			const employeeSaved = await this.employeeRepository.save(employee);

			const employeeServices = services.map(service => ({
				serviceId: service.id,
				employeeId: employeeSaved.id
				}
			));

			await RelationEmployeeService.bulkCreate(employeeServices);

			if (!employeeSaved) {
				throw new Error("Failed to save employee");
			}
			
			const rowSaved = await this.rowRepository.save(
				{
					rowId: employeeSaved.id.toString(),
					sectionId: 1,
					description: " ",
					employeeId: employeeSaved.id,
					title: employeeSaved.name,
					isForward: true
				}
			);
			if (!rowSaved) {
				throw new Error("Failed to save row for employee");
			}
			return employeeSaved;
		} catch (error) {
			console.error('Error creating employee', error);
			throw new Error("Failed to create employee");
		}
	}
}