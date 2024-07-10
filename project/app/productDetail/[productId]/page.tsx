"use client";

import { ProductType } from "@/feature/home/types/home";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";

interface ProductDetailPageProps {
  params: {
    productId: number;
  };
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
  const { productId } = params;
  const searchParams = useSearchParams();
  const product_str = searchParams.get("product");
  const product: ProductType = JSON.parse(product_str!);

  return (
    <div>
      {!product && <p>Loading...</p>}
      {product && (
        <div>
          <p>{product.title}</p>
          <Image
            src={product.url}
            alt={product.title}
            width={300}
            height={300}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
