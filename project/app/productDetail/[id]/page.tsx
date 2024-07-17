'use client'
import ProductDetail from "@/feature/productDetail/components/productDetail/productDetail";
import { ProductDetailProps } from "@/feature/productDetail/types";
import { getProductById } from "@/feature/productDetail/utils";
import React from "react";

const ProductDetailPage: React.FC<ProductDetailProps> = ({params}) => {
  const { id } = params;

  const product = getProductById(id);

  if (!product) {
    return <div>商品が見つかりませんでした。</div>;
  }

  return <ProductDetail params={{id: Number(id)}} />;
};

export default ProductDetailPage;