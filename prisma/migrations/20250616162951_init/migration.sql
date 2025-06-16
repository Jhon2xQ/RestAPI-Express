-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION DEFAULT 0.0,
    "stock" INTEGER DEFAULT 0,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Producto_name_key" ON "Producto"("name");
