"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Product } from "@/feature/home/types/home";
import Image from "next/image";
import { Oval } from "react-loader-spinner";

interface ProductListProps {
  currentProductList: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ currentProductList }) => {
  return (
    <div className="albumGridWrapper" style={{ display: "grid" }}>
      {currentProductList.map((product, key) =>
        product.id ? (
          <div key={product.id}>
            <p>{product.title}</p>
            <Image
              src={product.url}
              alt={product.title}
              width={300}
              height={300}
            />
          </div>
        ) : (
          <Oval color="#00BFFF" height={80} width={80} key={key} />
        )
      )}
    </div>
  );
};

export default ProductList;
