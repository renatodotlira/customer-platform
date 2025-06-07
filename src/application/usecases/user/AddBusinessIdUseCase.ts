import User from "../../../domain/entities/userAccount.model";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { BadRequestException } from "../../../shared/exceptions";
import { EmailService } from "../../../infrastructure/services/email/email.service";
import LoggerInstance from "../../../infrastructure/configs/logger.config";


export class AddBusinessIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(businessId: string, userId: string): Promise<User | null> {
    try {
      const userAccount = await this.userRepository.findById(userId);
      if (!userAccount) {
        throw new BadRequestException("Usuário não encontrado.");
      }
      if (userAccount.businessId) {
        throw new BadRequestException("Usuário já possui um businessId associado.");
      }
      return await this.userRepository.saveBusinessId(businessId, userId); 
      
    } catch (error) {
      LoggerInstance.error(error)
      throw new BadRequestException(error.message);
    }

    
  }
}