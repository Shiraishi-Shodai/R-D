"use client";

import { ProductType } from "@/feature/home/types/home";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

interface ProductDetailPageProps {
  params: {
    productId: number;
  };
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
  const { productId } = params;
  const [product, setProduct] = useState<ProductType>();

  useEffect(() => {
    const getData = async (productId: number) => {
      await fetch("/api/productDetail", {
        method: "POST",
        body: JSON.stringify({ productId: productId }),
      })
        .then((response) => response.json())
        .then((data) => setProduct(data.message));
    };

    getData(productId);
  }, []);

  return (
    <div>
      {!product && <Oval color="#00BFFF" height={80} width={80} />}
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
