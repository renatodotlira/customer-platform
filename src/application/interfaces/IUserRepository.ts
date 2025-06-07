import User, { UserAttributes } from "../../domain/entities/userAccount.model";

export interface IUserRepository {
  login(userName: string): Promise<User>;
  findById(id: string): Promise<User | null>;
  save(user: UserAttributes): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  saveBusinessId(businessId: string, userId: string): Promise<User>;
}