import { endOfMonth, startOfMonth } from "date-fns";
import { AppointmentRepository } from "../../../domain/repositories/AppointmentRepository";

export class GetAppointmentsByMonthUseCase {

	constructor(private appointmentRepository: AppointmentRepository) { }

	async execute(businessId: string, month: number){
		try {
			const dateMonth = new Date();
			dateMonth.setMonth(month);
			const startOfCurrentMonth = startOfMonth(dateMonth);
			const endOfCurrentMonth = endOfMonth(dateMonth);		
			const appointments = await this.appointmentRepository.findAllByMonthWithEmployee(businessId, startOfCurrentMonth, endOfCurrentMonth);

			const groupedAppointments = appointments.reduce((result, appointment) => {
				const day = appointment['day'];
				const employeeId = appointment['employee_id'];
				const employeeName = appointment['employeeName'];
				const numberOfAppointments = parseInt(appointment['numberOfAppointments'], 10);

				if (!result[day]) {
					result[day] = [];
				}

				const employeeInDay = result[day].find((item) => item.employeeId === employeeId);
				if (employeeInDay) {
					employeeInDay.numberOfAppointments += numberOfAppointments;
				} else {
					result[day].push({
						employeeId: employeeId,
						employeeName: employeeName,
						numberOfAppointments: numberOfAppointments
					});
				}

				return result;
			}, {});

			const response = Object.keys(groupedAppointments).map(day => ({
				day: day,
				appointmentsDay: groupedAppointments[day]
			}));

			return response;

		} catch (error) {
			console.error(error.message);
			throw new Error('Erro ao buscar agendamentos por mês');
		}
	}
}