"use client";
import React from "react";
import { Oval } from "react-loader-spinner";
import { ProductType } from "@/feature/home/types/home";
import style from "@/feature/home/components/productList/productList.module.scss";
import ProductItem from "../product/ProductItem";
import { Product } from "@/lib/product";
interface ProductListProps {
  currentProductList: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ currentProductList }) => {
  return (
    <div className={style.paginationWrapper}>
      {currentProductList.map((product, key) =>
        product ? (
          <ProductItem product={product} key={key} />
        ) : (
          <Oval color="#00BFFF" height={80} width={80} key={key} />
        )
      )}
    </div>
  );
};

export default ProductList;
