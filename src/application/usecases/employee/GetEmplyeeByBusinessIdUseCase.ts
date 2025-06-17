import Employee from "../../../domain/entities/employee.model";
import { EmployeeRepository } from "../../../domain/repositories/EmployeeRepository";
import { Logger } from "../../../infrastructure/configs/logger.config";

export class GetEmplyeeByBusinessIdUserCase {
	
	private readonly logger = new Logger(GetEmplyeeByBusinessIdUserCase.name);

	constructor(private employeeRepository: EmployeeRepository) { }

	async execute(businessId: string): Promise<Employee[]> {
		this.logger.info(`Fetching employees for business ID: ${businessId}`);
		const employees = await this.employeeRepository.findAll(businessId);
		this.logger.info(`Found ${employees.length} employees for business ID: ${businessId}`);
		console.log(employees);
		return employees;
	}
}