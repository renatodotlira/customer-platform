import { IPhoneRepository } from "../../application/interfaces/IPhoneRepository";
import { Logger } from "../../infrastructure/configs/logger.config";
import Phone, { PhoneAttributes } from "../entities/phone.model";

export class PhoneRepository implements IPhoneRepository {
	private readonly logger = new Logger(PhoneRepository.name);

	async save(phone: PhoneAttributes): Promise<Phone> {
		this.logger.info(`start method save`);
		const response = await Phone.create(phone);
		this.logger.info(`end method save`);
		return response;
	}

	async findById(id: string): Promise<Phone> {
		this.logger.info(`start method findById`);
		const response = await Phone.findByPk(id);
		this.logger.info(`end method findById`);
		return response;
	}

	async findByInstanceCode(instanceCode: string): Promise<Phone> {
		this.logger.info(`start method findByInstanceCode`);
		const response = await Phone.findOne({
			where: { instanceCode, active: true }
		});
		this.logger.info(`end method findByInstanceCode`);
		return response;
	}

	async findByBusinessId(businessId: string): Promise<Phone[]> {
		this.logger.info(`start method findByBusinessId`);
		const response = await Phone.findAll({
			where: { businessId, active: true }
		});
		this.logger.info(`end method findByBusinessId`);
		return response;
	}

	async updateInstanceCode(instanceCode: string, id: number): Promise<any> {
		this.logger.info(`start method updateInstanceId`);
		const response = await Phone.update(
			{ instanceCode, updatedAt: new Date() },
			{ where: { id } }
		);
		this.logger.info(`end method updateInstanceId`);
		return response;
	}

	async updateInstanceCodeAndStatusById(id: string, instanceCode: string, status: string): Promise<any> {
		this.logger.info(`start method updateInstanceCodeAndStatus`);
		const response = await Phone.update(
			{ instanceCode, status, updatedAt: new Date() },
			{ where: { id } }
		);
		this.logger.info(`end method updateInstanceCodeAndStatus`);
		return response;
	}

	async updateStatusById(id: string, status: string): Promise<void> {
        this.logger.info(`start method updateStatusById`);
		await Phone.update({ status, updatedAt: new Date() }, { where: { id } });
		this.logger.info(`end method updateStatusById`);
    }

}