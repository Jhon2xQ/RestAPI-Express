import { Request, Response } from "express";
import ProductoService from "../../application/services/producto.service";
import CustomError from "../../core/exceptions/custom.error";

export default class ProductoController {
  constructor(private productoService: ProductoService) {}

  getAll = async (_: Request, res: Response): Promise<Response<unknown>> => {
    try {
      const productos = await this.productoService.getAll();
      return res.status(200).json({ productos });
    } catch (error) {
      throw new CustomError("Internal server error", 500);
    }
  };

  getById = async (req: Request, res: Response): Promise<Response<unknown>> => {
    const producto = await this.productoService.getById(Number(req.params.id));
    if (!producto) {
      throw new CustomError("producto no encontrado", 404);
    }
    return res.status(200).json({ producto });
  };

  create = async (req: Request, res: Response): Promise<Response<unknown>> => {
    const producto = await this.productoService.create(req.body);
    return res.status(201).json({ producto });
  };

  update = async (req: Request, res: Response): Promise<Response<unknown>> => {
    const productoId = Number(req.params.id);
    const producto = await this.productoService.getById(productoId);
    if (!producto) {
      throw new CustomError("producto no encontrado", 404);
    }
    const updatedProducto = await this.productoService.update(
      req.body,
      productoId
    );
    return res.status(200).json({ updatedProducto });
  };

  delete = async (req: Request, res: Response): Promise<Response<unknown>> => {
    const productoId = Number(req.params.id);
    const producto = await this.productoService.getById(productoId);
    if (!producto) {
      throw new CustomError("producto no encontrado", 404);
    }
    const deletedProducto = await this.productoService.delete(productoId);
    return res.status(200).json({ producto });
  };
}

//podriamos user los middleware de mejor forma [middleware en routes tal vez] -ok
//añadir validacion con jwt y dar una capa de seguridad a los endpoints.
// - averiguar sobre el created_at y updated_at
// - averiguar sobre env para mas cosas

//relaciones entre tablas.
//manejar de mejor forma las excepciones.  -ok : a medias, seria mejor que regrese un json.
//convertir de routes a container
// - todo por ahora :)  -> despliegue.
