import { Request, Response } from "express";
import { UserFactory } from "../../application/factories/UserFactory";
import { UserAttributes } from "../../domain/entities/userAccount.model";
import { HttpStatus } from "../routers/index.route";
import { Logger } from "../../infrastructure/configs/logger.config";
import { BadRequestException } from "../../shared/exceptions";

export class UserController {
  
  private readonly logger = new Logger(UserController.name);
  
  constructor(private userCases: UserFactory) {}

  async login(req: Request, res: Response) {
    try {
      this.logger.info('requested login');
      const { userName, password } = req.body;
      const responseLogin = await this.userCases.loginUser.execute(userName, password )
      res.json(responseLogin)
    } catch (error) {
      this.logger.error(error.message);
      res.status(HttpStatus.BAD_REQUEST).json(error.message)
    }
  }

  async loginGoogle(req: Request, res: Response) {
    try {
      const { credential } = req.body;
      const userAccount = await this.userCases.googleLoginUser.execute(credential)
      res.json(userAccount)
    } catch (error) {
      this.logger.error(error.message);
      res.status(HttpStatus.BAD_REQUEST).json(error.message)
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const { userName, password } = req.body;
			const newUser: UserAttributes = {
        email: userName,
        password: password,
      }
      
			const user = await this.userCases.createUser.execute(newUser);
			res.json(user);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Não foi possível criar o usuário'})
    }
  }

  async confirmEmail(req: Request, res: Response) {
    this.logger.info('requested confirm email');
		const { token } = req.params;
		try {
      await this.userCases.confirmEmailUser.execute(token);
      res.status(HttpStatus.OK).json({ message: "Email confirmado com sucesso" });
    } catch (error) {
      this.logger.error(error.message);
      if (error.status === HttpStatus.BAD_REQUEST) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
      }
    }
  }

  async addBusinessId(req: Request, res: Response) {
    this.logger.info('requested add businessId');
    const { businessId } = req.body;
    const { userId } = req.params;
    try {
      await this.userCases.addBusinessIdUseCase.execute(businessId, userId);
      res.status(HttpStatus.OK).json({ message: "Email confirmado com sucesso" });
    } catch (error) {
      this.logger.error(error.message);
      if (error.status === HttpStatus.BAD_REQUEST) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
      }
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Erro ao adicionar businessId' });
    }
  }
}
