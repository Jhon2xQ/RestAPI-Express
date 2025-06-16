import { Router } from "express";
import ProductoController from "../presentation/controllers/producto.controller";
import { ProductoRepository } from "../infraestructure/persistence/producto.repository";
import ProductoService from "../application/services/producto.service";

const productoRouter = Router();
const repo = new ProductoRepository();
const productoService = new ProductoService(repo);
const productoController = new ProductoController(productoService);

productoRouter.get("/", productoController.getAll);

export default productoRouter;
