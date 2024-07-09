"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Product } from "@/feature/home/types/home";
import Image from "next/image";

interface ProductListProps {
  productList: Product[];
  currentProductList: Product[];
}

const ProductList: React.FC<ProductListProps> = ({
  productList,
  currentProductList,
}) => {
  console.log(productList);
  return (
    <div className="albumGridWrapper" style={{ display: "grid" }}>
      {currentProductList.map((product) => (
        <div key={product.id}>
          <p>{product.title}</p>
          <Image
            src={product.url}
            alt={product.title}
            width={300}
            height={300}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
