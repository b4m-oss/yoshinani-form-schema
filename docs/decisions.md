# 設計決定メモ

> 一問一答で確定した方針。実装仕様の詳細は後続で詰める。
> - 機能一覧メモ: [`main.md`](./main.md)
> - 語彙リファレンス: [`vocabulary.md`](./vocabulary.md)
> - 素 Schema 推奨カタログ: [`json-schema-conventions.md`](./json-schema-conventions.md)

## リポジトリ責務

- **スキーマ語彙のみ**（`x-ys-*` の型・JSON Schema・ドキュメント）
- ランタイムのフォーム生成・API 呼び出し・UI 描画は範囲外

## JSON Schema

- ベース草稿: **2020-12**

## バージョン

- 語彙（vocabulary）を **SemVer** で管理する
- パッケージは `0.1.0` から開始
- `1.0.0` 到達まではスコープ上 **v1** と名乗ってよい
- `1.0.0` 到達後、後方互換性が切れたら **v2 / 2.0.0**
- 各フォーム JSON に語彙バージョン宣言を **必須** とする（例: `x-ys-version`）

## キーワード命名

- **kebab-case**（例: `x-ys-error-messages`, `x-ys-cross-validate`, `x-ys-disable-on-submit`）

## `x-ys-*` と素の JSON Schema の線引き

- **バリデーションは可能な限り素の JSON Schema**
- `x-ys-*` は UI・EFO・補完意図・フロー・クロスバリなど、標準で足りない関心だけ

## コア拡張の最小形

```ts
// x-ys-layout（ルート/グループ）
{ type?: "vertical" | "horizontal"; legend?: string; items: string[] }

// x-ys-assist（フィールド）
string[]

// x-ys-error-messages（フィールド）
{ [conditionId: string]: string } // key は条件ID固定

// x-ys-cross-validate（フィールド）
// エラーを出す側のフィールドに付与。検証ロジックはランタイム
{ targets: string[] }
```

## layout（`x-ys-layout`）

- HTML の form / fieldset を想定
- ルート（またはグループ）の `x-ys-layout` に集約する
- フィールド個別には layout を持たない
- **ネストは当面なし**
- `type?: "vertical" | "horizontal"`（default: `vertical`）
- `legend?: string`（小見出し。なくても OK）
- `items: string[]`（各フォーム項目 UI の識別子。当面はプロパティ名）
- 横並びは成り行きで横幅均等。細かい幅調整は責務外

## クロスバリデーション（`x-ys-cross-validate`）

- ルート集約ではなく、**各フォーム入力要素に付与**
- **エラーを出す側**に書く
- 第一弾の形: `{ targets: string[] }`（**targets のみ**）
- 検証ロジック自体はランタイムが決める
- 失敗時はそのフィールドにエラー
- 小さな独自 DSL（`eq` / `requiredIf` 等）は採用しない

## 日本固有の補完（第一弾）

意図フラグ中心の最小3つ:

- `x-ys-postal-lookup`
- `x-ys-address-lookup`
- `x-ys-corporate-number-lookup`

API 実装・プロバイダ選択はランタイム責務。

## フロー（`x-ys-flow`）

- ルートに画面モデルをまとめる（**screens のみ**）
- 最小形: `{ screens: { id: string; role: string; [key: string]: unknown }[] }`
- 各 screen は **`id` + `role` 必須**。それ以外のプロパティは任意（ランタイムが解釈）
- 画面は固定の「入力 / 確認 / 完了」に限定しない（例: メール確認が挟まる）
- `role` は利用者が自由に決める文字列（語彙側で列挙しない）
- 実装タイプの解決はランタイム
- ステップナビは工程分割ではなく導線表示
- **配置は `x-ys-flow` に持たない**
- 配置は `properties` / `x-ys-layout.items` 側で、`x-ys-step-nav` 等を置いて行う

## 利用規約（`x-ys-terms`）

- ルートのフォーム全体設定
- 第一弾は有無中心: `true` または `{ required?: boolean }`
- 本文 / URL の持ち方は後続

## ファイル・配列・カウント・disabled

```ts
"x-ys-file": {
  maxSize?: number;   // bytes
  accept?: string[];  // MIME
  preview?: boolean;
}
// 個数は素の minItems / maxItems

"x-ys-array": {
  dragAndDrop?: boolean;
}

"x-ys-text-count": boolean;       // progress の有無はランタイム判断可
"x-ys-disable-on-submit": boolean;
```

## エラーメッセージ（`x-ys-error-messages`）

- 利用者は **文言だけ**変更可能
- **key（条件 ID）の語彙はユーザー変更不可**
- key = 条件 ID
  - 標準: JSON Schema assertion 名をそのまま使う（詳細一覧表は後続）
  - クロスバリ: 対象ルール / フィールド側の id
- 形はマップ:

```json
"x-ys-error-messages": {
  "required": "この項目は必須項目です",
  "maxLength": "最大文字数を超えています",
  "pattern": "正しい記法で書いてください"
}
```

## アシストメッセージ（`x-ys-assist`）

- **`string[]`**（単一言語）
- i18n / 多言語辞書はランタイム側。schema 内の言語マップは持たない

## 素の JSON Schema 推奨慣例

- 第一弾ドキュメントに **推奨カタログを一枚**書く
- 例: email は `format: "email"`、複数選択は `array` + `minItems` / `maxItems`、ラジオ/チェックの書き方など
- カタログの中身の詳細はドキュメント作成時に詰める

## 語彙の識別子 / `$id`

- 第一弾は meta-schema の `$id` を振らない
- 識別は **`@b4moss/yoshinani-form-schema` + `x-ys-version`** で行う
- `$id` / 独自 URL は後続で検討

## 第一弾スコープ（語彙）まとめ

- `x-ys-version`（必須）
- `x-ys-layout`
- `x-ys-assist`
- `x-ys-error-messages`
- `x-ys-cross-validate`
- `x-ys-postal-lookup` / `x-ys-address-lookup` / `x-ys-corporate-number-lookup`
- `x-ys-flow` / `x-ys-step-nav`
- `x-ys-terms`
- `x-ys-file` / `x-ys-array` / `x-ys-text-count` / `x-ys-disable-on-submit`

## 実装進め方

- **docs 先行**
- 既存スキャフォールド（camelCase・厚い layout 等）のコード再構築は次タスク
- 決定に合わせて後から src / schemas / examples を作り直す

## 決定の記録場所

- 本ファイル（`docs/decisions.md`）に残す
