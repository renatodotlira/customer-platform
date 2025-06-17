import Employee, { EmployeeAttributes } from "../../domain/entities/employee.model";
import Service, { ServiceAttributes } from "../../domain/entities/service.model";

export interface IServiceRepository {
  findAll(businessId: string): Promise<Service[]>;
  findById(employeeId: string): Promise<Service | null>;
  save(employee: ServiceAttributes): Promise<Service>;
}