import { Request, Response } from "express";
import CustomError from "../../core/exceptions/custom.error";
import { CreateUserDTO } from "../../application/dtos/user.dto";
import AccountService from "../../application/services/account.service";

export class AccountController {
  constructor(private accountService: AccountService) {}

  login = async (req: Request, res: Response): Promise<Response<string>> => {
    const jwtToken = await this.accountService.userLogin(req.body);
    if (!jwtToken) throw new CustomError("Usuario o contrasenia invalido", 401);
    return res.status(200).json({ jwtToken });
  };

  register = async (req: Request, res: Response): Promise<Response<string>> => {
    const user = new CreateUserDTO(req.body);
    const message = await this.accountService.userRegister(user);
    if (!message) throw new CustomError("Email ya se encuentra registrado", 401);
    return res.status(201).json({ message });
  };
}
