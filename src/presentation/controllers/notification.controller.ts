import { Request, Response } from "express";
import { HttpStatus } from "../routers/index.route";
import { Logger } from "../../infrastructure/configs/logger.config";
import { WhatsappInstanceFactory } from "../../application/factories/WhatsappInstanceFactory";

interface Clients {
  [clientId: string]: Response;
}

export class NotificationController {

  private readonly logger = new Logger(NotificationController.name);

  clients: Clients = {};

  constructor() { }

  async status(req: Request, res: Response) {
    this.logger.info(`start method notifyConnectionUpdate`);
    const clientId = req.params.clientId;

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    this.clients[clientId] = res;
    console.log(`Cliente ${clientId} conectado. Total de conexões: ${Object.keys(this.clients).length}`);

    req.on('close', () => {
      delete this.clients[clientId]; // Remove cliente quando desconectar
      console.log(`Cliente ${clientId} desconectado. Total de conexões: ${Object.keys(this.clients).length}`);
    });
  }

  async triggerUpdate(req: Request, res: Response) {
    this.logger.info(`start method notifyConnectionUpdate`);
    const { clientId } = req.params;
    const { status } = req.body; // Espera um JSON { "status": "online" }

    if (!status) {
      return res.status(400).json({ message: "Status não fornecido" });
    }

    const client = this.clients[clientId];
    if (client) {
      console.log(`Enviando evento SSE para cliente ${clientId}: ${status}`);
      client.write(`data: ${JSON.stringify({ status })}\n\n`);
      res.status(200).json({ message: `Evento enviado para cliente ${clientId}` });
    } else {
      res.status(404).json({ message: `Cliente ${clientId} não encontrado` });
    }
  }
}
