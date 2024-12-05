import { db } from "@/lib/db";
import { error } from "console";
import { sign } from "crypto";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest) => {

  try {
    /* HOME画面に表示する商品IDと商品名、色名、画像パスを取得(HOMEに表示するのは色IDが一番小さい色) */
    // SQL SELECT main.product_id, second.product_name, ca.category_name, co.color_name, main.img_path,  second.price, second.target, second.add_date FROM product_img main
    //    JOIN (SELECT product_id, min(color_id) color_id FROM product_img
    //           GROUP BY product_id) sub
    //     ON main.product_id = sub.product_id
    //     AND main.color_id = sub.color_id
    //     INNER JOIN product second
    //     ON main.product_id = second.product_id
    //     INNER JOIN product_color co
    //     ON main.color_id = co.color_id
    //     INNER JOIN category ca
    //     ON second.category_id = ca.category_id
        // `;
      
      const data = await db.$queryRaw`SELECT * FROM view_products`;

    return NextResponse.json({ data: data }, { status: 200 });
  } catch {
    return NextResponse.json({ data: error }, { status: 500 });
  }
};
