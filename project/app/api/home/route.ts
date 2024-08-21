import { db } from "@/lib/db";
import { error } from "console";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest) => {

  try {

    /* HOME画面に表示する商品IDと商品名、色名、画像パスを取得(HOMEに表示するのは色IDが一番小さい色) */
    const res = await db.$queryRaw`SELECT main.*, second.product_name FROM product_img main
       JOIN (SELECT product_id, min(color_id) color_id FROM product_img
              GROUP BY product_id) sub
        ON main.product_id = sub.product_id
        AND main.color_id = sub.color_id
        INNER JOIN product second
        ON main.product_id = second.product_id`;

    const response = await fetch(
      "https://jsonplaceholder.typicode.com/albums/1/photos",
      { cache: "force-cache" }
    );

    const data = await response.json();

    return NextResponse.json({ data: data }, { status: 200 });
  } catch {
    return NextResponse.json({ data: error }, { status: 500 });
  }
};
