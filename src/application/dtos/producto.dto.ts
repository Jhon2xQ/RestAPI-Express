export interface CreateProductoDTO {
  name: string;
  price?: number | null;
  stock?: number | null;
}

export interface UpdateProductoDTO extends Partial<CreateProductoDTO> {}
