This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

```bash
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
// シード実行(ダミーデータ)
npx prisma db seed
// prisma クライアント再作成
npx prisma generate
