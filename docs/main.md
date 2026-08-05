# Yoshinani Form — 実現したい機能メモ

> プロダクト構想のメモ。実装仕様・スキーマ仕様の確定稿ではない。
> 仕様の読み方:
> - 語彙リファレンス: [`vocabulary.md`](./vocabulary.md)
> - 素 Schema 推奨カタログ: [`json-schema-conventions.md`](./json-schema-conventions.md)
> - エラー条件 ID 子集: [`error-condition-ids.md`](./error-condition-ids.md)
> - pack 確認: [`pack-checklist.md`](./pack-checklist.md)
> - 設計決定ログ: [`decisions.md`](./decisions.md)

## 大まかな機能

- JSON Schema 駆動のフォームジェネレーション
- JSON から、様々なランタイムでフォームを生成する
- JSON Schema が、フロントエンドとバックエンドのバリデーションを兼ねる
  - 例: PHP なら opus を使う
- 日本で求められる EFO（Entry Form Optimization）を意識し、最速でフォームが作れるプロダクトを目指す

## 項目

### 1行フィールド（input）

- ラベル
- フィールド
- テキストカウント
- アシストメッセージ
- エラーメッセージ

### 複数行フィールド（textarea）

- ラベル
- フィールド
- テキストカウント
- テキストカウントプログレスバー
- アシストメッセージ
- エラーメッセージ

### ラジオ・チェックボックス

- 最小個数の設定
- 最大個数の設定

### バリデーション

- クロスバリデーション
- 正規表現バリデーション

### 日本の住所・法人まわり

- 日本の住所の頻出パターン
- 郵便番号から住所補完（API 使用 OK）
- 住所から郵便番号の補完（API 使用 OK）
- 日本の法人番号、法人番号からの正式名称・住所補完

### ファイルアップロード

- 同時アップロード最大個数
- 1ファイルあたりの容量制限
- MIME タイプの制限
- プレビュー機能

### 個数増減フィールド

- フィールドの追加・削除
- DnD による入れ替え

### その他 UI

- ボタンクリック後の `disabled` 属性追加
- 利用規約同意小窓

## 補足（フォーム体験）

- フロントエンドは、focus 移送時のリアルタイムバリデーション
- `checkValidity` による、フォーム全体および項目のインジケート
- 確認画面
- コンプリート画面
- ステップナビ

## マイルストーン方針

- 一気に実装しなくてよい
- schema にもバージョンを切る

## 関連メモ（layout 方針・途中合意）

別 Issue / 議論で出た layout の方向性（確定前）:

- HTML の form / fieldset を想定
- 小見出しは `legend`（なくても OK）
- `type`: `vertical`（default）| `horizontal`
- 中身は `items` 配列
- 横並びは成り行きで横幅均等。細かい幅調整は責務外
- schema 定義はファイル分割する

参照: https://github.com/b4m-oss/yoshinani-form-schema/issues/2
