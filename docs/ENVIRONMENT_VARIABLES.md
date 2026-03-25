# 環境変数 (Environment Variables)

このプロジェクトでは、環境変数の管理に単一の `.env` ファイルを使用します。
開発環境および本番環境において、それぞれの環境に応じた値を設定した `.env` ファイルをルートディレクトリに配置して運用します。

## 1. 運用ルール

- **ファイル構成**:
  - `.env`: 実際の環境変数を記述します。**Git管理対象外**です。
  - `.env.example`: 必要な変数のキーと説明を記述したテンプレートです。**Git管理対象**です。

- **セットアップ**:
  開発を始める際は、`.env.example` をコピーして `.env` を作成してください。

  ```bash
  cp .env.example .env
  ```

## 2. 変数の種類と命名規則

Next.js の仕様に従い、プレフィックスによって変数の公開範囲を制御します。

### サーバーサイド専用 (シークレット)

プレフィックスなしで定義します。これらはサーバーサイドでのみアクセス可能で、ブラウザバンドルには含まれません。

- **用途**: データベース接続URL、APIシークレットキーなど
- **例**: `DATABASE_URL`

### クライアントサイド公開

`NEXT_PUBLIC_` プレフィックスを付けます。これらはブラウザ（クライアントサイド）のJavaScriptコードに含まれます。

- **用途**: 公開APIのURL、アナリティクスIDなど
- **例**: `NEXT_PUBLIC_API_URL`

## 3. 定義済み環境変数一覧

| 変数名                | 必須 | 説明                               | 例                                         |
| :-------------------- | :--: | :--------------------------------- | :----------------------------------------- |
| `DATABASE_URL`        |  ✅  | データベース接続文字列             | `postgresql://user:pass@localhost:5432/db` |
| `NEXT_PUBLIC_API_URL` |  ✅  | バックエンドAPIのベースURL         | `http://localhost:3000/api`                |
| `NEXTAUTH_SECRET`     |  -   | 認証用シークレット (Auth.js使用時) | `ランダムな文字列`                         |
| `NEXTAUTH_URL`        |  -   | アプリケーションのベースURL        | `http://localhost:3000`                    |

## 4. アプリケーションでの使用方法

`docs/CODING_STANDARDS.md` に基づき、`process.env` を直接参照するのではなく、型安全性とバリデーションを提供するヘルパーモジュール（例: `@/lib/env`）の使用を推奨します。

```typescript
// ✅ 良い例: 型定義されたオブジェクトから参照
import { env } from '@/lib/env';

const apiUrl = env.NEXT_PUBLIC_API_URL;
```

```typescript
// ❌ 悪い例: process.env を直接参照
// (型が string | undefined になり、未定義時の検知が遅れる)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```
