import { injectable, inject } from "inversify";
import { UserRepository } from "../../infraestructure/persistence/user.repository";
import { CreateUserDTO, PublicUserDTO } from "../dtos/user.dto";
import { TYPES } from "../../core/IoC/ioc.types";
import { User } from "../../domain/entities/user.entity";

@injectable()
export default class UserService {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}

  async getPublicUserByEmail(iemail: string): Promise<PublicUserDTO | null> {
    const foundUser = await this.userRepository.getUserByEmail(iemail);
    if (!foundUser) return null;
    const { lastName, firstName, email } = foundUser;
    return { lastName, firstName, email };
  }

  async createUser(iuser: CreateUserDTO): Promise<PublicUserDTO> {
    const createdUser = await this.userRepository.create(iuser);
    const { lastName, firstName, email } = createdUser;
    return { lastName, firstName, email };
  }
}
