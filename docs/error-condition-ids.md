# エラー条件 ID（よく使う子集）

> `x-ys-error-messages` の key は **条件 ID** であり、利用者が別名化できない。
> 標準条件は JSON Schema assertion 名をそのまま使う。完全一覧ではなく、よく使う子集のメモ。

関連: [`vocabulary.md`](./vocabulary.md) / [`json-schema-conventions.md`](./json-schema-conventions.md) / [`decisions.md`](./decisions.md)

## 約束

- key = 条件 ID（文言だけ変更可）
- 標準: JSON Schema **2020-12** の assertion 名
- クロスバリ: ランタイムが用いる条件 ID（第一弾の `x-ys-cross-validate` は `targets` のみのため、ID 規約はランタイム側）

## よく使う子集

| 条件 ID | 典型的な用途 |
| --- | --- |
| `required` | 必須欠落 |
| `type` | 型不一致 |
| `enum` | 列挙外 |
| `const` | 固定値不一致 |
| `minLength` | 短すぎる文字列 |
| `maxLength` | 長すぎる文字列 |
| `pattern` | 正規表現不一致 |
| `format` | `email` 等の format 失敗 |
| `minimum` | 数値下限 |
| `maximum` | 数値上限 |
| `exclusiveMinimum` | 排他的下限 |
| `exclusiveMaximum` | 排他的上限 |
| `multipleOf` | 倍数制約 |
| `minItems` | 配列要素が少ない |
| `maxItems` | 配列要素が多い |
| `uniqueItems` | 配列の重複 |
| `minProperties` | オブジェクトプロパティが少ない |
| `maxProperties` | オブジェクトプロパティが多い |

## 例

```json
{
  "type": "string",
  "maxLength": 50,
  "format": "email",
  "x-ys-error-messages": {
    "required": "メールアドレスを入力してください",
    "format": "メールアドレスの形式が正しくありません",
    "maxLength": "50文字以内で入力してください"
  }
}
```

## 含めないもの（このメモの範囲外）

- JSON Schema のすべての keyword の網羅表
- ランタイム独自のクロスバリ ID の標準化
- i18n 辞書の置き場
