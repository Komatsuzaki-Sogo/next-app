This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

```bash
npm install
npm run dev
```

## Test Account

| メールアドレス   | パスワード  |
| ---------------- | ----------- |
| test@example.com | password123 |

## deploy url

https://password-managed.vercel.app

## Prisma flow

// マイグレーション(テーブル作成)
npx prisma migrate dev --name init

// テーブルのリセットが必要な場合
npx prisma migrate reset

// シード実行(ダミーデータ)
npx prisma db seed

// prisma クライアント再作成
npx prisma generate

## Documentation

- [アーキテクチャ](./docs/ARCHITECTURE.md)
- [コーディング規約](./docs/CODING_STANDARDS.md)
- [コンポーネント開発ガイドライン](./docs/COMPONENT_DEVELOPMENT_GUIDE.md)
- [環境変数 (Environment Variables)](./docs/ENVIRONMENT_VARIABLES.md)
