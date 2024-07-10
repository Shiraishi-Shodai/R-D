"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Oval } from "react-loader-spinner";
import { ProductType } from "../../types/home";
import Product from "../product/product";

interface ProductListProps {
  currentProductList: ProductType[];
}

const ProductList: React.FC<ProductListProps> = ({ currentProductList }) => {
  return (
    <div className="albumGridWrapper" style={{ display: "grid" }}>
      {currentProductList.map((product, key) =>
        product.id ? (
          <Product product={product} key={key} />
        ) : (
          <Oval color="#00BFFF" height={80} width={80} key={key} />
        )
      )}
    </div>
  );
};

export default ProductList;
