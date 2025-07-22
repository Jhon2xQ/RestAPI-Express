import { injectable, inject } from "inversify";
import { User } from "../../domain/entities/user.entity";
import { CreateUserDTO } from "../dtos/user.dto";
import UserService from "./user.service";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { TYPES } from "../../core/IoC/ioc.types";
import { USER_TOKEN_TTL, JWT_SECRET_KEY } from "../../core/configs/config";

@injectable()
export default class AccountService {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  async userRegister(user: CreateUserDTO): Promise<string | null> {
    const foundUser = await this.userService.getUserByEmail(user.email);
    if (!foundUser) {
      await this.userService.createUser(user);
      return "usuario creado con exito";
    }
    return null;
  }

  async userLogin(user: User): Promise<string | null> {
    const foundUser = await this.userService.getUserByEmail(user.email);
    if (!foundUser) return null;
    const isMatchedPassword = await bcrypt.compare(user.password, foundUser.password);
    if (!isMatchedPassword) return null;
    return this.generateToken(foundUser);
  }

  async getCurrentUser(email: string): Promise<User | null> {
    return await this.userService.getUserByEmail(email);
  }

  generateToken(user: User): string {
    return sign(user, JWT_SECRET_KEY, { expiresIn: USER_TOKEN_TTL });
  }
}
