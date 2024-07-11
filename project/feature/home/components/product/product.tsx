import Link from "next/link";
import React from "react";
import { ProductType } from "@/feature/home/types/home";
import Image from "next/image";
import style from "@/feature/home/components/product/product.module.scss";

interface ProductProps {
  product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className={style.item}>
      <Link href={`/productDetail/${product.id}}`}>
        <div>
          <p>{product.title}</p>
          <Image
            src={product.url}
            alt={product.title}
            width={100}
            height={100}
          />
        </div>
      </Link>
    </div>
  );
};

export default Product;
