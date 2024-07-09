import fs from "fs";
import csv from "csv-parser";
import { db } from "../lib/db";
import path from "path";

type Test = {
  id: string | number;
  name: string;
  email: string;
};

async function main() {
  const tests: Test[] = [];

  // CSVファイルを読み込んでデータを配列に格納
  const csvFilePath = path.join(__dirname, "..", "data.csv");
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row: Test) => {
      let { id, name, email } = row;
      id = parseInt(id as string);
      tests.push({ id, name, email });
    })
    .on("end", async () => {
      console.log("CSV file successfully processed");

      // Prismaクライアントを使ってデータをデータベースに挿入
      for (const test of tests) {
        await db.test.create({
          data: {
            id: test.id as number,
            email: test.email,
            name: test.name,
          },
        });
      }
      console.log("Data successfully imported to the database");
      await db.$disconnect();
    });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
