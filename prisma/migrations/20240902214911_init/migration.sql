-- CreateTable
CREATE TABLE "produtores" (
    "id" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "nome_fazenda" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "area_total_hectares" DOUBLE PRECISION NOT NULL,
    "area_agricultavel_hectares" DOUBLE PRECISION NOT NULL,
    "area_vegetacao_hectares" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produtores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "culturas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "culturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fazenda_culturas" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "culturas_id" TEXT NOT NULL,
    "produtorId" TEXT,

    CONSTRAINT "fazenda_culturas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fazenda_culturas" ADD CONSTRAINT "fazenda_culturas_culturas_id_fkey" FOREIGN KEY ("culturas_id") REFERENCES "culturas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fazenda_culturas" ADD CONSTRAINT "fazenda_culturas_produtorId_fkey" FOREIGN KEY ("produtorId") REFERENCES "produtores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
