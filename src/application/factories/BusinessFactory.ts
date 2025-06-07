import { BusinessRepository } from "../../domain/repositories/BusinessRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { CreateBusinessAndLinkUseCase } from "../usecases/business/CreateBusinessAndLinkUseCase";

export class BusinessFactory {
	public readonly createBusiness: CreateBusinessAndLinkUseCase;

	constructor(businessRepository: BusinessRepository,
		userRepository: UserRepository
	) {
		this.createBusiness = new CreateBusinessAndLinkUseCase(businessRepository, userRepository);
	}
}