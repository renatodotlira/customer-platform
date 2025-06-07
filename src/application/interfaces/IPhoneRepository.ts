import Phone, { PhoneAttributes } from "../../domain/entities/phone.model";

export interface IPhoneRepository {
  save(phone: PhoneAttributes): Promise<Phone>;
  findById(id: string): Promise<Phone>;
  findByBusinessId(businessId: string): Promise<Phone[]>;
  updateInstanceCode(instanceCode: string, id: number): Promise<any>;
  updateInstanceCodeAndStatusById(id: string, instanceCode: string, status: string): Promise<any>;
  updateStatusById(id: string, status: string): Promise<void>;
}