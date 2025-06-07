import Appointment from "../../domain/entities/appointment.model";

export interface IAppointmentRepository {
  findAll(userId: number): Promise<Appointment[]>;
  findAllByMonthWithEmployee(businessId: string, startOfCurrentMonth: Date, endOfCurrentMonth: Date): Promise<Appointment[]>;
  findByDate(businessId: string, startOfDay: Date, endOfDay: Date): Promise<Appointment[]>;
}