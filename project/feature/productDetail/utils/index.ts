"use server"
// コンポーネントに書くと鬱陶しい関数をここに書く
import { db } from '@/lib/db';

export const getProductById = async(id: number) => {
  // 指定されたIDに一致する製品を見つける
  const a = "1"
  const product = await db.$queryRaw`SELECT * FROM view_products WHERE product_id = ${a}`;
  return product;
};
