import { CreateUserDTO } from "../../application/dtos/user.dto";
import { prisma } from "../../core/configs/prisma";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/iUser.repository";

export class UserRepository implements IUserRepository {
  async getById(id: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async create(user: CreateUserDTO): Promise<User> {
    return await prisma.user.create({
      data: user,
    });
  }
}
