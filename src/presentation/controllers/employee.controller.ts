import { Request, Response } from "express";
import { HttpStatus } from "../routers/index.route";
import { Logger } from "../../infrastructure/configs/logger.config";
import { EmployeeFactory } from "../../application/factories/EmployeeFactory";

export class EmployeeController {

  private readonly logger = new Logger(EmployeeController.name);

  constructor(private useCases: EmployeeFactory) { }

  async getEmployeeByBusinessId(req: Request, res: Response) {
    try {
      
      this.logger.info(`Fetching employee by business ID: ${req.params.businessId}`);
      const { businessId } = req.params;
      const user = await this.useCases.getEmployeeByBusinessId.execute(businessId);

      if (!user) {
        res.status(HttpStatus.NOT_FOUND).json({ message: "Agendamentos não profissionais" });
        return
      }

      res.json(user);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Não foi consultar profissionais' })
    }
  }

  async createEmployee(req: Request, res: Response) {
    try {
      this.logger.info(`Creating employee`);
      const employee = await this.useCases.createEmployee.execute(req.body);
      res.json(employee);
    } catch (error) {
      this.logger.error(`Error creating employee: ${error.message}`);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível criar o profissional' });
    }
  }

  async attachServiceToEmployee(req: Request, res: Response) {
    try {
      this.logger.info(`Attaching service to employee: ${req.params.employeeId}`);
      const { employeeId, businessId, serviceId } = req.params;
      await this.useCases.attachServiceToEmployee.execute(Number(employeeId), businessId, serviceId);
      res.status(HttpStatus.CREATED).json({ message: 'Serviço adicionado com sucesso ao profissional' });
    } catch (error) {
      this.logger.error(`Error attaching service to employee: ${error.message}`);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível adicionar o serviço ao profissional' });
    }
  }

  async detachServiceFromEmployee(req: Request, res: Response) {
    try {
      this.logger.info(`Detaching service from employee: ${req.params.employeeId}`);
      const { employeeId, businessId, serviceId } = req.params;
      await this.useCases.detachServiceFromEmployee.execute(Number(employeeId), businessId, serviceId);
      res.status(HttpStatus.OK).json({ message: 'Serviço removido com sucesso do profissional' });
    } catch (error) {
      this.logger.error(`Error detaching service from employee: ${error.message}`);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível remover o serviço do profissional' });
    }
  }

}
