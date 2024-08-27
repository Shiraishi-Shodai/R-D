import Link from "next/link";
import React from "react";
import Image from "next/image";
import style from "@/feature/home/components/product/product.module.scss";
import { Product } from "@/lib/product";

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [product_id, product_name, category_name, price, img_path, add_date] = product.getHomeProperty();
  return (
    <div className={style.item}>
      <Link href={`/productDetail/${product.product_id}}`}>
        <div>
          <Image
            src={img_path}
            alt=""
            width={160}
            height={100}
            priority
          />
          <p>{product_name}</p>
          <p>{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
