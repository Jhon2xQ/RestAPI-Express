import { Producto } from "../../domain/entities/producto.entity";
import { ProductoRepository } from "../../infraestructure/persistence/producto.repository";
import { CreateProductoDTO, UpdateProductoDTO } from "../dtos/producto.dto";

export default class ProductoService {
  constructor(private productoRepositoy: ProductoRepository) {}

  getAll(): Promise<Producto[]> {
    return this.productoRepositoy.getAll();
  }

  getById(id: number): Promise<Producto | null> {
    return this.productoRepositoy.getById(id);
  }

  create(producto: CreateProductoDTO): Promise<Producto> {
    return this.productoRepositoy.create(producto);
  }

  update(producto: UpdateProductoDTO, id: number): Promise<Producto> {
    return this.productoRepositoy.update(producto, id);
  }

  delete(id: number): Promise<Producto> {
    return this.productoRepositoy.delete(id);
  }
}
