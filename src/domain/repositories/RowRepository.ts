import { Logger } from "../../infrastructure/configs/logger.config";
import Row, { RowAttributes } from "../entities/row.model";

export class RowRepository implements RowRepository {

	private readonly logger = new Logger(RowRepository.name);

	async save(row: RowAttributes): Promise<Row> {
		this.logger.info(`Saving row: ${JSON.stringify(row)}`);
		return await Row.create(row)
			.catch(error => {
				this.logger.error(`Error saving row: ${error.message}`);
				throw error;
			})
			.finally(() => {
				this.logger.info(`Row saved successfully`);
			});
	}

}