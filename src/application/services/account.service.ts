import { User } from "../../domain/entities/user.entity";
import { CreateUserDTO, LoginUserDto } from "../dtos/user.dto";
import UserService from "./user.service";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export default class AccountService {
  constructor(private userService: UserService) {}

  async userRegister(user: CreateUserDTO): Promise<string | null> {
    const foundUser = this.userService.getUserByEmail(user.email);
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
    return sign(user, process.env.JWT_SECRET_KEY || "a", { expiresIn: 3600 });
  }
}
