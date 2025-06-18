import { CreateUserDTO } from "../../application/dtos/user.dto";
import { User } from "../entities/user.entity";

export interface IUserRepository {
  getById(id: number): Promise<User | null>;
  create(user: CreateUserDTO): Promise<User>;
}
