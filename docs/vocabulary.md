# Yoshinani Form Schema — 語彙リファレンス

> 人間向けの語彙仕様。決定ログは [`decisions.md`](./decisions.md)、構想メモは [`main.md`](./main.md)。
> 素の JSON Schema の書き方は [`json-schema-conventions.md`](./json-schema-conventions.md)。
> エラー条件 ID の子集: [`error-condition-ids.md`](./error-condition-ids.md)。

## 概要

- パッケージ: `@b4moss/yoshinani-form-schema`
- 拡張接頭詞: `x-ys-*`（**kebab-case**）
- ベース: JSON Schema **2020-12**
- 現行語彙バージョン: **`0.5.0`**
- バリデーションは可能な限り素の JSON Schema。`x-ys-*` は標準で足りない関心だけ
- 識別: パッケージ名 + 必須の `x-ys-version`（meta-schema `$id` は未設定）

## 付属 examples

| ファイル | 内容 |
| --- | --- |
| [`examples/contact.schema.json`](../examples/contact.schema.json) | お問い合わせ（layout / assist / error / cross-validate / flow / step-nav / terms など） |
| [`examples/structured-inputs.schema.json`](../examples/structured-inputs.schema.json) | 配列・ファイル（`x-ys-array` / `x-ys-file`） |
| [`examples/japan-lookups.schema.json`](../examples/japan-lookups.schema.json) | 郵便・住所・法人番号 lookup |

スキーマ断片: [`schemas/`](../schemas/)（入口は `x-ys-extensions.json`）。

## 付与場所

| 場所 | キーワード |
| --- | --- |
| ルート | `x-ys-version`, `x-ys-layout`, `x-ys-flow`, `x-ys-terms` |
| フィールド（または UI 項目） | `x-ys-assist`, `x-ys-error-messages`, `x-ys-cross-validate`, `x-ys-postal-lookup`, `x-ys-address-lookup`, `x-ys-corporate-number-lookup`, `x-ys-step-nav`, `x-ys-file`, `x-ys-array`, `x-ys-text-count`, `x-ys-disable-on-submit` |

---

## `x-ys-version`

- **必須**（ルート）
- 使用する語彙の SemVer 文字列
- 例: `"0.5.0"`

```json
{
  "x-ys-version": "0.5.0",
  "type": "object",
  "properties": {}
}
```

---

## `x-ys-layout`

- ルート（またはグループ）に付与。フィールド個別には付けない
- HTML の fieldset を想定。ネストは当面なし

| プロパティ | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| `type` | `"vertical"` \| `"horizontal"` |  | default: `"vertical"` |
| `legend` | `string` |  | 小見出し。なくてもよい |
| `items` | `string[]` | ✓ | フォーム項目 UI の識別子（当面はプロパティ名） |

横並び（`horizontal`）は成り行きで横幅均等。細かい幅調整は責務外。

```json
{
  "x-ys-layout": {
    "type": "vertical",
    "legend": "お問い合わせ",
    "items": ["stepNavTop", "email", "emailConfirm", "message", "stepNavBottom"]
  }
}
```

---

## `x-ys-assist`

- フィールドに付与
- 型: `string[]`（単一言語）
- i18n はランタイム側

```json
{
  "type": "string",
  "title": "メールアドレス",
  "x-ys-assist": [
    "返信先として使用します",
    "例）yamada@example.com"
  ]
}
```

---

## `x-ys-error-messages`

- フィールドに付与
- 型: `{ [conditionId: string]: string }`
- 利用者が変えられるのは **文言のみ**
- **key（条件 ID）はユーザーが変更・別名化できない**
  - 標準: JSON Schema assertion 名をそのまま（`required`, `maxLength`, `pattern`, …）
  - クロスバリ: ランタイムが用いる条件 ID（詳細一覧は後続）

```json
{
  "type": "string",
  "maxLength": 50,
  "x-ys-error-messages": {
    "required": "この項目は必須項目です",
    "maxLength": "最大文字数を超えています",
    "format": "正しい記法で書いてください"
  }
}
```

---

## `x-ys-cross-validate`

- **エラーを出す側**のフィールドに付与
- 第一弾は `targets` のみ。検証ロジックはランタイム

| プロパティ | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| `targets` | `string[]` | ✓ | 参照する他フィールドの識別子 |

```json
{
  "emailConfirm": {
    "type": "string",
    "format": "email",
    "x-ys-cross-validate": {
      "targets": ["email"]
    },
    "x-ys-error-messages": {
      "required": "確認用メールアドレスを入力してください"
    }
  }
}
```

---

## 日本固有の補完意図

いずれも **意図の宣言**。API / プロバイダはランタイム責務。

