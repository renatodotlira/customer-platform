import User from "../../../domain/entities/userAccount.model";
import { UserRepository } from "../../../domain/repositories/UserRepository";


export class GetUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}