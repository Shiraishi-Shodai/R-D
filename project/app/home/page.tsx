"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/feature/home/types/home";
import PagiNation from "@/feature/home/components/pagiNation/PagiNation";

const HomePage = () => {
  const [productList, setProductList] = useState<Product[]>([]);

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
    <div>
      {productList.length === 0 ? (
        <p>loading...</p>
      ) : (
        <PagiNation productList={productList} />
      )}
    </div>
  );
};

export default HomePage;
