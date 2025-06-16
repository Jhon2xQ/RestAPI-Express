import { Router } from "express";
import ProductoController from "../presentation/controllers/producto.controller";
import { ProductoRepository } from "../infraestructure/persistence/producto.repository";
import ProductoService from "../application/services/producto.service";

const productoRouter = Router();
const repo = new ProductoRepository();
const productoService = new ProductoService(repo);
const productoController = new ProductoController(productoService);

productoRouter.get("/", (req, res) => {
  productoController.getAll(req, res);
});
productoRouter.get("/:id", (req, res) => {
  productoController.getById(req, res);
});
productoRouter.post("/", (req, res) => {
  productoController.create(req, res);
});
productoRouter.put("/:id", (req, res) => {
  productoController.update(req, res);
});
productoRouter.delete("/:id", (req, res) => {
  productoController.delete(req, res);
});

export default productoRouter;
