/*
  Warnings:

  - The primary key for the `culturas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `culturas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `fazenda_culturas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `produtorId` on the `fazenda_culturas` table. All the data in the column will be lost.
  - The `id` column on the `fazenda_culturas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `produtores` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `produtores` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `produtores_id` to the `fazenda_culturas` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `culturas_id` on the `fazenda_culturas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "fazenda_culturas" DROP CONSTRAINT "fazenda_culturas_culturas_id_fkey";

-- DropForeignKey
ALTER TABLE "fazenda_culturas" DROP CONSTRAINT "fazenda_culturas_produtorId_fkey";

-- AlterTable
ALTER TABLE "culturas" DROP CONSTRAINT "culturas_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "culturas_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "fazenda_culturas" DROP CONSTRAINT "fazenda_culturas_pkey",
DROP COLUMN "produtorId",
ADD COLUMN     "produtores_id" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "culturas_id",
ADD COLUMN     "culturas_id" INTEGER NOT NULL,
ADD CONSTRAINT "fazenda_culturas_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "produtores" DROP CONSTRAINT "produtores_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" DROP NOT NULL,
ADD CONSTRAINT "produtores_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "fazenda_culturas" ADD CONSTRAINT "fazenda_culturas_culturas_id_fkey" FOREIGN KEY ("culturas_id") REFERENCES "culturas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fazenda_culturas" ADD CONSTRAINT "fazenda_culturas_produtores_id_fkey" FOREIGN KEY ("produtores_id") REFERENCES "produtores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
