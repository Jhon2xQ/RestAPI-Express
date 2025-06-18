import { Router } from "express";
import { UserRepository } from "../infraestructure/persistence/user.repository";
import UserService from "../application/services/user.service";
import { UserController } from "../presentation/controllers/user.controller";
import asyncHandler from "../core/middlewares/async.handler.middleware";

const userRouter = Router();

const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userControll = new UserController(userService);

userRouter.get("/:id", asyncHandler(userControll.getById));

userRouter.post("/", asyncHandler(userControll.create));

export default userRouter;
