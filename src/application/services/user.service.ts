import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../infraestructure/persistence/user.repository";
import { CreateUserDTO } from "../dtos/user.dto";

export default class UserService {
  constructor(private userRepo: UserRepository) {}

  getById(id: number): Promise<User | null> {
    return this.userRepo.getById(id);
  }

  create(user: CreateUserDTO): Promise<User> {
    return this.userRepo.create(user);
  }
}
