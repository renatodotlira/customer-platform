import { Request, Response } from "express";
import { HttpStatus } from "../routers/index.route";
import { Logger } from "../../infrastructure/configs/logger.config";
import { AppointmentFactory } from "../../application/factories/AppointmentFactory";

export class AppointmentController {

  private readonly logger = new Logger(AppointmentController.name);
  constructor(private useCases: AppointmentFactory) { }

  async getAppointments(req: Request, res: Response) {
    try {
      const { businessId, employeeId } = req.params;
      const appointments = await this.useCases.getAppointments.execute(Number(employeeId));
      if (!appointments) {
        res.status(HttpStatus.NOT_FOUND).json({ message: "Agendamentos não encontrado" });
        return
      }
      res.json(appointments);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Não foi consultar agendamentos.' })
    }
  }

  async getAppointmentsByMonth(req: Request, res: Response) {
    try {
      const { businessId, month } = req.params;
      this.logger.info(`start method getAppointmentsByMonth for month: ${month}`);
      const appointments = await this.useCases.getAppointmentsByMonth.execute(businessId, Number(month));
      if (!appointments) {
        res.status(HttpStatus.NOT_FOUND).json({ message: "Agendamentos não encontrado" });
        return
      }
      res.json(appointments);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Não foi possível criar o seu cadastro' })
    }
  }

  async getAppointmentsByDate(req: Request, res: Response) {
    try {
      const { date } = req.query;
      const { businessId } = req.params;
      this.logger.info(`start method getAppointmentsByDate for date: ${date}`);
      const user = await this.useCases.getAppointmentsByDate.execute(businessId, date);
      if (!user) {
        res.status(HttpStatus.NOT_FOUND).json({ message: "Agendamentos não encontrado" });
        return
      }
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Não foi consultar agendamentos' })
    }
  }

}
