import { Router } from "express";
import { AccountController } from "../presentation/controllers/account.controller";
import asyncHandler from "../core/middlewares/async.handler.middleware";
import { validate } from "../core/middlewares/validation.middleware";
import { userLoginSchema, userRegisterSchema } from "../presentation/schemas/account.schema";
import { verifyToken } from "../core/middlewares/account.middleware";
import container from "../core/IoC/ioc.config";
import { TYPES } from "../core/IoC/ioc.types";

const accountRouter = Router();

const accountController = container.get<AccountController>(TYPES.AccountController);

accountRouter.get("/profile", verifyToken, asyncHandler(accountController.profile));
accountRouter.post("/login", validate(userLoginSchema), asyncHandler(accountController.login));
accountRouter.post("/register", validate(userRegisterSchema), asyncHandler(accountController.register));
accountRouter.post("/logout", verifyToken, accountController.logout);

export default accountRouter;
