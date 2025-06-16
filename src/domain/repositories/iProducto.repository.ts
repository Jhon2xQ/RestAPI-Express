import { Producto } from "../entities/producto.entity";

export interface IProductoRepository {
  getAll(): Promise<Producto[]>;
}
