import Employee, { EmployeeAttributes } from "../../../domain/entities/employee.model";
import { EmployeeRepository } from "../../../domain/repositories/EmployeeRepository";

export class CreateEmployeeUseCase {

	constructor(private employeeRepository: EmployeeRepository,
	) { }

	async execute(employee: EmployeeAttributes): Promise<Employee> {
		try{
			return await this.employeeRepository.save(employee);
		} catch (error) {
			console.error('Error creating employee', error);
			throw new Error("Failed to create employee");
		}
	}
}