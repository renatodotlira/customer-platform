import { PhoneRepository } from "../../domain/repositories/PhoneRepository";
import { GetInstanceByBusinessIdUserCase } from "../usecases/whatsappInstance/GetInstanceByBusinessIdUseCase";
import { CreateInstanceUseCase } from "../usecases/whatsappInstance/CreateInstanceUseCase";
import { DisconnectInstanceUseCase } from "../usecases/whatsappInstance/DisconnectInstanceUseCase";
import { UpdateInstanceStatusUseCase } from "../usecases/whatsappInstance/UpdateInstanceStatusUseCase";
import { EvolutionRepository } from "../../domain/repositories/EvolutionRepository";
import { ReconnectInstanceUseCase } from "../usecases/whatsappInstance/ReconnectInstanceUseCase";
import { ConnectInstanceUseCase } from "../usecases/whatsappInstance/ConnectInstanceUseCase";
import { GetInstanceUserCase } from "../usecases/whatsappInstance/GetInstanceUseCase";

export class WhatsappInstanceFactory {
	public readonly getInstanceByBusinessIdUseCase: GetInstanceByBusinessIdUserCase;
	public readonly createInstanceUseCase: CreateInstanceUseCase;
	public readonly disconnectInstanceUseCase: DisconnectInstanceUseCase;
	public readonly updateInstanceStatusUseCase: UpdateInstanceStatusUseCase;
	public readonly reconnectInstanceUseCase: ReconnectInstanceUseCase;
	public readonly connectInstanceUseCase: ConnectInstanceUseCase;
	public readonly getInstanceUseCase: GetInstanceUserCase;

	constructor(
		phoneRepository: PhoneRepository,
		evolutionRepository: EvolutionRepository
	) {
		this.getInstanceByBusinessIdUseCase = new GetInstanceByBusinessIdUserCase(phoneRepository);
		this.createInstanceUseCase = new CreateInstanceUseCase(phoneRepository, evolutionRepository);
		this.reconnectInstanceUseCase = new ReconnectInstanceUseCase(phoneRepository, evolutionRepository);
		this.connectInstanceUseCase = new ConnectInstanceUseCase(evolutionRepository);
		this.getInstanceUseCase = new GetInstanceUserCase(phoneRepository);
		this.disconnectInstanceUseCase = new DisconnectInstanceUseCase(phoneRepository, evolutionRepository);
	}
}