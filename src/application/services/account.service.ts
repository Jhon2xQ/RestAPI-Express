import { injectable, inject } from "inversify";
import { CreateUserDTO, LoginUserDto, PublicUserDTO } from "../dtos/user.dto";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { TYPES } from "../../core/IoC/ioc.types";
import { USER_TOKEN_TTL, JWT_SECRET_KEY } from "../../core/configs/config";
import { UserRepository } from "../../infraestructure/persistence/user.repository";

@injectable()
export default class AccountService {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}

  async userRegister(user: CreateUserDTO): Promise<boolean> {
    const foundUser = await this.userRepository.getUserByEmail(user.email);
    if (!foundUser) {
      await this.userRepository.create(user);
      return true;
    }
    return false;
  }

  async userLogin(user: LoginUserDto): Promise<string | null> {
    const foundUser = await this.userRepository.getUserByEmail(user.email);
    if (!foundUser) return null;
    const { lastName, firstName, email, password } = foundUser;
    const isMatchedPassword = await bcrypt.compare(user.password, password);
    if (!isMatchedPassword) return null;
    return this.generateToken({ lastName, firstName, email });
  }

  async getProfileByEmail(iemail: string): Promise<PublicUserDTO | null> {
    const foundUser = await this.userRepository.getUserByEmail(iemail);
    if (!foundUser) return null;
    const { lastName, firstName, email } = foundUser;
    return { lastName, firstName, email };
  }

  generateToken(user: PublicUserDTO): string {
    return sign(user, JWT_SECRET_KEY, { expiresIn: USER_TOKEN_TTL });
  }
}
