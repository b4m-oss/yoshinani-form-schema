# 素の JSON Schema 推奨カタログ

> Yoshinani フォーム定義では、バリデーションを可能な限り素の JSON Schema（2020-12）に寄せる。
> `x-ys-*` は標準で足りない関心だけに使う。語彙本体は [`vocabulary.md`](./vocabulary.md)。
> エラー条件 ID の子集: [`error-condition-ids.md`](./error-condition-ids.md)。

この文書は **推奨慣例** であり、網羅的な JSON Schema 教程ではない。

## 付属 examples との対応

| テーマ | example |
| --- | --- |
| お問い合わせ一式 | [`examples/contact.schema.json`](../examples/contact.schema.json) |
| 配列・ファイル | [`examples/structured-inputs.schema.json`](../examples/structured-inputs.schema.json) |
| 郵便・住所・法人 | [`examples/japan-lookups.schema.json`](../examples/japan-lookups.schema.json) |

## 基本方針

- 制約（必須・長さ・パターン・個数など）は素の assertion で書く
- 表示文言の上書きだけ `x-ys-error-messages` を使う
- 案内文は `x-ys-assist`
- UI 配置は `x-ys-layout`

## ラベル

- フィールドの表示名は `title` を使う

```json
{
  "type": "string",
  "title": "お名前"
}
```

## 1行テキスト

```json
{
  "type": "string",
  "title": "お名前",
  "minLength": 1,
  "maxLength": 30,
  "x-ys-text-count": true,
  "x-ys-assist": ["姓名の間にスペースを入れてください"],
  "x-ys-error-messages": {
    "required": "お名前を入力してください",
    "maxLength": "30文字以内で入力してください"
  }
}
```

## メールアドレス

- `format: "email"` を使う

```json
{
  "type": "string",
  "title": "メールアドレス",
  "format": "email",
  "maxLength": 50,
  "x-ys-error-messages": {
    "required": "メールアドレスを入力してください",
    "format": "メールアドレスの形式が正しくありません"
  }
}
```

## 複数行テキスト（textarea）

- データ上は通常の `string`
- 複数行 UI にするかはランタイム（または将来の widget 系拡張）の関心
- 文字数表示は `x-ys-text-count`

```json
{
  "type": "string",
  "title": "お問い合わせ本文",
  "maxLength": 1000,
  "x-ys-text-count": true
}
```

## 正規表現

- `pattern` を使う（ECMA-262 正規表現）
- エラー文言の key は `pattern`

```json
{
  "type": "string",
  "title": "郵便番号",
  "pattern": "^[0-9]{7}$",
  "x-ys-postal-lookup": true,
  "x-ys-error-messages": {
    "pattern": "郵便番号は7桁の数字で入力してください"
  }
}
```

## 単一選択（ラジオ想定）

- `enum`（または `oneOf` + `const`）を使う
- 表示ラベルが value と異なる場合の詳細はランタイム慣例（第一弾語彙では持たない）

```json
{
  "type": "string",
  "title": "お問い合わせ内容",
  "enum": ["product", "recruit", "press", "other"],
  "x-ys-error-messages": {
    "required": "お問い合わせ内容を選択してください",
    "enum": "いずれかを選択してください"
  }
}
```

## 複数選択（チェックボックス想定）

- `type: "array"` + `items` + `minItems` / `maxItems`
- ユニークにするなら `uniqueItems: true`

```json
{
  "type": "array",
  "title": "ご連絡希望時間帯",
  "minItems": 1,
  "maxItems": 3,
  "uniqueItems": true,
  "items": {
    "type": "string",
    "enum": ["weekday-am", "weekday-pm", "weekday-night", "holiday"]
  },
  "x-ys-error-messages": {
    "minItems": "1つ以上選択してください",
    "maxItems": "3つまで選択できます"
  }
}
```

## 必須

- オブジェクトの `required` 配列で宣言する
- フィールド側の `x-ys-error-messages.required` で文言を上書きできる

```json
{
  "type": "object",
  "required": ["email", "name"],
  "properties": {
    "email": { "type": "string", "format": "email" },
    "name": { "type": "string" }
  }
}
```

## 数値・範囲

```json
{
  "type": "integer",
  "title": "人数",
  "minimum": 1,
  "maximum": 10,
  "x-ys-error-messages": {
    "minimum": "1以上で入力してください",
    "maximum": "10以下で入力してください"
  }
}
```

## 個数増減（繰り返しフィールド）

- データは `array`
- DnD など UI だけ `x-ys-array`

```json
{
  "type": "array",
  "title": "参加者",
  "minItems": 1,
  "maxItems": 5,
  "items": {
    "type": "object",
    "required": ["name"],
    "properties": {
      "name": { "type": "string", "title": "氏名" }
    }
  },
  "x-ys-array": { "dragAndDrop": true }
}
```

## ファイル

- 個数は `minItems` / `maxItems`
- 容量・MIME・プレビューは `x-ys-file`
- バイナリ表現（`contentMediaType` 等）の詳細はランタイムと合わせてよい

```json
{
  "type": "array",
  "title": "添付ファイル",
  "maxItems": 3,
  "items": { "type": "string" },
  "x-ys-file": {
    "maxSize": 5242880,
    "accept": ["image/png", "image/jpeg", "application/pdf"],
    "preview": true
  }
}
```

## エラー条件 ID（第一弾の約束）

- JSON Schema の assertion 名を **そのまま** key にする
- よく使う子集の表は [`error-condition-ids.md`](./error-condition-ids.md)
- クロスバリ由来の ID はランタイム規約に従う

## 日本固有（lookup）

- 制約（桁数など）は `pattern` 等の素 Schema
- 補完の意図だけ `x-ys-postal-lookup` / `x-ys-address-lookup` / `x-ys-corporate-number-lookup`
- 例: [`examples/japan-lookups.schema.json`](../examples/japan-lookups.schema.json)

## やらないこと（このカタログの範囲外）

- UI ライブラリ固有の widget 名の標準化
- 多言語辞書の schema 内表現
- バックエンド実装（PHP opus 等）の具体コード
