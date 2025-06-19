import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../infraestructure/persistence/user.repository";
import { CreateUserDTO } from "../dtos/user.dto";
import bcrypt from "bcrypt";

export default class UserService {
  constructor(private userRepo: UserRepository) {}

  async getById(id: number): Promise<User | null> {
    return await this.userRepo.getById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepo.getUserByEmail(email);
  }

  async AuthenticatedUser(email: string, pass: string): Promise<User | null> {
    const foundUser = await this.getUserByEmail(email);
    if (!foundUser) {
      return null;
    }
    const isMatchedPassword = await bcrypt.compare(pass, foundUser.password);
    if (!isMatchedPassword) {
      return null;
    }
    return foundUser;
  }

  async create(user: CreateUserDTO): Promise<User> {
    const encryptPassword = await bcrypt.hash(user.password, 10);
    user.setPassword(encryptPassword);
    return await this.userRepo.create(user);
  }
}
