import { Request, Response } from "express";
import { HttpStatus } from "../routers/index.route";
import { Logger } from "../../infrastructure/configs/logger.config";
import { BusinessFactory } from "../../application/factories/BusinessFactory";
import { BusinessAttributes } from "../../domain/entities/business.model";
import { v4 as uuidv4 } from 'uuid';

export class BusinessController {
  
  private readonly logger = new Logger(BusinessController.name);
  
  constructor(private businessCases: BusinessFactory) {}

  async createAndLinkToUserAccount(req: Request, res: Response) {
    try {
      const { companyName, companyType, companySize } = req.body;
      const { userId } = req.params;
      const newBusiness: BusinessAttributes = {
        id: uuidv4(),
        name: companyName,
        type: companyType,
        size: companySize
      }
      this.logger.info(`Creating business: ${JSON.stringify(newBusiness)}`);
			const business = await this.businessCases.createBusiness.execute(newBusiness, userId);
			res.json(business);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Não foi possível criar a empresa'})
    }
  }
}

