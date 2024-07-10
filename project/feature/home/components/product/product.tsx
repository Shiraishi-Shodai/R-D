import Link from "next/link";
import React from "react";
import { ProductType } from "../../types/home";
import Image from "next/image";

interface ProductProps {
  product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <div>
      <Link
        href={`/productDetail/${product.id}?product=${JSON.stringify(product)}`}
      >
        <div>
          <p>{product.title}</p>
          <Image
            src={product.url}
            alt={product.title}
            width={300}
            height={300}
          />
        </div>
      </Link>
    </div>
  );
};

export default Product;
