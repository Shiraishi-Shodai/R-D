"use client";
import Image from "next/image";
import { ProductType } from "@/types/product";
import { useEffect, useState } from "react";

const Product = ({ data }: { data: ProductType }) => {
  const { name, category, price, img } = data;
  const [blobUrl, setBlobUrl] = useState("");

  useEffect(() => {
    // Blobオブジェクトを生成
    const blob = new Blob([img], { type: "image/jpeg" }); // ここでMIMEタイプを指定する
    // BlobをURLに変換
    const imageUrl = URL.createObjectURL(blob);
    setBlobUrl(imageUrl);
    return () => URL.revokeObjectURL(imageUrl);
  }, [img]);

  if (!blobUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {blobUrl && <Image src={blobUrl} alt="" width={180} height={200} />}
    </div>
  );
};
