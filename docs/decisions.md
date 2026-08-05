# 設計決定メモ

> 一問一答で確定した方針。実装仕様の詳細は後続で詰める。
> 機能一覧のメモは [`docs/main.md`](./main.md) を参照。

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

## `x-ys-*` と素の JSON Schema の線引き

- **バリデーションは可能な限り素の JSON Schema**
- `x-ys-*` は UI・EFO・補完意図・フロー・クロスバリなど、標準で足りない関心だけ

## layout（`x-ys-layout`）

- HTML の form / fieldset を想定
- ルート（またはグループ）の `x-ys-layout` に集約する
- フィールド個別には layout を持たない
- **ネストは当面なし**
- 形の核:
  - `type?: "vertical" | "horizontal"`（default: `vertical`）
  - `legend?: string`（小見出し。なくても OK）
  - `items: string[]`（各フォーム項目 UI の識別子。当面はプロパティ名）
- 横並びは成り行きで横幅均等。細かい幅調整は責務外

## 第一弾スコープ（語彙）

次を第一弾に含める:

- `x-ys-layout`
- `x-ys-assist`
- `x-ys-errorMessages`（命名は実装時に最終確定）
- `x-ys-crossValidation`
- 日本固有（住所・郵便番号・法人番号など）の **宣言用キーワード**
- フロー（ステップナビ / 確認 / コンプリート等）
- ファイル・配列 UI・規約同意・テキストカウント・disableOnSubmit など、下記の方針に沿った語彙

## 日本固有の補完

- schema は **意図の宣言のみ**（例: postal lookup / corporate number lookup）
- API 実装・プロバイダ選択はランタイム責務

## クロスバリデーション

- **JSON Schema の再掲**で書く（ルート data 向けの追加 schema / `if`-`then` など）
- 小さな独自 DSL（`eq` / `requiredIf` 等）は採用しない

## フロー（`x-ys-flow`）

- ルートにフロー設定をまとめる
- 画面は固定の「入力 / 確認 / 完了」に限定しない（例: メール確認画面が挟まる）
- 画面単位は **`id` + `role`**
- `role` は **利用者が自由に決める文字列**（語彙側で列挙・固定しない）
- 実装タイプの解決はランタイム
- ステップナビは「フォーム工程分割」ではなく、確認画面などで使う導線表示

## ファイルアップロード

- 寄せられるものは素 Schema（例: `maxItems`）
- 足りないもの（容量・MIME・プレビュー等）は `x-ys-file` 等の拡張

## テキストカウント

- 語彙では **表示 on/off のみ**
- `maxLength` 等からランタイムが表示を決める
- 位置や細かい見た目はランタイム責務

## 個数増減フィールド

- 素の `type: "array"` + `items` / `minItems` / `maxItems` を基本とする
- DnD 可否など UI 差分だけ `x-ys-*`（例: `x-ys-array`）

## 利用規約同意

- **ルートの `x-ys-terms`** としてフォーム全体設定で宣言
- 送信条件への紐づけはランタイムが解釈

## ボタン disabled

- 語彙に入れる（例: `x-ys-disableOnSubmit`）
- 個別に宣言可能

## アシストメッセージ

- **`string[]`**

## エラーメッセージ

- 利用者は **文言だけ**変更可能
- **key（条件 ID）の語彙はユーザー変更不可**
- key = 条件 ID
  - 標準条件: JSON Schema の assertion 名（`required` / `maxLength` / `pattern` など）
  - クロスバリ: rule の `id`
- 形のイメージ（マップ）:

```json
"x-ys-errorMessages": {
  "required": "この項目は必須項目です",
  "maxLength": "最大文字数を超えています",
  "pattern": "正しい記法で書いてください"
}
```

- 自由な別名 key（例: `overMaxLength` → `maxLength`）は採用しない

## 決定の記録場所

- 本ファイル（`docs/decisions.md`）に残す
