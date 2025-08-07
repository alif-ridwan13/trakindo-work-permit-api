/*
  Warnings:

  - You are about to drop the `tb_m_work_permits` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_tr_answers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tb_tr_answers` DROP FOREIGN KEY `tb_tr_answers_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `tb_tr_answers` DROP FOREIGN KEY `tb_tr_answers_workPermitId_fkey`;

-- AlterTable
ALTER TABLE `tb_m_questions` MODIFY `value` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `tb_m_work_permits`;

-- DropTable
DROP TABLE `tb_tr_answers`;

-- CreateTable
CREATE TABLE `tb_tr_form_submissions` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `formId` BIGINT NOT NULL,
    `submittedBy` VARCHAR(191) NULL,
    `submittedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_tr_form_submission_answers` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `submissionId` BIGINT NOT NULL,
    `questionId` BIGINT NOT NULL,
    `value` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_tr_form_submissions` ADD CONSTRAINT `tb_tr_form_submissions_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `tb_m_forms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_tr_form_submission_answers` ADD CONSTRAINT `tb_tr_form_submission_answers_submissionId_fkey` FOREIGN KEY (`submissionId`) REFERENCES `tb_tr_form_submissions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_tr_form_submission_answers` ADD CONSTRAINT `tb_tr_form_submission_answers_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `tb_m_questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
