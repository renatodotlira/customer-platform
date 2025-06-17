import { IEmployeeRepository } from "../../application/interfaces/IEmployeeRepository";
import { Logger } from "../../infrastructure/configs/logger.config";
import Employee, { EmployeeAttributes } from "../entities/employee.model";
import RelationEmployeeService from "../entities/relationEmployeeService.model";
import Service from "../entities/service.model";

export class EmployeeRepository implements IEmployeeRepository {

	private readonly logger = new Logger(EmployeeRepository.name);
	
	async findAll(businessId: string): Promise<Employee[]> {
		this.logger.info(`Fetching all employees for business ID: ${businessId}`);
		return await Employee.findAll({ 
			where: { businessId: businessId },
			include: [
			  {
				model: RelationEmployeeService,
				as: 'employeeServices',
				include: [{ model: Service, as: 'service' }]
			  }]
			})
			.catch(error => {
				this.logger.error(`Error fetching employees for business ID ${businessId}: ${error.message}`);
				throw error;
			});
	}

	async findById(id: number): Promise<Employee | null> {
		this.logger.info(`Fetching employee by ID: ${id}`);
		return await Employee.findByPk(id);
	}

	async save(employee: EmployeeAttributes): Promise<Employee> {
		this.logger.info(`Saving employee: ${JSON.stringify(employee)}`);
		return await Employee.create(employee)
			.catch(error => {
				this.logger.error(`Error saving employee: ${error.message}`);
				throw error;
			})
			.finally(() => {
				this.logger.info(`Employee saved successfully`);
			});
	}

}