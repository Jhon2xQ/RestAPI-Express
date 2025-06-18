import { Request, Response } from "express";
import UserService from "../../application/services/user.service";
import CustomError from "../../core/exceptions/custom.error";
import { User } from "../../domain/entities/user.entity";

export class UserController {
  constructor(private userService: UserService) {}

  getById = async (req: Request, res: Response): Promise<Response<User>> => {
    const user = await this.userService.getById(Number(req.params.id));
    if (!user) {
      throw new CustomError("usuario no encontrado", 404);
    }
    return res.status(200).json(user);
  };

  create = async (req: Request, res: Response): Promise<Response<unknown>> => {
    const user = await this.userService.create(req.body);
    return res.status(201).json(user);
  };
}
