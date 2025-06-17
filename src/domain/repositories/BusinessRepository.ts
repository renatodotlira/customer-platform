import { IBusinessRepository } from "../../application/interfaces/IBusinessRepository";
import { Logger } from "../../infrastructure/configs/logger.config";
import Business, { BusinessAttributes } from "../entities/business.model";
import { OtpAttributes } from "../entities/otp.model";

export class BusinessRepository implements IBusinessRepository {

	private readonly logger = new Logger(BusinessRepository.name);

	findById(businessId: number): Promise<Business | null> {
		throw new Error("Method not implemented.");
	}
	async create(business: BusinessAttributes): Promise<Business> {
		this.logger.info(`start method save`);
		const response = await Business.create(business).catch((error) => {
			this.logger.error(`Error creating business: ${error.message}`);
			throw new Error(`Error creating business: ${error.message}`);
		});
		console.log(response);
		this.logger.info(`end method save`);
		return response;
	}

	async update(business: BusinessAttributes): Promise<any> {
		this.logger.info(`start method update`);
		const response = await Business.update(business, {
				where: { id: business.id }
			});
		console.log(response);
		this.logger.info(`end method update`);
		return response;
	}

	findAll(): Promise<Business[]> {
		throw new Error("Method not implemented.");
	}

	delete(businessId: number): Promise<void> {
		Business.destroy({
			where: {
				id: businessId
			}
		});
		this.logger.info(`Business with ID ${businessId} deleted successfully.`);
		return Promise.resolve();
	}
}