| キーワード | 意味 |
| --- | --- |
| `x-ys-postal-lookup` | 郵便番号から住所補完 |
| `x-ys-address-lookup` | 住所から郵便番号補完 |
| `x-ys-corporate-number-lookup` | 法人番号から正式名称・住所補完 |

第一弾の値はフラグ中心（例: `true`）。

```json
{
  "postalCode": {
    "type": "string",
    "pattern": "^[0-9]{7}$",
    "x-ys-postal-lookup": true
  }
}
```

---

## `x-ys-flow`

- ルートに付与。**画面モデルのみ**（配置は持たない）

```ts
{
  screens: {
    id: string;    // 必須
    role: string;  // 必須。利用者定義。語彙側で列挙しない
    [key: string]: unknown; // その他は任意（ランタイム解釈）
  }[]
}
```

```json
{
  "x-ys-flow": {
    "screens": [
      { "id": "input", "role": "form" },
      { "id": "email-verify", "role": "email-verify" },
      { "id": "confirm", "role": "confirm" },
      { "id": "done", "role": "complete" }
    ]
  }
}
```

---

## `x-ys-step-nav`

- ステップナビ UI の項目として `properties` に置き、`x-ys-layout.items` で配置する
- 上・下・中間・複数配置は layout 側の関心
- 第一弾の値はフラグ中心（例: `true`）

```json
{
  "properties": {
    "stepNavTop": { "x-ys-step-nav": true },
    "email": { "type": "string" },
    "stepNavBottom": { "x-ys-step-nav": true }
  },
  "x-ys-layout": {
    "type": "vertical",
    "items": ["stepNavTop", "email", "stepNavBottom"]
  }
}
```

---

## `x-ys-terms`

- ルート。利用規約同意（小窓等）のフォーム全体設定
- 第一弾: `true` または `{ required?: boolean }`
- 本文 / URL の持ち方は後続

```json
{
  "x-ys-terms": { "required": true }
}
```

---

## `x-ys-file`

- ファイル項目向け。寄せられる制約は素 Schema（例: `maxItems`）を使う

| プロパティ | 型 | 説明 |
| --- | --- | --- |
| `maxSize` | `number` | 1ファイルあたりの最大バイト数 |
| `accept` | `string[]` | 許可 MIME タイプ |
| `preview` | `boolean` | プレビュー表示 |

```json
{
  "type": "array",
  "maxItems": 3,
  "items": { "type": "string", "contentMediaType": "image/png" },
  "x-ys-file": {
    "maxSize": 5242880,
    "accept": ["image/png", "image/jpeg", "application/pdf"],
    "preview": true
  }
}
```

---

## `x-ys-array`

- 個数増減 UI 向け。配列制約自体は素の `minItems` / `maxItems` / `items`

| プロパティ | 型 | 説明 |
| --- | --- | --- |
| `dragAndDrop` | `boolean` | DnD による入れ替え可否 |

```json
{
  "type": "array",
  "minItems": 1,
  "maxItems": 5,
  "items": {
    "type": "object",
    "properties": {
      "name": { "type": "string" }
    }
  },
  "x-ys-array": { "dragAndDrop": true }
}
```

---

## `x-ys-text-count`

- フィールドに付与。型: `boolean`
- テキストカウント表示の on/off
- textarea のプログレスバー有無など細部はランタイム判断可

```json
{
  "type": "string",
  "maxLength": 1000,
  "x-ys-text-count": true
}
```

---

## `x-ys-disable-on-submit`

- 対象 UI（例: 送信ボタン相当の項目）に付与。型: `boolean`
- クリック / 送信後に disabled にする意図

```json
{
  "submit": {
    "x-ys-disable-on-submit": true
  }
}
```

---

## 最小の骨格例

```json
{
  "x-ys-version": "0.5.0",
  "type": "object",
  "required": ["email"],
  "properties": {
    "stepNavTop": { "x-ys-step-nav": true },
    "email": {
      "type": "string",
      "format": "email",
      "x-ys-assist": ["返信先として使用します"],
      "x-ys-error-messages": {
        "required": "メールアドレスを入力してください",
        "format": "メールアドレスの形式が正しくありません"
      }
    },
    "submit": { "x-ys-disable-on-submit": true }
  },
  "x-ys-layout": {
    "type": "vertical",
    "items": ["stepNavTop", "email", "submit"]
  },
  "x-ys-flow": {
    "screens": [
      { "id": "input", "role": "form" },
      { "id": "confirm", "role": "confirm" },
      { "id": "done", "role": "complete" }
    ]
  },
  "x-ys-terms": { "required": true }
}
```
