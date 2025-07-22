import { injectable } from "inversify";
import { CreateUserDTO } from "../../application/dtos/user.dto";
import { prisma } from "../../core/configs/prisma";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/iUser.repository";
import bcrypt from "bcrypt";

@injectable()
export class UserRepository implements IUserRepository {
  async getUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async create(user: CreateUserDTO): Promise<User> {
    return await prisma.user.create({
      data: {
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
        password: await bcrypt.hash(user.password, 10),
      },
    });
  }
}
