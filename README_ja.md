# @b4moss/yoshinani-form-schema

Yoshinani フォームジェネレータ向けの JSON Schema 拡張（`x-ys-*`）です。

標準の JSON Schema に加えて、**レイアウト**・**アシストメッセージ**・**エラーメッセージ**・**クロスバリデーション**を宣言できます。

> English documentation: [README.md](./README.md)

## ドキュメント

- [docs/vocabulary.md](./docs/vocabulary.md) — `x-ys-*` 語彙リファレンス
- [docs/json-schema-conventions.md](./docs/json-schema-conventions.md) — 素の JSON Schema 推奨カタログ
- [docs/decisions.md](./docs/decisions.md) — 設計決定ログ
- [docs/main.md](./docs/main.md) — プロダクト機能メモ

## インストール

```bash
npm install @b4moss/yoshinani-form-schema
```

## 拡張プロパティ接頭詞

すべての Yoshinani キーワードは **`x-ys-`** 接頭詞を使います。

| キーワード | 用途 |
| --- | --- |
| `x-ys-layout` | レイアウト / 表示ヒント（order, width, section, widget など） |
| `x-ys-assist` | エラーではない案内（help, tip, example） |
| `x-ys-errorMessage` | バリデーションキーワード別のエラー文言 |
| `x-ys-crossValidation` | フィールド間バリデーション規則 |

## 例

```json
{
  "type": "string",
  "title": "メールアドレス",
  "format": "email",
  "x-ys-layout": { "order": 1, "width": "half", "widget": "email" },
  "x-ys-assist": { "help": "返信先として使用します", "example": "yamada@example.com" },
  "x-ys-errorMessage": {
    "required": "メールアドレスを入力してください",
    "format": "メールアドレスの形式が正しくありません"
  }
}
```

よりまとまった例は [`examples/contact.schema.json`](./examples/contact.schema.json)、語彙のスケッチは [`schemas/x-ys-extensions.json`](./schemas/x-ys-extensions.json) を参照してください。

## API（TypeScript）

```ts
import {
  YS_KEYWORDS,
  getYsExtensions,
  normalizeCrossValidation,
  type YsJsonSchema,
} from "@b4moss/yoshinani-form-schema";

const schema: YsJsonSchema = {
  type: "object",
  properties: {
    email: { type: "string", "x-ys-layout": { width: "half" } },
  },
};

const extensions = getYsExtensions(schema.properties!.email!);
```

このスキャフォールドでは **型定義**・**キーワード定数**・**小さなヘルパー** を提供します。ランタイムのフォーム生成や検証エンジンは範囲外です。

## 開発

```bash
npm install
npm test
npm run build
```

## ライセンス

MIT © Bicycle for Mind LLC.
