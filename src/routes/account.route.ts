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
import AccountService from "../application/services/account.service";

const accountRouter = Router();

const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const accountService = new AccountService(userService);
const accountController = new AccountController(accountService);

accountRouter.post(
  "/login",
  validate(userloginSchema),
  asyncHandler(accountController.login)
);

accountRouter.post(
  "/register",
  validate(userRegisterSchema),
  asyncHandler(accountController.register)
);

export default accountRouter;
