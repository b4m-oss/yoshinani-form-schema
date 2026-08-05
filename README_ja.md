# @b4moss/yoshinani-form-schema

Yoshinani フォームジェネレータ向けの JSON Schema 拡張（`x-ys-*`）です。

> English documentation: [README.md](./README.md)

## ドキュメント

- [docs/vocabulary.md](./docs/vocabulary.md) — `x-ys-*` 語彙リファレンス
- [docs/json-schema-conventions.md](./docs/json-schema-conventions.md) — 素の JSON Schema 推奨カタログ
- [docs/error-condition-ids.md](./docs/error-condition-ids.md) — エラー条件 ID 子集
- [docs/pack-checklist.md](./docs/pack-checklist.md) — pack 確認（publish しない）
- [docs/ci-cd.md](./docs/ci-cd.md) — CI / CD（Bパターン）と npm 認証
- [docs/npm-auth.md](./docs/npm-auth.md) — `NPM_TOKEN` 手順
- [docs/decisions.md](./docs/decisions.md) — 設計決定ログ
- [docs/main.md](./docs/main.md) — プロダクト機能メモ

## インストール

```bash
npm install @b4moss/yoshinani-form-schema
```

> npm 公開は git 上の語彙整備より後になることがあります。`0.1.0` 公開まではリポジトリ内の docs / `schemas/` を正としてください。

## 拡張プロパティ接頭詞

すべての Yoshinani キーワードは **`x-ys-*`**（**kebab-case**）です。

v0.5.0 まで:

| キーワード | 用途 |
| --- | --- |
| `x-ys-version` | フォームルート必須の語彙 SemVer |
| `x-ys-layout` | fieldset レイアウト（`type` / `legend` / `items`） |
| `x-ys-assist` | アシストメッセージ（`string[]`） |
| `x-ys-error-messages` | 条件 ID → 文言マップ |
| `x-ys-cross-validate` | エラー表示側フィールドの `targets` |
| `x-ys-flow` | 画面モデル（`screens`: `id` + `role`） |
| `x-ys-step-nav` | 配置可能なステップナビ |
| `x-ys-terms` | ルートの利用規約同意設定 |
| `x-ys-text-count` | テキストカウント表示 on/off |
| `x-ys-disable-on-submit` | 送信後 disabled |
| `x-ys-file` | 容量 / MIME / プレビュー |
| `x-ys-array` | 配列 UI（DnD など） |
| `x-ys-postal-lookup` | 郵便番号→住所補完の意図 |
| `x-ys-address-lookup` | 住所→郵便番号補完の意図 |
| `x-ys-corporate-number-lookup` | 法人番号→名称・住所補完の意図 |

## 例

[`examples/contact.schema.json`](./examples/contact.schema.json) と [`schemas/`](./schemas/) を参照してください。

```ts
import {
  YS_KEYWORDS,
  YS_VOCABULARY_VERSION,
  getYsExtensions,
  type YsJsonSchema,
} from "@b4moss/yoshinani-form-schema";

const schema: YsJsonSchema = {
  "x-ys-version": YS_VOCABULARY_VERSION,
  type: "object",
  properties: {
    email: {
      type: "string",
      "x-ys-assist": ["返信先として使用します"],
    },
  },
  "x-ys-layout": { type: "vertical", items: ["email"] },
};
```

このパッケージは **型**・**キーワード定数**・**小さなヘルパー**・**JSON Schema スケッチ** を提供します。ランタイムのフォームエンジンは範囲外です。

## 開発

```bash
npm install
npm test
npm run build
```

## ライセンス

MIT © Bicycle for Mind LLC.
