import { Router } from "express";
import { UserRepository } from "../infraestructure/persistence/user.repository";
import UserService from "../application/services/user.service";
import { AccountController } from "../presentation/controllers/account.controller";
import asyncHandler from "../core/middlewares/async.handler.middleware";
import { validate } from "../core/middlewares/validation.middleware";
import {
  userloginSchema,
  userRegisterSchema,
} from "../presentation/schemas/auth.schema";

const authRouter = Router();

const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userControll = new AccountController(userService);

authRouter.get("/users/:id", asyncHandler(userControll.getById));

authRouter.post(
  "/login",
  validate(userloginSchema),
  asyncHandler(userControll.login)
);

authRouter.post(
  "/register",
  validate(userRegisterSchema),
  asyncHandler(userControll.register)
);

export default authRouter;
