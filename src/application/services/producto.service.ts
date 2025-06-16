import { Producto } from "../../domain/entities/producto.entity";
import { ProductoRepository } from "../../infraestructure/persistence/producto.repository";

export default class ProductoService {
  constructor(private productoRepositoy: ProductoRepository) {}

  getAll(): Promise<Producto[]> {
    return this.productoRepositoy.getAll();
  }
}
