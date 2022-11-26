/*
  Warnings:

  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `title`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `name`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;
