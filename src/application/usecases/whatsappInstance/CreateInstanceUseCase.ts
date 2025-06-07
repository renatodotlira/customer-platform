import { v4 as uuidv4 } from 'uuid';
import { Logger } from "../../../infrastructure/configs/logger.config";
import { EvolutionRepository } from "../../../domain/repositories/EvolutionRepository";
import Phone from "../../../domain/entities/phone.model";
import { IPhoneRepository } from "../../interfaces/IPhoneRepository";

export class CreateInstanceUseCase {

	private readonly logger = new Logger(CreateInstanceUseCase.name);

	constructor(
		private phoneRepository: IPhoneRepository,
		private evolutionRepository: EvolutionRepository
	) { }

	async execute(businessId: string): Promise<Phone> {
		this.logger.info(`start CreateInstanceUseCase`);
		const newInstanceCode = uuidv4();
		//VOU MUDAR UM POUCO O DESIGN DA APLICAÇÃO, VOU UNIFICAR O PHONE COM O WHATSAPPINSTANCE
		//PRIMEIRAMENTE VOU BUSCAR TODAS AS INTÂNCIAS DO BUSINESS ATÉ AS DESCONECTADAS
		const phones = await this.phoneRepository.findByBusinessId(businessId);
		//SE TEM UMA INSTANCIA EM STATUS CONNECTING, VOU RETORNÁ-LA
		const connectingInstance = phones.find(instance => instance.status === 'CONNECTING');
		if (connectingInstance) {
			return connectingInstance;
		}
		//SE HOUVER ALGUMA DESCONECTADA, VOU REATIVÁ-LA
		//PARA REATIVAR VOU GERAR UM NOVO INSTANCE_CODE E ATUALIZAR O STATUS PARA CONNECTING
		const disconnectedInstance = phones.find(instance => instance.status === 'DISCONNECTED');
		if (disconnectedInstance) {
			await this.evolutionRepository.createInstance(newInstanceCode);
			await this.phoneRepository.updateInstanceCodeAndStatusById(disconnectedInstance.id, newInstanceCode, 'CONNECTING');
			disconnectedInstance.instanceCode = newInstanceCode;
			disconnectedInstance.status = 'CONNECTING';
			return disconnectedInstance;
		}
		
		//SE NÃO HOUVER PHONES ENTÃO VOU CRIAR UM NOVO
		var createInstance = false;
		var newPhone = null;
		const id = uuidv4();
		if (phones.length === 0) {
			newPhone = await this.phoneRepository.save({
				id,
				businessId,
				instanceCode: newInstanceCode,
				status: 'PENDING',
				active: true,
				createdAt: new Date()
			});
			createInstance = true;
		}
		if (createInstance) {
			await this.evolutionRepository.createInstance(newInstanceCode);
			await this.phoneRepository.updateStatusById(id, 'CONNECTING');
			newPhone.status = 'CONNECTING';
		}
		this.logger.info(`end CreateInstanceUseCase`);

		return newPhone;
	}
}