import Phone from "../../../domain/entities/phone.model";
import { PhoneRepository } from "../../../domain/repositories/PhoneRepository";

export class GetInstanceUserCase {

	constructor(private phoneRepository: PhoneRepository) { }

	async execute(instanceCode: string): Promise<Phone> {
		return await this.phoneRepository.findByInstanceCode(instanceCode);
	}
}