import { Producto } from "../entities/producto.entity";

export interface IProductoRepository {
  getAll(): Promise<Producto[]>;
  getById(id: number): Promise<Producto | null>;
  create(producto: Producto): Promise<Producto>;
  update(producto: Producto, id: number): Promise<Producto>;
  delete(id: number): Promise<boolean>;
}
