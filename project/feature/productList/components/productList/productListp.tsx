import Link from "next/link";
import React from "react";
import db from "@/product.json";

const ProductList = () => {
  const products = Object.values(db);

  return (
    <div>
      <h1>商品一覧</h1>
      <ul>
        {products.map((product) => (
          <li key={product.product_id}>
            <Link href={`/productDetail/${product.product_id}`}>
              <button style={{margin: "10px"}}>{product.product_name}</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;