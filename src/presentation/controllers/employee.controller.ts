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

}
