/*
  Warnings:

  - You are about to drop the column `school` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `school` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "school";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "school";

-- CreateTable
CREATE TABLE "Characters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "hp" INTEGER NOT NULL,
    "ap" INTEGER NOT NULL,

    CONSTRAINT "Characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Items" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "effect" TEXT NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Characters_name_key" ON "Characters"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Items_name_key" ON "Items"("name");
