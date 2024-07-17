// コンポーネントに書くと鬱陶しい関数をここに書く
import productData from '@/product.json';

export const getProductById = (id: number) => {
  // 指定されたIDに一致する製品を見つける
  const product = Object.values(productData).find((key) => key.product_id === Number(id));
  return product;
};
