"use client";
import React, { useEffect } from "react";

interface ProductListProps {
  order: string;
}

const ProductList: React.FC<ProductListProps> = ({ order }) => {
  // 商品情報を取得
  const getProducts = async () => {
    const products = await fetch("/api/home/productList");
    return products;
  };
  useEffect(() => {}, []);

  return <div></div>;
};

export default ProductList;
