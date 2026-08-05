# CI / CD（npm）

> Issues: #37 CI / #38 CD (Bパターン) / #39 Auth / #40 初回 0.5.0 公開

## ブランチ役割

| ブランチ | 役割 |
| --- | --- |
| `develop` | 開発の最新。ここへの PR で CI |
| `main` | 正。タグ打ちはここに取り込まれたコミットへ |
| `release` | 公開ゲート。ここに main がマージされたとき CD が走る |

## CI（#37）

Workflow: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)

- トリガー: `pull_request` → `develop` / `dev-v*`
- 実行: `packages/yoshinani-form-schema` で `npm ci` → `test` → `typecheck` → `build` → `pack:check`（ルートからは `make …`）

## CD Bパターン（#38）

Workflow: [`.github/workflows/cd-npm-publish.yml`](../.github/workflows/cd-npm-publish.yml)

1. **タグは `main` に取り込まれたコミットへ打つ**（`release` では打たない）
2. **タグ push では publish しない**
3. **`release` への push**（典型: main → release のマージ）を契機に CD が動く
4. `packages/yoshinani-form-schema/package.json` の `version` が exact `X.Y.Z` であること（`-rc` 等はスキップ）
5. 対応タグ `vX.Y.Z` が存在し、そのコミットが **release HEAD の祖先**であること
6. 既に npm に同じバージョンがある場合は publish をスキップ

### 公開までの典型手順

```text
develop で開発・CI
  → main へ取り込み
  → main 上のそのコミットに vX.Y.Z をタグ付けして push（この時点では publish しない）
  → main を release にマージ（PR）
  → release への push で CD が動き、タグ／version ゲートを確認して npm publish
```

## Auth（#39）

詳細手順: [`npm-auth.md`](./npm-auth.md)

**`NPM_TOKEN` secret**（`hyogen-md` / `jp-local-gov-id` と同じ方式）。

## 初回 0.5.0（#40）

完了済み（`@b4moss/yoshinani-form-schema@0.5.0` 公開）。
