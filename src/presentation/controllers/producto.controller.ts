import { Request, Response } from "express";
import ProductoService from "../../application/services/producto.service";

//falta el return y promise para devolver con middleware
export default class ProductoController {
  constructor(private productoService: ProductoService) {}

  getAll = async (_: Request, res: Response) => {
    const productos = await this.productoService.getAll();
    res.status(200).json({ productos });
  };
}
