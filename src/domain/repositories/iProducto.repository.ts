import {
  CreateProductoDTO,
  UpdateProductoDTO,
} from "../../application/dtos/producto.dto";
import { Producto } from "../entities/producto.entity";

export interface IProductoRepository {
  getAll(): Promise<Producto[]>;
  getById(id: number): Promise<Producto | null>;
  create(producto: CreateProductoDTO): Promise<Producto>;
  update(producto: UpdateProductoDTO, id: number): Promise<Producto>;
  delete(id: number): Promise<Producto>;
}
