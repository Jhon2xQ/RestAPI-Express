import { Router } from "express";
import ProductoController from "../presentation/controllers/producto.controller";
import { ProductoRepository } from "../infraestructure/persistence/producto.repository";
import ProductoService from "../application/services/producto.service";
import { validate } from "../core/middlewares/validation.middleware";
import {
  productoCreateSchema,
  productoUpdateSchema,
} from "../presentation/schemas/producto.schema";
import asyncHandler from "../core/middlewares/async.handler.middleware";
import { verifyToken } from "../core/middlewares/account.middleware";

const productoRouter = Router();
const repo = new ProductoRepository();
const productoService = new ProductoService(repo);
const productoController = new ProductoController(productoService);

productoRouter.get("/", verifyToken, asyncHandler(productoController.getAll));

productoRouter.get("/:id", asyncHandler(productoController.getById));

productoRouter.post("/", validate(productoCreateSchema), asyncHandler(productoController.create));

productoRouter.put("/:id", validate(productoUpdateSchema), asyncHandler(productoController.update));

productoRouter.delete("/:id", asyncHandler(productoController.delete));

export default productoRouter;
