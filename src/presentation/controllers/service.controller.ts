import { Request, Response } from "express";
import { HttpStatus } from "../routers/index.route";
import { Logger } from "../../infrastructure/configs/logger.config";
import { ServiceFactory } from "../../application/factories/ServiceFactory";

export class ServiceController {

  private readonly logger = new Logger(ServiceController.name);

  constructor(private useCases: ServiceFactory) { }

  async getServiceByBusinessId(req: Request, res: Response) {
    try {
      
      this.logger.info(`Fetching service by business ID: ${req.params.businessId}`);
      const { businessId } = req.params;
      const user = await this.useCases.getServiceByBusinessId.execute(businessId);

      if (!user) {
        res.status(HttpStatus.NOT_FOUND).json({ message: "Agendamentos não profissionais" });
        return
      }

      res.json(user);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Não foi consultar profissionais' })
    }
  }

  async createService(req: Request, res: Response) {
    try {
      this.logger.info(`Creating service`);
      const service = await this.useCases.createService.execute(req.body);
      res.json(service);
    } catch (error) {
      this.logger.error(`Error creating service: ${error.message}`);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível criar o profissional' });
    }
  }

}
