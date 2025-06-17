import User, { UserAttributes } from "../../../domain/entities/userAccount.model";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { BadRequestException } from "../../../shared/exceptions";
import { EmailService } from "../../../infrastructure/services/email/email.service";
import LoggerInstance from "../../../infrastructure/configs/logger.config";
import bcrypt from 'bcryptjs';
import Role from "../../../domain/entities/role.model";
import RelationUserAccountRole from "../../../domain/entities/relationUserAccountRoles.model";
import { v4 as uuidv4 } from 'uuid';
import { BusinessRepository } from "../../../domain/repositories/BusinessRepository";
import { BusinessAttributes } from "../../../domain/entities/business.model";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository, 
    private readonly emailService: EmailService,
    private businessRepository: BusinessRepository,
  ) {}

  async execute(user: UserAttributes): Promise<User | null> {
    try {
      const userAccount = await User.findOne({ where: { email: user.email}});
      if (userAccount) {
        throw new BadRequestException("Usuário já existe com o email informado.");
      }
      const passwordEncrypted = await bcrypt.hash(user.password, 10);
      const role = await Role.findOne({ where: { name: "ADMIN"}});
      
      const newBusiness: BusinessAttributes = {
              id: uuidv4()
            }
      await this.businessRepository.create(newBusiness);

      const newUser = await this.userRepository.save(
        {  id: uuidv4(), email: user.email, password: passwordEncrypted, businessId: newBusiness.id, status: 'CREATED'}
      );
      
      if (role) {
        await RelationUserAccountRole.create({
          userAccountId: newUser.id,
          roleId: role.id
        });
      }
      this.emailService.sendOtp(user.email);
      return newUser;
    } catch (error) {
      LoggerInstance.error(error)
      throw new BadRequestException(error.message);
    }

    
  }
}