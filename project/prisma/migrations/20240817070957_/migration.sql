-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "users" (
    "name" VARCHAR(30) NOT NULL,
    "email" VARCHAR(319) NOT NULL,
    "emailVerified" TIMESTAMP(6),
    "image" VARCHAR,
    "password" VARCHAR(72),
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "address" VARCHAR(20),
    "credit_number" VARCHAR(72),
    "postal_code" VARCHAR(7),
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
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
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "product_detail_id" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,
    "valume" INTEGER NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("product_detail_id","user_id")
);

-- CreateTable
CREATE TABLE "category" (
    "category_id" SERIAL NOT NULL,
    "category_name" VARCHAR(10) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "order_detail" (
    "order_id" INTEGER NOT NULL,
    "product_detail_id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "valume" INTEGER NOT NULL,

    CONSTRAINT "order_detail_pkey" PRIMARY KEY ("order_id","product_detail_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "order_id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "order_date" DATE NOT NULL DEFAULT CURRENT_DATE,
    "delivery_destination" VARCHAR(20) NOT NULL,
    "postal_code" VARCHAR(7) NOT NULL,
    "credit_number" VARCHAR(72) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
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
CREATE TABLE "product" (
    "product_id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "product_name" VARCHAR(50) NOT NULL,
    "price" INTEGER NOT NULL,
    "target" INTEGER NOT NULL,
    "add_date" DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT "product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "product_color" (
    "color_id" SERIAL NOT NULL,
    "color_name" VARCHAR(10) NOT NULL,

    CONSTRAINT "product_color_pkey" PRIMARY KEY ("color_id")
);

-- CreateTable
CREATE TABLE "product_detail" (
    "product_detail_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "color_id" INTEGER NOT NULL,
    "size_id" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "product_detail_pkey" PRIMARY KEY ("product_detail_id")
);

-- CreateTable
CREATE TABLE "product_img" (
    "product_id" INTEGER NOT NULL,
    "color_id" INTEGER NOT NULL,
    "img_path" VARCHAR(254) NOT NULL,

    CONSTRAINT "product_img_pkey" PRIMARY KEY ("product_id","color_id")
);

-- CreateTable
CREATE TABLE "product_size" (
    "size_id" SERIAL NOT NULL,
    "size_name" VARCHAR(10) NOT NULL,

    CONSTRAINT "product_size_pkey" PRIMARY KEY ("size_id")
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
CREATE UNIQUE INDEX "category_category_name_key" ON "category"("category_name");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_token_email_key" ON "password_reset_token"("email");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_token_token_key" ON "password_reset_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "uni_passwor_reset_email_token" ON "password_reset_token"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "product_color_color_name_key" ON "product_color"("color_name");

-- CreateIndex
CREATE UNIQUE INDEX "product_img_img_path_key" ON "product_img"("img_path");

-- CreateIndex
CREATE UNIQUE INDEX "product_size_size_name_key" ON "product_size"("size_name");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_email_key" ON "verification_token"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_token_key" ON "verification_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "uni_verification_email_token" ON "verification_token"("email", "token");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "fk_product_id" FOREIGN KEY ("product_detail_id") REFERENCES "product_detail"("product_detail_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_detail" ADD CONSTRAINT "fk_order_id" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_detail" ADD CONSTRAINT "fk_product_detail_id" FOREIGN KEY ("product_detail_id") REFERENCES "product_detail"("product_detail_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "fk_category_id" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_detail" ADD CONSTRAINT "fk_color_id" FOREIGN KEY ("color_id") REFERENCES "product_color"("color_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_detail" ADD CONSTRAINT "fk_product_id" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_detail" ADD CONSTRAINT "fk_size_id" FOREIGN KEY ("size_id") REFERENCES "product_size"("size_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_img" ADD CONSTRAINT "fk_color_id" FOREIGN KEY ("color_id") REFERENCES "product_color"("color_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_img" ADD CONSTRAINT "fk_product_id" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
