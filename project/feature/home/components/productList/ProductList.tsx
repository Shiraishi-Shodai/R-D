"use client";
import React from "react";
import { Oval } from "react-loader-spinner";
import { ProductType } from "@/feature/home/types/home";
import Product from "@/feature/home/components/product/product";
import style from "@/feature/home/components/productList/productList.module.scss";
interface ProductListProps {
  currentProductList: ProductType[];
}

const ProductList: React.FC<ProductListProps> = ({ currentProductList }) => {
  return (
    <div className={style.paginationWrapper}>
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
