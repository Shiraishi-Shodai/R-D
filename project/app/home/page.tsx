"use client";

import React, { useEffect, useState } from "react";
import { ProductType } from "@/feature/home/types/home";
import PagiNation from "@/feature/home/components/pagiNation/PagiNation";
import { Oval } from "react-loader-spinner";
import style from "@/app/home/home.module.scss";

const HomePage = () => {
  const [productList, setProductList] = useState<ProductType[]>([]);

  useEffect(() => {
    const getProductList = async () => {
      await fetch("/api/home")
        .then((response) => response.json())
        .then((productList) => setProductList(productList.data))
        .catch((error) => console.log(error));
    };

    getProductList();
  }, []);

  return (
    <div className={style.home}>
      {productList.length === 0 ? (
        <Oval color="#00BFFF" height={80} width={80} />
      ) : (
        <PagiNation productList={productList} />
      )}
    </div>
  );
};

export default HomePage;
