import { CreateUserDTO } from "../../application/dtos/user.dto";
import { User } from "../entities/user.entity";

export interface IUserRepository {
  getUserByEmail(email: string): Promise<User | null>;
  create(user: CreateUserDTO): Promise<User>;
}
