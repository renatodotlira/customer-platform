import { IOtpRepository } from "../../application/interfaces/IOtpRepository";
import { Logger } from "../../infrastructure/configs/logger.config";
import Otp, { OtpAttributes } from "../entities/otp.model";

export class OtpRepository implements IOtpRepository {
	private readonly logger = new Logger(OtpRepository.name);

	async save(otp: OtpAttributes): Promise<Otp> {
		this.logger.info(`start method save`);
		const response = await Otp.create(otp);
		this.logger.info(`end method save`);
		return response;
	}

	findByToken(token: string): Promise<Otp | null> {
		this.logger.info(`start method findByToken`);
		const response =  Otp.findOne({ where: { token } });
		this.logger.info(`end method findByToken`);
		return response;
	}

}