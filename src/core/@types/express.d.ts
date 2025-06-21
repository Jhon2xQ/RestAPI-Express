import { User } from "../../domain/entities/user.entity";

declare module "express" {
  export interface Request {
    user?: Any;
  }
}
