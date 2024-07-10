"use client";
import React, { useCallback, useState } from "react";
import { Product } from "@/feature/home/types/home";
import ReactPaginate from "react-paginate";
import ProductList from "../productList/ProductList";

interface PagiNationProps {
  productList: Product[];
}

const PagiNation: React.FC<PagiNationProps> = ({ productList }) => {
  const itemPerPage = 6;
  // 表示するページの最初の商品のインデックス
  const [itemOffset, setItemOffset] = useState(0);
  // 次のページの最初に表示する商品のインデックス
  const endOffset = itemOffset + itemPerPage;
  // 現在のページで表示する商品配列
  const currentProductList: Product[] = productList.slice(
    itemOffset,
    endOffset
  );
  // 表示可能なページの数(Math.ceilで切り上げ... 50 / 6 = 9)
  const pageCount = Math.ceil(productList.length / itemPerPage);

  //ページリンクがクリックされた時
  const handlePageClick = useCallback(
    (e: { selected: number }) => {
      //表示するページの最初の商品のインデックスを更新
      const newOffset = (e.selected * itemPerPage) % productList.length;
      setItemOffset(newOffset);
    },
    [itemPerPage, productList]
  );

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <ProductList currentProductList={currentProductList} />

      <div>
        <ReactPaginate pageCount={pageCount} onPageChange={handlePageClick} />
      </div>
    </div>
  );
};

export default PagiNation;
