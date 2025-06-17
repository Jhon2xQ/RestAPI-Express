import { Request, Response } from "express";
import ProductoService from "../../application/services/producto.service";
import { error } from "console";
import {
  productoCreateSchema,
  productoUpdateSchema,
} from "../middleware/schemas/producto.schema";

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
    const { error, value } = productoCreateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const producto = await this.productoService.create(value);
    return res.status(201).json({ producto });
  };

  update = async (req: Request, res: Response): Promise<Response<unknown>> => {
    const { error, value } = productoUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const producto = await this.productoService.update(
      value,
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
