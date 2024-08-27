"use client";

// 親コンポーネントのProduct.tsxからnumber型のデータproduct_idを取得
// 表示時にプロップスとして受けとったproduct_idを利用し、productがもつ色とサイズの組み合わせの在庫数を取得
import { useState } from "react";
import { ProductType } from "@/feature/home/types/home";
import { getProductById } from "../../utils";

interface ProductDetailProps  {
  product_id: number
}

const ProductDetail: React.FC<ProductDetailProps> = async({ product_id }) => {
  const product: ProductType | unknown = await getProductById(product_id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  
  // お気に入りボタンの設定
  // const handleFavorite = () => {
  //   setIsFavorite(!isFavorite);
  // };

  // サイズボタンの設定
  // const handleSelectSize = (size: string) => {
  //   setSelectedSize(size);
  // };

  // 色の変更
  // const handleSelectColor = (color: string) => {
  //   setSelectedColor(color);
  //   try {
  //     const newColorLink = Object.values(product?.color[0]? || []).find(
  //       (colorObj) => colorObj.color_name === color
  //     )?.image;
  //     setColorLink(newColorLink);
  //   } catch {
  //     console.log("error - handleSelectColor");
  //   }
  // };

  return (
     <div>
     {product_id}
    </div>
  );
}
export default ProductDetail;
