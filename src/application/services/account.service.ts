import { injectable, inject } from "inversify";
import { User } from "../../domain/entities/user.entity";
import { CreateUserDTO, LoginUserDto, PublicUserDTO } from "../dtos/user.dto";
import UserService from "./user.service";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { TYPES } from "../../core/IoC/ioc.types";
import { USER_TOKEN_TTL, JWT_SECRET_KEY } from "../../core/configs/config";

@injectable()
export default class AccountService {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  async userRegister(user: CreateUserDTO): Promise<boolean> {
    const foundUser = await this.userService.getPublicUserByEmail(user.email);
    if (!foundUser) {
      await this.userService.createUser(user);
      return true;
    }
    return false;
  }

  async userLogin(user: LoginUserDto): Promise<string | null> {
    const foundUser = await this.userService.getUserByEmail(user.email);
    if (!foundUser) return null;
    const { lastName, firstName, email, password } = foundUser;
    const isMatchedPassword = await bcrypt.compare(user.password, password);
    if (!isMatchedPassword) return null;
    return this.generateToken({ lastName, firstName, email });
  }

  async getProfileByEmail(email: string): Promise<PublicUserDTO | null> {
    return await this.userService.getPublicUserByEmail(email);
  }

  generateToken(user: PublicUserDTO): string {
    return sign(user, JWT_SECRET_KEY, { expiresIn: USER_TOKEN_TTL });
  }
}
