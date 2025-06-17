import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export const validate =
  (schema: Schema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(400).json({
        message: "Datos inválidos",
        details: error.details.map((d) => d.message),
      });
    }
    req.body = value;
    next();
  };
