import Appointment from "../../../domain/entities/appointment.model";
import { AppointmentRepository } from "../../../domain/repositories/AppointmentRepository";
import { EmployeeRepository } from "../../../domain/repositories/EmployeeRepository";

export class GetAppointmentsUserCase {

	constructor(private appointmentRepository: AppointmentRepository) { }

	async execute(userId: number): Promise<Appointment[]> {
		const appointments = await this.appointmentRepository.findAll(userId);
		return appointments;
	}
}