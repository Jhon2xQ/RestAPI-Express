import { Request, Response } from "express";
import CustomError from "../../core/exceptions/custom.error";
import { CreateUserDTO } from "../../application/dtos/user.dto";
import AccountService from "../../application/services/account.service";
import { User } from "../../../generated/prisma";

export class AccountController {
  constructor(private accountService: AccountService) {}

  register = async (req: Request, res: Response): Promise<Response<string>> => {
    const user = new CreateUserDTO(req.body);
    const message = await this.accountService.userRegister(user);
    if (!message) throw new CustomError("Email ya se encuentra registrado", 401);
    return res.status(201).json({ message });
  };

  login = async (req: Request, res: Response): Promise<Response<string>> => {
    const jwtToken = await this.accountService.userLogin(req.body);
    if (!jwtToken) throw new CustomError("Usuario o contrasenia invalido", 401);
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    });
    return res.status(200).json({ message: "usuario logueado con exito" });
  };

  logout = (req: Request, res: Response) => {
    res.clearCookie("token");
    //aqui se deberia implementar para poner el token en la lista negra
    res.json({ message: "Sesión cerrada" });
  };

  profile = async (req: Request, res: Response): Promise<Response<unknown>> => {
    const foundUser = await this.accountService.getCurrentUser(req.user.email);
    if (!foundUser) throw new CustomError("Error al acceder a la cuenta", 401);
    return res.status(200).json({ foundUser });
  };
}
