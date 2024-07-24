-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(30) NOT NULL,
    "email" VARCHAR(319) NOT NULL,
    "email_verified" TIMESTAMP(6),
    "password" VARCHAR(72),
    "address" VARCHAR(20),
    "postal_code" VARCHAR(7),
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "image" VARCHAR,
    "credit_number" VARCHAR(72),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "type" VARCHAR NOT NULL,
    "provider" VARCHAR NOT NULL,
    "provider_account_id" VARCHAR NOT NULL,
    "refresh_token" VARCHAR,
    "access_token" VARCHAR,
    "expires_at" INTEGER,
    "token_type" VARCHAR,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" VARCHAR,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_reset_token" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(319) NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "password_reset_token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_token" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(319) NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "verification_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_token_email_key" ON "password_reset_token"("email");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_token_token_key" ON "password_reset_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "uni_passwor_reset_email_token" ON "password_reset_token"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_email_key" ON "verification_token"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_token_key" ON "verification_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "uni_verification_email_token" ON "verification_token"("email", "token");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
