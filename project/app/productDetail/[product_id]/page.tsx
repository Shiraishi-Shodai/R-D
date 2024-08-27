'use client'

// 親コンポーネントのProduct.tsxからnumber型のデータproduct_idを取得
// 表示時にプロップスとして受けとったproduct_idを利用し、productがもつ色とサイズの組み合わせの在庫数を取得

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

  return <ProductDetail product_id={Number(id)} />;
};

export default ProductDetailPage;