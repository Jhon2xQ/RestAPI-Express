import { Router } from "express";
import ProductoController from "../presentation/controllers/producto.controller";
import { validate } from "../core/middlewares/validation.middleware";
import { productoCreateSchema, productoUpdateSchema } from "../presentation/schemas/producto.schema";
import asyncHandler from "../core/middlewares/async.handler.middleware";
import { verifyToken } from "../core/middlewares/account.middleware";
import container from "../core/IoC/ioc.config";
import { TYPES } from "../core/IoC/ioc.types";

const productoRouter = Router();

const productoController = container.get<ProductoController>(TYPES.ProductoController);

productoRouter.get("/", verifyToken, asyncHandler(productoController.getAll));
productoRouter.get("/:id", verifyToken, asyncHandler(productoController.getById));
productoRouter.post("/", verifyToken, validate(productoCreateSchema), asyncHandler(productoController.create));
productoRouter.put("/:id", verifyToken, validate(productoUpdateSchema), asyncHandler(productoController.update));
productoRouter.delete("/:id", verifyToken, asyncHandler(productoController.delete));

export default productoRouter;
