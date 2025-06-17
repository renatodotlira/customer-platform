import Business, { BusinessAttributes } from "../../../domain/entities/business.model";
import { BusinessRepository } from "../../../domain/repositories/BusinessRepository";

export class UpdateUseCase {

	constructor(private businessRepository: BusinessRepository) { }

	async execute(business: BusinessAttributes): Promise<any> {
		let updatedBusiness;
		try{
			updatedBusiness = await this.businessRepository.update(business);
			return updatedBusiness
		} catch (error) {
			console.error('Error creating business or linking to user:', error);
			throw new Error("Failed to create business or link to user account");
		}
	}
}