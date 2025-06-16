import { Request, Response } from "express";
import ProductoService from "../../application/services/producto.service";
import { error } from "console";

//falta el return y promise para devolver con middleware
export default class ProductoController {
  constructor(private productoService: ProductoService) {}

  getAll = async (_: Request, res: Response): Promise<Response<unknown>> => {
    try {
      const productos = await this.productoService.getAll();
      return res.status(200).json({ productos });
    } catch (error) {
      return res.status(500).json({
        error: {
          code: 500,
          message: "Internal server error",
          details: error,
        },
      });
    }
  };

  getById = async (req: Request, res: Response): Promise<Response<unknown>> => {
    const producto = await this.productoService.getById(Number(req.params.id));
    if (producto) {
      return res.status(200).json({ producto });
    } else {
      return res.status(404).json({
        error: {
          code: 404,
          message: "error al obtener producto",
        },
      });
    }
  };

  create = async (req: Request, res: Response): Promise<Response<unknown>> => {
    const producto = await this.productoService.create(req.body);
    return res.status(201).json({ producto });
  };

  update = async (req: Request, res: Response): Promise<Response<unknown>> => {
    const producto = await this.productoService.update(
      req.body,
      Number(req.params.id)
    );
    if (producto) {
      return res.status(200).json({ producto });
    } else {
      return res.status(404).json({
        error: {
          code: 404,
          message: "Error al actualizar producto",
        },
      });
    }
  };

  delete = async (req: Request, res: Response): Promise<Response<unknown>> => {
    const producto = await this.productoService.delete(Number(req.params.id));
    if (producto) {
      return res.status(200).json({ producto });
    } else {
      return res.status(404).json({
        error: {
          code: 404,
          message: "Error al eliminar producto",
        },
      });
    }
  };
}
