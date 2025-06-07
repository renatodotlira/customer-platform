import { AppointmentRepository } from "../../../domain/repositories/AppointmentRepository";
import { Logger } from "../../../infrastructure/configs/logger.config";
import { AppointmentDto } from "../../../presentation/dto/employee.dto";

const logger = new Logger('GetAppointmentsByDateUseCase');

export class GetAppointmentsByDateUseCase {

	constructor(private appointmentRepository: AppointmentRepository) { }

	async execute(businessId: string, date: any){
		logger.info(`start method getAppointmentsByDate for date: ${date}`);
		var startOfDay;
		var endOfDay;
  
		if (date) {
		  const dts = date.split('-');
		  startOfDay = new Date(Date.UTC(dts[0], dts[1] - 1, dts[2], 0, 0, 0));
		  endOfDay = new Date(Date.UTC(dts[0], dts[1] - 1, dts[2], 23, 59, 59));
		} else {
		  const currentUtcDate = new Date();
		  currentUtcDate.setHours(0, 0, 0, 0);
		  startOfDay = new Date(Date.UTC(currentUtcDate.getUTCFullYear(), currentUtcDate.getUTCMonth(), currentUtcDate.getUTCDate(), 0, 0, 0));
		  endOfDay = new Date(Date.UTC(currentUtcDate.getUTCFullYear(), currentUtcDate.getUTCMonth(), currentUtcDate.getUTCDate(), 23, 59, 59));
		}

		const appointments = await this.appointmentRepository.findByDate(businessId, startOfDay, endOfDay);
		const appointmentsDto = appointments.map(appointment => new AppointmentDto(appointment));
		return appointmentsDto;

	}
}