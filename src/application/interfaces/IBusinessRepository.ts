import Business from "../../domain/entities/business.model";
import { OtpAttributes } from "../../domain/entities/otp.model";

export interface IBusinessRepository {
  findAll(): Promise<Business[]>;
  findById(businessId: number): Promise<Business | null>;
  create(business: OtpAttributes): Promise<Business>;
  delete(businessId: number): Promise<void>;
  update(business: OtpAttributes): Promise<Business>;
}