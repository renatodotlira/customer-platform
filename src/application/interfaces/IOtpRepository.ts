import Otp, { OtpAttributes } from "../../domain/entities/otp.model";

export interface IOtpRepository {
  save(phone: OtpAttributes): Promise<Otp>;
  findByToken(token: string): Promise<Otp | null>;
}