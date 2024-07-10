import { error } from "console";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest) => {
  try {
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
