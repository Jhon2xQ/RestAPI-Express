import { prisma } from "../../config/prisma";
import { Producto } from "../../domain/entities/producto.entity";
import { IProductoRepository } from "../../domain/repositories/iProducto.repository";

export class ProductoRepository implements IProductoRepository {
  async getAll(): Promise<Producto[]> {
    return prisma.producto.findMany();
  }

  async getById(id: number): Promise<Producto | null> {
    return prisma.producto.findUnique({
      where: { id },
    });
  }

  async create(producto: Producto): Promise<Producto> {
    return prisma.producto.create({
      data: producto,
    });
  }

  async update(producto: Producto, id: number): Promise<Producto> {
    return prisma.producto.update({
      where: { id },
      data: producto,
    });
  }

  async delete(id: number): Promise<Producto> {
    return prisma.producto.delete({
      where: { id },
    });
  }
}
