import Business, { BusinessAttributes } from "../../../domain/entities/business.model";
import { BusinessRepository } from "../../../domain/repositories/BusinessRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";

export class CreateBusinessAndLinkUseCase {

	constructor(private businessRepository: BusinessRepository,
		private userRepository: UserRepository
	) { }

	async execute(business: BusinessAttributes, userId: string): Promise<Business> {
		let createdBusiness;
		try{
			createdBusiness = await this.businessRepository.create(business);
			const updatedUser = await this.userRepository.saveBusinessId(createdBusiness.id, userId);
			if (!updatedUser) {
				throw new Error("Failed to link business to user account");
			}
			return createdBusiness
		} catch (error) {
			if (createdBusiness) {
				await this.businessRepository.delete(createdBusiness.id);
			}
			console.error('Error creating business or linking to user:', error);
			throw new Error("Failed to create business or link to user account");
		}
	}
}