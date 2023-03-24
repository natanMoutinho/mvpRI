/*
  Warnings:

  - Added the required column `title` to the `Register` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Register" ADD COLUMN     "title" TEXT NOT NULL;
