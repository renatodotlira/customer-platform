import Employee from "../../../domain/entities/employee.model";
import { EmployeeRepository } from "../../../domain/repositories/EmployeeRepository";
import { Logger } from "../../../infrastructure/configs/logger.config";

export class GetEmplyeeByBusinessIdUserCase {
	
	private readonly logger = new Logger(GetEmplyeeByBusinessIdUserCase.name);

	constructor(private employeeRepository: EmployeeRepository) { }

	async execute(businessId: string): Promise<Employee[]> {
		this.logger.info(`Fetching employees for business ID: ${businessId}`);
		const appointments = await this.employeeRepository.findAll(businessId);
		this.logger.info(`Found ${appointments.length} employees for business ID: ${businessId}`);
		return appointments;
	}
}