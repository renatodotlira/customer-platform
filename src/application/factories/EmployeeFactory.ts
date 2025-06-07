import { EmployeeRepository } from "../../domain/repositories/EmployeeRepository";
import { CreateEmployeeUseCase } from "../usecases/employee/CreateEmployeeUseCase";
import { GetEmplyeeByBusinessIdUserCase } from "../usecases/employee/GetEmplyeeByBusinessIdUseCase";

export class EmployeeFactory {
	public readonly getEmployeeByBusinessId: GetEmplyeeByBusinessIdUserCase;
	public readonly createEmployee: CreateEmployeeUseCase;

	constructor(employeeRepository: EmployeeRepository) {
		this.getEmployeeByBusinessId = new GetEmplyeeByBusinessIdUserCase(employeeRepository);
		this.createEmployee = new CreateEmployeeUseCase(employeeRepository);
	}
}