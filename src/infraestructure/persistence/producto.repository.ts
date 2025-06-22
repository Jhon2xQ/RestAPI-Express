import { injectable } from "inversify";
import { CreateProductoDTO, UpdateProductoDTO } from "../../application/dtos/producto.dto";
import { prisma } from "../../core/configs/prisma";
import { Producto } from "../../domain/entities/producto.entity";
import { IProductoRepository } from "../../domain/repositories/iProducto.repository";

@injectable()
export class ProductoRepository implements IProductoRepository {
  async getAll(): Promise<Producto[]> {
    return await prisma.producto.findMany();
  }

  async getById(id: number): Promise<Producto | null> {
    return await prisma.producto.findUnique({
      where: { id },
    });
  }

  async create(producto: CreateProductoDTO): Promise<Producto> {
    return await prisma.producto.create({
      data: producto,
    });
  }

  async update(producto: UpdateProductoDTO, id: number): Promise<Producto> {
    return await prisma.producto.update({
      where: { id },
      data: producto,
    });
  }

  async delete(id: number): Promise<Producto> {
    return await prisma.producto.delete({
      where: { id },
    });
  }
}
