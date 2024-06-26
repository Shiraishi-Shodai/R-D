// アプリ全体で使うライブラリを定義
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export const db = prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
