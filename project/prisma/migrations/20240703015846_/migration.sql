-- CreateTable
CREATE TABLE "clothes_category" (
    "clothes_category_id" INTEGER NOT NULL,
    "clothes_category_name" VARCHAR(51) NOT NULL,

    CONSTRAINT "clothes_category_pkey" PRIMARY KEY ("clothes_category_id")
);

-- CreateTable
CREATE TABLE "productattributes" (
    "product_attribute_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "clothes_category_id" INTEGER NOT NULL,

    CONSTRAINT "product_attributes_pkey" PRIMARY KEY ("product_attribute_id")
);

-- CreateTable
CREATE TABLE "products" (
    "product_id" INTEGER NOT NULL,
    "product_image" BYTEA NOT NULL,
    "product_name" VARCHAR(51) NOT NULL,
    "product_price" INTEGER NOT NULL,
    "product_attribute_id" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("product_id")
);

-- AddForeignKey
ALTER TABLE "productattributes" ADD CONSTRAINT "fk_clothes_category" FOREIGN KEY ("clothes_category_id") REFERENCES "clothes_category"("clothes_category_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "productattributes" ADD CONSTRAINT "fk_product_id" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE NO ACTION;
