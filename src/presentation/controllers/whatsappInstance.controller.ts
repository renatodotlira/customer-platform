import { Request, Response } from "express";
import { HttpStatus } from "../routers/index.route";
import { Logger } from "../../infrastructure/configs/logger.config";
import { WhatsappInstanceFactory } from "../../application/factories/WhatsappInstanceFactory";

export class WhatsappInstanceController {

  private readonly logger = new Logger(WhatsappInstanceController.name);

  constructor(private useCases: WhatsappInstanceFactory) { }

  async getByBusinessId(req: Request, res: Response) {
    this.logger.info(`start method getByBusinessId`);
    try {
      const { businessId } = req.params;
      const whatsappInstances = await this.useCases.getInstanceByBusinessIdUseCase.execute(businessId);
      if (!whatsappInstances) {
        res.status(HttpStatus.NOT_FOUND).json({ message: "Nenhuma instancia foi encontrada" });
        return
      }

      res.json(whatsappInstances);
      this.logger.info(`end method getByBusinessId`);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Não foi possível consultar instancias: ' + error })
    }
  }

  async disconnect(req: Request, res: Response) {
    try {
      this.logger.info(`start method disconnect`);
      const { id } = req.params;
      const instance = await this.useCases.disconnectInstanceUseCase.execute(id);
      this.logger.info(`end method disconnect`);
      res.json(instance).send;
    } catch (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ message: error.message })
    }
  }

  async create(req: Request, res: Response) {
    try {
      this.logger.info(`start method create`);
      const { businessId } = req.body;
      const instance = await this.useCases.createInstanceUseCase.execute(businessId);
      this.logger.info(`end method create`);
      res.json(instance).send;
    } catch (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ message: error.message })
    }
  }

  async reconnect(req: Request, res: Response) {
    try {
      this.logger.info(`start method reconnect`);
      const { id } = req.body;
      const instance = await this.useCases.reconnectInstanceUseCase.execute(id);
      this.logger.info(`end method reconnect`);
      res.json(instance).send;
    } catch (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ message: error.message })
    }
  }

  async updateStatus(req: Request, res: Response): Promise<void> {
    this.logger.info(`start method updteStatus`);
    const { id } = req.params;
    const { status } = req.body;

    try {
      await this.useCases.updateInstanceStatusUseCase.execute(id, status);
      this.logger.info(`end method updateStatus`);
      res.status(200).send({ message: "Status atualizado com sucesso" });
    } catch (error) {
      res.status(500).send({ message: "Erro ao atualizar o status", error });
    }
  }

  async connect(req: Request, res: Response) {
    try {
      this.logger.info(`start method connect`);
      const { instanceCode } = req.params;
      const instance = await this.useCases.connectInstanceUseCase.execute(instanceCode);
      this.logger.info(`end method connect`);
      res.json(instance).send;
    } catch (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ message: error.message })
    }
  }

  async getInstanceByInstanceCode(req: Request, res: Response) {
    try {
      this.logger.info(`start method getInstance`);
      const { instanceCode } = req.params;
      console.log(instanceCode);
      const instance = await this.useCases.getInstanceUseCase.execute(instanceCode);
      console.log(instance);
      this.logger.info(`end method getInstance`);
      res.json(instance).send;
    } catch (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ message: error.message })
    }
  }

}
