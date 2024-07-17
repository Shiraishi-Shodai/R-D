"use client";
import { useState } from "react";
import { ProductDetailProps } from "../../types";
import { getProductById } from "../../utils";

const ProductDetail: React.FC<ProductDetailProps> = ({ params }) => {
  const product = getProductById(params.id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [colorLink, setColorLink] = useState<string | undefined>(undefined);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
  };

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
    try {
      const newColorLink = Object.values(product?.color || []).find(
        (colorObj) => colorObj.color_name === color
      )?.image;
      setColorLink(newColorLink);
    } catch {
      console.log("error - handleSelectColor");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1", marginRight: "20px" }}>
          <div
            style={{
              backgroundColor: "#ccc",
              height: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={colorLink || product?.color[0]?.image}
              alt={product?.product_name}
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          </div>
        </div>
        <div style={{ flex: "2" }}>
          <h1>{product?.product_name}</h1>
          <p>¥{product?.price.toLocaleString()}</p>
          <div>
            <h3>カラー:</h3>
            <div>
              {/* 商品に色がある場合、カラーオプションをレンダリングする */}
              {Array.isArray(product?.color) &&
                product.color.map((color: { color_name: string; image: string }) => (
                  <button
                    key={color.color_name}
                    onClick={() => handleSelectColor(color.color_name)}
                    style={{
                      margin: "0 5px",
                      padding: "5px 10px",
                      backgroundColor:
                        selectedColor === color.color_name ? "#000" : "#ccc",
                      color: selectedColor === color.color_name ? "#fff" : "#000",
                    }}
                  >
                    {color.color_name}
                  </button>
                ))}
            </div>
          </div>
          {product?.size && Array.isArray(product.size) && (
            <div style={{ marginTop: "20px" }}>
              <h3>サイズ:</h3>
              {product.size.map((size: { size_id: number; size_name: string}) => (
                <button
                  key={size.size_name}
                  onClick={() => handleSelectSize(size.size_name)}
                  style={{
                    margin: "0 5px",
                    padding: "5px 10px",
                    backgroundColor: selectedSize === size.size_name ? "#000" : "#ccc",
                    color: selectedSize === size.size_name ? "#fff" : "#000",
                  }}
                >
                  {size.size_name}
                </button>
              ))}
            </div>
          )}
          <div style={{ marginTop: "20px" }}>
            <span>{product?.quantity ? "在庫あり" : "在庫なし"}</span>
          </div>
          <div style={{ marginTop: "20px" }}>
            <button
              style={{ padding: "10px 20px", marginRight: "10px" }}
              disabled={!product?.quantity}
            >
              カートに入れる
            </button>
            <button
              style={{ background: "none", border: "none", cursor: "pointer" }}
              onClick={handleFavorite}
            >
              {isFavorite ? ":ハート:" : ":白いハート:"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
