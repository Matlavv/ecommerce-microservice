-- AlterTable
ALTER TABLE "OrderHistory" ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "firstname" DROP NOT NULL,
ALTER COLUMN "lastname" DROP NOT NULL,
ALTER COLUMN "role" DROP NOT NULL;
