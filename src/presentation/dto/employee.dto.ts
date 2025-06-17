import Appointment from "../../domain/entities/appointment.model";
import Employee from "../../domain/entities/employee.model";
import Service from "../../domain/entities/service.model";
import User from "../../domain/entities/user.model";


export class AppointmentDto {
  public id!: number;
  public start!: Date;
  public end!: Date;
  public duration?: number;
  public employee: Employee;
  public client_id!: number;
  public user: User;
  public time_display?: string;
  public time_end_display?: string;
  public services?: ServiceDto[];
  public resourceId?: string;

  constructor(appointment: Appointment) {
    this.id = appointment.id;
    this.start = appointment.start;
    this.end = appointment.end;
    this.duration = appointment.duration;
    this.employee = appointment.employee;
    this.client_id = appointment.client_id;
    this.user = appointment.user;
    this.time_display = appointment.time_display;
    this.time_end_display = appointment.time_end_display;
    const servicesDto = appointment.appointmentServices.map(appointmentService => new ServiceDto(appointmentService.service));
    this.services = servicesDto;
    this.resourceId = appointment.resourceId;
}

}

class ServiceDto {
  constructor(service: Service) {
    this.id = service.id;
    this.name = service.name;
    this.price = service.price;
    this.duration = service.duration;
  }
  public id!: string;
  public name!: string;
  public price!: number;
  public duration!: number;
}
