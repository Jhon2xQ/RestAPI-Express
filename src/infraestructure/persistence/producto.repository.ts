import { prisma } from "../../config/prisma";
import { Producto } from "../../domain/entities/producto.entity";
import { IProductoRepository } from "../../domain/repositories/iProducto.repository";

export class ProductoRepository implements IProductoRepository {
  async getAll(): Promise<Producto[]> {
    return prisma.producto.findMany();
  }
}
