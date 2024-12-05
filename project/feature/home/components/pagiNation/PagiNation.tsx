"use client";
import React, { useCallback, useState } from "react";
import ReactPaginate from "react-paginate";
import ProductList from "../productList/ProductList";
import style from "./pagiNation.module.scss";
import { Product } from "@/lib/product";

interface PagiNationProps {
  productList: Product[];
}

const PagiNation: React.FC<PagiNationProps> = ({ productList }) => {
  const itemPerPage = 10;
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
    <div className={style.paginationWrapper}>
      <ProductList currentProductList={currentProductList} />

      <div className={style.pagination}>
        <ReactPaginate pageCount={pageCount} onPageChange={handlePageClick} />
      </div>
    </div>
  );
};

export default PagiNation;
