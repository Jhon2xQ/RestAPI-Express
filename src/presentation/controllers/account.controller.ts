import { Request, Response } from "express";
import UserService from "../../application/services/user.service";
import CustomError from "../../core/exceptions/custom.error";
import { User } from "../../domain/entities/user.entity";
import { CreateUserDTO } from "../../application/dtos/user.dto";

export class AccountController {
  constructor(private userService: UserService) {}

  getById = async (req: Request, res: Response): Promise<Response<User>> => {
    const user = await this.userService.getById(Number(req.params.id));
    if (!user) {
      throw new CustomError("usuario no encontrado", 404);
    }
    return res.status(200).json(user);
  };

  login = async (req: Request, res: Response): Promise<Response<User>> => {
    const dbUser = await this.userService.AuthenticatedUser(
      req.body.email,
      req.body.password
    );
    if (!dbUser) {
      throw new CustomError("Usuario o contrasenia invalido", 404);
    }
    return res.status(200).json(dbUser);
  };

  register = async (
    req: Request,
    res: Response
  ): Promise<Response<unknown>> => {
    const dbUser = await this.userService.getUserByEmail(req.body.email);
    if (dbUser) {
      throw new CustomError("el email ya se encuentra registrado", 404);
    }
    const user = new CreateUserDTO(req.body);
    const createdUser = await this.userService.create(user);
    return res.status(201).json(createdUser);
  };
}
