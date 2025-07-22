import { Request, Response } from "express";
import CustomError from "../../core/exceptions/custom.error";
import AccountService from "../../application/services/account.service";
import { injectable, inject } from "inversify";
import { TYPES } from "../../core/IoC/ioc.types";
import CustomResponse from "../../core/exceptions/custom.response";

@injectable()
export class AccountController {
  constructor(@inject(TYPES.AccountService) private accountService: AccountService) {}

  register = async (req: Request, res: Response): Promise<Response<any>> => {
    const success = await this.accountService.userRegister(req.body);
    if (!success) throw new CustomError("Email ya se encuentra registrado", 404);
    return res.status(201).json({ success, message: "Usuario registrado con exito" });
  };

  login = async (req: Request, res: Response): Promise<Response<string>> => {
    const jwtToken = await this.accountService.userLogin(req.body);
    if (!jwtToken) throw new CustomError("Usuario o contrasenia invalido", 404);
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    });
    return res.status(200).json({ success: true, message: "Usuario logueado con exito" });
  };

  logout = (req: Request, res: Response) => {
    res.clearCookie("token");
    //aqui se deberia implementar para poner el token en la lista negra ////
    res.json({ message: "Sesión cerrada" });
  };

  profile = async (req: Request, res: Response): Promise<Response<unknown>> => {
    const foundUser = await this.accountService.getProfileByEmail(req.user.email);
    if (!foundUser) throw new CustomError("Error al acceder a la cuenta", 401);
    return res.status(200).json({ success: true, data: foundUser });
  };
}
//falta la parte de refresh token y mejora las cookies y los tiempos de vida tanto del token como de la cookie
//relaciones entre tablas y createdAt | updatedAt
