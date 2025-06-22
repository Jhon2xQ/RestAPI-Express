import { injectable, inject } from "inversify";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../infraestructure/persistence/user.repository";
import { CreateUserDTO } from "../dtos/user.dto";
import bcrypt from "bcrypt";
import { TYPES } from "../../core/IoC/ioc.types";

@injectable()
export default class UserService {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}

  async getById(id: number): Promise<User | null> {
    return await this.userRepository.getById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.getUserByEmail(email);
  }

  async createUser(user: CreateUserDTO): Promise<User> {
    const encryptPassword = await bcrypt.hash(user.password, 10);
    user.setPassword(encryptPassword);
    return await this.userRepository.create(user);
  }
}
