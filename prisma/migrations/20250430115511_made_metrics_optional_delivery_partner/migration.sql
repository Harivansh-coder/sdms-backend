/*
  Warnings:

  - The `areas` column on the `DeliveryPartner` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "DeliveryPartner" DROP COLUMN "areas",
ADD COLUMN     "areas" JSONB,
ALTER COLUMN "metricsId" DROP NOT NULL;
