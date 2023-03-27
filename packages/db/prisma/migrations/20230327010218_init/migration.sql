-- CreateEnum
CREATE TYPE "statusEnum" AS ENUM ('ok', 'error');

-- CreateTable
CREATE TABLE "Example" (
    "id" SERIAL NOT NULL,
    "status" "statusEnum" NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);
