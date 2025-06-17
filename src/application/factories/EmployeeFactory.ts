import { EmployeeRepository } from "../../domain/repositories/EmployeeRepository";
import { RowRepository } from "../../domain/repositories/RowRepository";
import { ServiceRepository } from "../../domain/repositories/ServiceRepository";
import { AttachServiceUseCase } from "../usecases/employee/AttachServiceUseCase";
import { CreateEmployeeUseCase } from "../usecases/employee/CreateEmployeeUseCase";
import { GetEmplyeeByBusinessIdUserCase } from "../usecases/employee/GetEmplyeeByBusinessIdUseCase";
import { DetachServiceUseCase } from "../usecases/employee/DetachServiceUseCase";

export class EmployeeFactory {
	public readonly getEmployeeByBusinessId: GetEmplyeeByBusinessIdUserCase;
	public readonly createEmployee: CreateEmployeeUseCase;
	public readonly attachServiceToEmployee: AttachServiceUseCase;
	public readonly detachServiceFromEmployee: DetachServiceUseCase;

	constructor(employeeRepository: EmployeeRepository, rowRepository: RowRepository, serviceRepository: ServiceRepository) {
		this.getEmployeeByBusinessId = new GetEmplyeeByBusinessIdUserCase(employeeRepository);
		this.createEmployee = new CreateEmployeeUseCase(employeeRepository, rowRepository, serviceRepository);
		this.attachServiceToEmployee = new AttachServiceUseCase(employeeRepository, serviceRepository);
		this.detachServiceFromEmployee = new DetachServiceUseCase(employeeRepository, serviceRepository);
	}
}