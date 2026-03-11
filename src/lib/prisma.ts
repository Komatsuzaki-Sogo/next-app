import { PrismaClient } from '@prisma/client';

// グローバルスコープでPrismaインスタンスを保持できる場所を作る
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 本番環境（Session Mode）での接続エラーを回避するための設定
const databaseUrl = process.env.DATABASE_URL;
const limitedUrl = databaseUrl
  ? `${databaseUrl}${databaseUrl.includes('?') ? '&' : '?'}connection_limit=1&pool_timeout=20`
  : undefined;

// Prismaインスタンスがあれば使う、なければ作成
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: limitedUrl,
      },
    },
    // エラー調査のためにログを出力（不要になれば削除OK）
    log: ['error', 'warn'],
  });

// 開発環境でのみ使用
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
