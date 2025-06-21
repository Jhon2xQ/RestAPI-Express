import { NextFunction, Request, Response } from "express";
import CustomError from "../exceptions/custom.error";
import { verify } from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) throw new CustomError("Sin autorización", 401);
  try {
    const data = verify(token, process.env.JWT_SECRET_KEY || "me");
    req.user = data;
    next();
  } catch (err) {
    throw new CustomError("Token inválido", 401);
  }
};
