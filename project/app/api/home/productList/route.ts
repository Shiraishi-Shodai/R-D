import fs from "fs";
import path from "path";

export const GET = (Request: req) => {
  const imageToBinary = (imagePath: string): Buffer => {
    const fullPath = path.join(process.cwd(), imagePath);
    const binaryData = fs.readFileSync(fullPath);
    console.log(binaryData);
    return binaryData;
  };

  // 仮のバイナリデータ（ここではBlobを生成していると仮定）
  const binaryData = imageToBinary("public/huku.jpg"); // バイナリデータを生成する関数

  return Response.json({ data: binaryData });
};
