import { IEvolutionRepository } from "../../application/interfaces/IEvolutionRepository";
import { Logger } from "../../infrastructure/configs/logger.config";
import { configService } from '../../infrastructure/configs/env.config';
import axios from 'axios';

export class EvolutionRepository implements IEvolutionRepository {
	private readonly logger = new Logger(EvolutionRepository.name);

	url = configService.get("EVOLUTION").URI;
	apikey = configService.get("EVOLUTION").API_KEY;
	webhook_url = configService.get("EVOLUTION").WEBHOOK_URI;

	getHeaders() {
		const headers = {
			'Content-Type': 'application/json',
			'apikey': this.apikey
		};
		return headers;
	}

	async createInstance(instanceName: string) {
		console.log('start method createInstance');
		console.log(this.url);
		this.logger.info('start method createInstance');
		const headers = this.getHeaders();
		const data = {
			instanceName: instanceName,
			token: this.apikey,
			qrcode: true,
			integration: "WHATSAPP-BAILEYS",
			webhook: {
				"url": this.webhook_url,
				"byEvents": true,
				//     "base64": true,
				"headers": {
					//         "autorization": "Bearer TOKEN",
					"Content-Type": "application/json"
				},
				"events": [
					//         "APPLICATION_STARTUP",
					//         "QRCODE_UPDATED",
					//         "MESSAGES_SET",
					"MESSAGES_UPSERT",
					//         "MESSAGES_UPDATE",
					//         "MESSAGES_DELETE",
					//         "SEND_MESSAGE",
					//         "CONTACTS_SET",
					//         "CONTACTS_UPSERT",
					//         "CONTACTS_UPDATE",
					//         "PRESENCE_UPDATE",
					//         "CHATS_SET",
					//         "CHATS_UPSERT",
					//         "CHATS_UPDATE",
					//         "CHATS_DELETE",
					//         "GROUPS_UPSERT",
					//         "GROUP_UPDATE",
					//         "GROUP_PARTICIPANTS_UPDATE",
					"CONNECTION_UPDATE"
					//         "LABELS_EDIT",
					//         "LABELS_ASSOCIATION",
					//         "CALL",
					//         "TYPEBOT_START",
					//         "TYPEBOT_CHANGE_STATUS"
				]
			}
		};

		try {
			const response = await axios.post(`${this.url}/create`, data, { headers });
			this.logger.info('end method createInstance');
			return response.data;
		} catch (error) {
			this.logger.error('Error creating instance: ' + error);
			console.log(error);
			throw error;
		}
	}

	async connectInstance(instanceName: string) {
		this.logger.info('start method connectInstance with instanceName: ' + instanceName);
		const headers = this.getHeaders();
		try {
			const response = await axios.get(`${this.url}/connect/${instanceName}`, { headers });
			this.logger.info('end method connectInstance');
			return response.data;
		} catch (error) {
			this.logger.error('Error connecting to instance: ' + error);
			throw error.data.response;
		}
	}

	async disconnectInstance(instanceName: string) {
		this.logger.info('start method disconnectInstance with instanceName: ' + instanceName);
		const headers = this.getHeaders();
		try {
			const response = await axios.delete(`${this.url}/logout/${instanceName}`, { headers });
			this.logger.info('end method disconnectInstance');
			return response.data;
		} catch (error) {
			this.logger.error('Error disconnecting instance: ' + error);
			throw error.data.response;
		}
	}
}