/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `tb_m_forms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `tb_m_forms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tb_m_forms` ADD COLUMN `slug` VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `tb_m_forms_slug_key` ON `tb_m_forms`(`slug`);
