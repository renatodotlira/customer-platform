import { BusinessRepository } from "../../domain/repositories/BusinessRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { CreateBusinessAndLinkUseCase } from "../usecases/business/CreateBusinessAndLinkUseCase";
import { UpdateUseCase } from "../usecases/business/UpdateUseCase";

export class BusinessFactory {
	public readonly createBusiness: CreateBusinessAndLinkUseCase;
	public readonly updateBusiness: UpdateUseCase;

	constructor(businessRepository: BusinessRepository,
		userRepository: UserRepository
	) {
		this.createBusiness = new CreateBusinessAndLinkUseCase(businessRepository, userRepository);
		this.updateBusiness = new UpdateUseCase(businessRepository);
	}
}