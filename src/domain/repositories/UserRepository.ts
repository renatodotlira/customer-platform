import { IUserRepository } from "../../application/interfaces/IUserRepository";
import RelationUserAccountRole from "../entities/relationUserAccountRoles.model";
import Role from "../entities/role.model";
import UserAccount, { UserAttributes } from "../entities/userAccount.model";

export class UserRepository implements IUserRepository {

	async login(userName: string): Promise<UserAccount> {
		console.log("UserRepository login method called with userName:", userName);
		return await UserAccount.findOne({
			where: { email: userName },
			include: {
				model: RelationUserAccountRole,
				as: "userAccountRoles",
				include: [{ model: Role, as: "role" }]
			}
		});
	}

	async findById(id: string): Promise<UserAccount | null> {
		return await UserAccount.findByPk(id);
	}

	async save(user: UserAttributes): Promise<UserAccount> {
		return await UserAccount.create(user);
	}

	async findByEmail(email: string): Promise<UserAccount | null> {
		return await UserAccount.findOne({ where: { email } });
	}

	async saveBusinessId(saveBusinessId: string, userId: string): Promise<any> {
		const existingUser = await UserAccount.update(
			{ businessId: saveBusinessId },
			{ where: { id: userId } }
		);
		if (!existingUser) {
			throw new Error("User not found or update failed.");
		}
		console.log(existingUser);
		return existingUser;
	}
}