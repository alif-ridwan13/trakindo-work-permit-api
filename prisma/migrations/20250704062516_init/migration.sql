/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `tb_m_forms` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tb_m_forms_name_key` ON `tb_m_forms`(`name`);
