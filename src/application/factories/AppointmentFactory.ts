import { AppointmentRepository } from "../../domain/repositories/AppointmentRepository";
import { GetAppointmentsByMonthUseCase } from "../usecases/appointment/GetAppointmentsByMonthUseCase";
import { GetAppointmentsUserCase } from "../usecases/appointment/GetAppointmentsUseCase";
import { GetAppointmentsByDateUseCase } from "../usecases/appointment/GetAppointmentsByDateUseCase";

export class AppointmentFactory {
	public readonly getAppointments: GetAppointmentsUserCase;
	public readonly getAppointmentsByMonth: GetAppointmentsByMonthUseCase;
	public readonly getAppointmentsByDate: GetAppointmentsByDateUseCase;

	constructor(appointmentRepository: AppointmentRepository) {
		this.getAppointments = new GetAppointmentsUserCase(appointmentRepository);
		this.getAppointmentsByMonth = new GetAppointmentsByMonthUseCase(appointmentRepository);
		this.getAppointmentsByDate = new GetAppointmentsByDateUseCase(appointmentRepository);
	}
}