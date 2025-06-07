import Phone from "../../../domain/entities/phone.model";
import { PhoneRepository } from "../../../domain/repositories/PhoneRepository";

export class GetInstanceByBusinessIdUserCase {

	constructor(private phoneRepository: PhoneRepository) { }

	async execute(businessId: string): Promise<Phone[]> {
		const whatsappInstances = await this.phoneRepository.findByBusinessId(businessId);
		whatsappInstances.map(instance => {
			if (instance.number) 
				instance.number = instance.number.replace(/@s\.whatsapp\.net$/, '');
			return instance;
		});
		return whatsappInstances;
	}
}