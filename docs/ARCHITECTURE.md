# アーキテクチャ

このドキュメントでは、本プロジェクトの技術スタックとディレクトリ構成について記述します。

## 1. 技術スタック (Tech Stack)

### Core

| Category      | Technology | Version | Description       |
| :------------ | :--------- | :------ | :---------------- |
| **Framework** | Next.js    | 15.5.x  | App Router を採用 |
| **Library**   | React      | 19.1.x  | UIライブラリ      |
| **Language**  | TypeScript | 5.x     | 静的型付け言語    |

### Styling & UI

| Category          | Technology                | Description                               |
| :---------------- | :------------------------ | :---------------------------------------- |
| **CSS Engine**    | Tailwind CSS v4           | ユーティリティファーストCSSフレームワーク |
| **UI Primitives** | Radix UI                  | アクセシブルなヘッドレスUIコンポーネント  |
| **Icons**         | Lucide React              | アイコンセット                            |
| **Utilities**     | clsx, tailwind-merge, cva | クラス名の条件付き結合とバリアント管理    |

### Backend & Database

| Category       | Technology            | Description                             |
| :------------- | :-------------------- | :-------------------------------------- |
| **Database**   | Supabase (PostgreSQL) | データベースおよびバックエンドBaaS      |
| **ORM**        | Prisma                | データベースアクセス / マイグレーション |
| **Auth**       | NextAuth.js (v5)      | 認証機能 (Auth.js)                      |
| **Validation** | Zod                   | スキーマバリデーション                  |

### Utilities

- **Date**: date-fns
- **Toast**: sonner
- **Encryption**: bcryptjs
- **Animation**: tw-animate-css

---

## 2. ディレクトリ構成 (Directory Structure)

主なディレクトリとファイルの役割は以下の通りです。

```text
next-app/
├── app/                    # Next.js App Router のページ・ルーティング定義
│   ├── api/                # API Routes (Route Handlers)
│   ├── (auth)/             # 認証関連のルートグループ (login, register等)
│   ├── layout.tsx          # ルートレイアウト
│   └── page.tsx            # トップページ
├── components/             # Reactコンポーネント
│   ├── ui/                 # 基本UIパーツ (Button, Input等)
│   ├── layouts/            # レイアウトコンポーネント
│   └── pages/              # ページ固有コンポーネント
├── lib/                    # 外部ライブラリの設定・構成
│   ├── prisma.ts           # Prisma Clientのインスタンス化
│   ├── utils.ts            # 汎用ユーティリティ関数 (cn等)
│   └── ...
├── prisma/                 # Prisma 関連ファイル
│   ├── schema.prisma       # データベーススキーマ定義
│   └── seed.ts             # シードデータ投入スクリプト
├── public/                 # 静的ファイル (画像, favicon等)
├── types/                  # TypeScript 型定義
├── .env                    # 環境変数 (秘匿情報)
├── next.config.ts          # Next.js 設定
├── package.json            # 依存関係定義
└── postcss.config.mjs      # PostCSS 設定 (Tailwind v4)
```

> **Note**: 上記は `package.json` の依存関係から推測される一般的な構成です。実際のプロジェクト構造に合わせて適宜修正してください。

## 3. API連携・データフロー (API Integration & Data Flow)

本プロジェクトでは、Next.js App Router のアーキテクチャに基づき、以下のフローでデータを扱います。

### 3.1. データ取得 (Data Fetching)

- **Server Components (推奨)**:
  - **Prisma Client** を使用して、DBから直接データを取得します。APIエンドポイントを経由しないため高速です。
- **Client Components**:
  - インタラクティブな操作が必要な場合、**Server Actions** または **Route Handlers** (`app/api/...`) を経由してデータを取得します。

### 3.2. データ更新 (Data Mutation)

- **Server Actions**:
  - フォーム送信やデータ更新操作は、主に **Server Actions** を使用して実装します。
  - **Zod** によるバリデーションをサーバー側で実施し、`revalidatePath` でキャッシュを更新してUIを反映させます。

### 3.3. 認証 (Authentication)

- **NextAuth.js (v5)**:
  - セッション管理および認証を行います。ミドルウェア (`middleware.ts`) で保護されたルートへのアクセスを制御します。
