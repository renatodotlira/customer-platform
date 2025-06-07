import Employee, { EmployeeAttributes } from "../../domain/entities/employee.model";

export interface IEmployeeRepository {
  findAll(businessId: string): Promise<Employee[]>;
  findById(employeeId: number): Promise<Employee | null>;
  save(employee: EmployeeAttributes): Promise<Employee>;
}