"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Product } from "@/feature/home/types/home";
import Image from "next/image";
import { Oval } from "react-loader-spinner";
import Link from "next/link";

interface ProductListProps {
  currentProductList: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ currentProductList }) => {
  return (
    <div className="albumGridWrapper" style={{ display: "grid" }}>
      {currentProductList.map((product, key) =>
        product.id ? (
          <Link
            key={key}
            href={`/productDetail/${product.id}?product=${JSON.stringify(
              product
            )}`}
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
        ) : (
          <Oval color="#00BFFF" height={80} width={80} key={key} />
        )
      )}
    </div>
  );
};

export default ProductList;
