import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const { productId } = await data;

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/albums/1/photos"
    );
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      if (d.id === parseInt(productId)) {
        return NextResponse.json({ message: d });
      }
    }

    return NextResponse.json({ message: "見つからなかったよ" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "error" });
  }
};
