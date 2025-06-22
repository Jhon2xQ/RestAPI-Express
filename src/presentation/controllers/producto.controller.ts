import { Request, Response } from "express";
import ProductoService from "../../application/services/producto.service";
import CustomError from "../../core/exceptions/custom.error";
import { inject, injectable } from "inversify";
import { TYPES } from "../../core/IoC/ioc.types";

@injectable()
export default class ProductoController {
  constructor(@inject(TYPES.ProductoService) private productoService: ProductoService) {}

  getAll = async (_: Request, res: Response): Promise<Response<unknown>> => {
    const productos = await this.productoService.getAll();
    return res.status(200).json({ productos });
  };

  getById = async (req: Request, res: Response): Promise<Response<unknown>> => {
    const producto = await this.productoService.getById(Number(req.params.id));
    if (!producto) throw new CustomError("producto no encontrado", 404);
    return res.status(200).json({ producto });
  };

  create = async (req: Request, res: Response): Promise<Response<unknown>> => {
    const producto = await this.productoService.create(req.body);
    return res.status(201).json({ producto });
  };

  update = async (req: Request, res: Response): Promise<Response<unknown>> => {
    const productoId = Number(req.params.id);
    const producto = await this.productoService.getById(productoId);
    if (!producto) throw new CustomError("producto no encontrado", 404);
    const updatedProducto = await this.productoService.update(req.body, productoId);
    return res.status(200).json({ updatedProducto });
  };

  delete = async (req: Request, res: Response): Promise<Response<unknown>> => {
    const productoId = Number(req.params.id);
    const producto = await this.productoService.getById(productoId);
    if (!producto) throw new CustomError("producto no encontrado", 404);
    const deletedProducto = await this.productoService.delete(productoId);
    return res.status(200).json({ deletedProducto });
  };
}
