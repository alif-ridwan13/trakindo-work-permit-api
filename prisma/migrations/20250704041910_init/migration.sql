/*
  Warnings:

  - You are about to drop the `answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `form` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `option` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `safetyequipment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `section` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workpermit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `answer` DROP FOREIGN KEY `Answer_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `answer` DROP FOREIGN KEY `Answer_workPermitId_fkey`;

-- DropForeignKey
ALTER TABLE `option` DROP FOREIGN KEY `Option_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `Question_sectionId_fkey`;

-- DropForeignKey
ALTER TABLE `section` DROP FOREIGN KEY `Section_formId_fkey`;

-- DropTable
DROP TABLE `answer`;

-- DropTable
DROP TABLE `form`;

-- DropTable
DROP TABLE `option`;

-- DropTable
DROP TABLE `question`;

-- DropTable
DROP TABLE `safetyequipment`;

-- DropTable
DROP TABLE `section`;

-- DropTable
DROP TABLE `workpermit`;

-- CreateTable
CREATE TABLE `tb_m_forms` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_m_sections` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `index_number` INTEGER NOT NULL,
    `formId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_m_questions` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `index_number` INTEGER NOT NULL,
    `value` VARCHAR(100) NOT NULL,
    `type` ENUM('Option', 'Number', 'Paragraph', 'Text', 'Date', 'Signature', 'YesNoNA', 'Checkbox', 'CheckboxFromMaster') NOT NULL,
    `sectionId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_m_options` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(100) NOT NULL,
    `questionId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_m_safety_equipments` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `category` ENUM('APD', 'Emergency') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_m_work_permits` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(50) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_tr_answers` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `answer` VARCHAR(100) NULL,
    `attachmentUrl` VARCHAR(255) NULL,
    `questionId` BIGINT NOT NULL,
    `workPermitId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_m_sections` ADD CONSTRAINT `tb_m_sections_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `tb_m_forms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_m_questions` ADD CONSTRAINT `tb_m_questions_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `tb_m_sections`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_m_options` ADD CONSTRAINT `tb_m_options_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `tb_m_questions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_tr_answers` ADD CONSTRAINT `tb_tr_answers_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `tb_m_questions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_tr_answers` ADD CONSTRAINT `tb_tr_answers_workPermitId_fkey` FOREIGN KEY (`workPermitId`) REFERENCES `tb_m_work_permits`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
