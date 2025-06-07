import { Op, Sequelize } from "sequelize";
import { IAppointmentRepository } from "../../application/interfaces/IAppointmentRepository";
import Appointment from "../entities/appointment.model";
import Employee from "../entities/employee.model";
import Service from "../entities/service.model";
import RelationAppointmentService from "../entities/relationAppointmentService.model";
import User from "../entities/user.model";


export class AppointmentRepository implements IAppointmentRepository {
	
	async findAllByMonthWithEmployee(businessId: string, startOfCurrentMonth: Date, endOfCurrentMonth: Date): Promise<Appointment[]> {
		const appointments = Appointment.findAll({
			where: {
			  start: {
				[Op.between]: [startOfCurrentMonth, endOfCurrentMonth],
			  },
			  businessId: businessId,
			  status: "SCHEDULED",
			},
			include: [
			  {
				model: Employee,
				as: 'employee',
				attributes: ['name']
			  }
			],
			attributes: [
			  [Sequelize.fn('DATE', Sequelize.col('Appointment.start')), 'day'],
			  'employee_id',
			  [Sequelize.col('employee.name'), 'employeeName'],
			  [Sequelize.fn('COUNT', Sequelize.col('Appointment.id')), 'numberOfAppointments'],
			],
			group: ['day', 'employee_id', 'employee.name'],
			order: [[Sequelize.fn('DATE', Sequelize.col('Appointment.start')), 'ASC']],
			raw: true
		  });
		  return appointments;
	}
	
	async findAll(userId: number): Promise<Appointment[]> {
		return Appointment.findAll({
			where: { status: "SCHEDULED", user_id: userId },
			include: [
				{
					model: Employee,
					as: 'employee',
				}
			],
		});
	}

	async findByDate(businessId: string, startOfDay: Date, endOfDay: Date): Promise<Appointment[]> {
		return await Appointment.findAll({
			where: {
			  start: {
				[Op.between]: [startOfDay, endOfDay], 
			  },
			  businessId: businessId,
			  status: "SCHEDULED",
			},
			include: [
			  {
				model: Employee,
				as: 'employee',
			  },
			  {
				model: User,
				as: 'user',
			  },
			  {
				model: RelationAppointmentService,
				as: 'appointmentServices',
				include: [{ model: Service, as: 'service' }]
			  }
			],
			order: [['start', 'ASC']]
		  });
	}
}