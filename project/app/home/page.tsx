"use client";

import Product from "@/feature/home/components/productList/product";
import { ProductType } from "@/types/product";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [binaryData, setBinaryData] = useState<BinaryData>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/home/productList");
      const data: BinaryData = await response.json(); // Ensure this matches the expected format
      setBinaryData(data);
    };
    fetchData(); // Call the async function
  }, []);

  const data: ProductType = {
    name: "カラフルTシャツ",
    category: "Tシャツ",
    price: 1000,
    img: binaryData!,
  };
  return (
    <div>
      <Product data={data} />
    </div>
  );
};

export default HomePage;
