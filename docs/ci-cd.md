# CI / CD（npm）

> Issues: #37 CI / #38 CD (Bパターン) / #39 Auth / #40 初回 0.5.0 公開

## ブランチ役割

| ブランチ | 役割 |
| --- | --- |
| `develop` | 開発の最新。ここへの PR で CI |
| `main` | 正。タグ打ちはここに取り込まれたコミットへ |
| `release` | 公開ゲート。タグ先コミットがここに含まれているときだけ publish |

## CI（#37）

Workflow: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)

- トリガー: `pull_request` → `develop` / `dev-v*`
- 実行: `npm ci` → `test` → `typecheck` → `build` → `pack:check`

## CD Bパターン（#38）

Workflow: [`.github/workflows/cd-npm-publish.yml`](../.github/workflows/cd-npm-publish.yml)

1. **タグは `main` に取り込まれたコミットへ打つ**（`release` では打たない）
2. タグ push を契機に CD が動く
3. 許可タグ: `^v[0-9]+\.[0-9]+\.[0-9]+$`（例: `v0.5.0`）
4. **無視**: `v0.5.0-rc.1` など suffix 付き
5. タグ先コミットが `origin/release` の祖先に含まれない場合は **publish せず失敗**
6. `package.json` の `version` とタグ（`v` 除去）が一致必須

### 公開までの典型手順

```text
develop で開発・CI
  → main へ取り込み
  → 公開してよいコミットを release に反映（PR or fast-forward）
  → main 上のそのコミットに vX.Y.Z をタグ付けして push
  → CD が release ゲートを確認して npm publish
```

## Auth（#39）

詳細手順: [`npm-auth.md`](./npm-auth.md)

優先: **npm Trusted Publishing（OIDC）** / 予備: **`NPM_TOKEN` secret**

Workflow は `cd-npm-publish.yml` で OIDC（`id-token: write`）と token 経路を分離済み。

## 初回 0.5.0（#40）

- git タグ `v0.5.0` は main に既存
- `release` にそのコミットが含まれることを確認
- 必要ならタグの再 push、または `release` 更新後に CD を `workflow_dispatch` なしで再発火させるため空コミットは使わず、手順どおりゲートを満たす

公開後に README の「公開は後」注記を更新する（#40）。
