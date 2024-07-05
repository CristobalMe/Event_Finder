/*
  Warnings:

  - Added the required column `date` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `long` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event" ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "long" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL;
