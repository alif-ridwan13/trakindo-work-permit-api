/*
  Warnings:

  - You are about to drop the column `submittedBy` on the `tb_tr_form_submissions` table. All the data in the column will be lost.
  - Added the required column `workDate` to the `tb_tr_form_submissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tb_tr_form_submissions` DROP COLUMN `submittedBy`,
    ADD COLUMN `approvedAtAdmin` DATETIME(3) NULL,
    ADD COLUMN `approvedAtJRO` DATETIME(3) NULL,
    ADD COLUMN `approvedByAdmin` VARCHAR(191) NULL,
    ADD COLUMN `approvedByJRO` VARCHAR(191) NULL,
    ADD COLUMN `priority` ENUM('Normal', 'High') NOT NULL DEFAULT 'Normal',
    ADD COLUMN `rejectedAt` DATETIME(3) NULL,
    ADD COLUMN `rejectedBy` VARCHAR(191) NULL,
    ADD COLUMN `status` ENUM('Pending', 'InReview', 'Approved', 'Rejected') NOT NULL DEFAULT 'Pending',
    ADD COLUMN `submittedById` VARCHAR(191) NULL,
    ADD COLUMN `workDate` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `tb_m_users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'JRO', 'EMPLOYEE', 'VENDOR') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tb_m_users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_tr_submission_logs` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `submissionId` BIGINT NOT NULL,
    `action` VARCHAR(100) NOT NULL,
    `actor` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_tr_form_submissions` ADD CONSTRAINT `tb_tr_form_submissions_submittedById_fkey` FOREIGN KEY (`submittedById`) REFERENCES `tb_m_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_tr_submission_logs` ADD CONSTRAINT `tb_tr_submission_logs_submissionId_fkey` FOREIGN KEY (`submissionId`) REFERENCES `tb_tr_form_submissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
