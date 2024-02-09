-- CreateEnum
CREATE TYPE "ERoles" AS ENUM ('user', 'admin');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "ERoles" NOT NULL DEFAULT 'user';
