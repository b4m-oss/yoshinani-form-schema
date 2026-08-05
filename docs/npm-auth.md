# npm 認証（Trusted Publishing / NPM_TOKEN）

> Issue: #39  
> CD 本体: [`ci-cd.md`](./ci-cd.md) / [`.github/workflows/cd-npm-publish.yml`](../.github/workflows/cd-npm-publish.yml)

## 方針

1. **Trusted Publishing（OIDC）を第一候補**
2. 設定できない場合のみ **`NPM_TOKEN` secret** にフォールバック

Workflow は `permissions.id-token: write` 済み。`NPM_TOKEN` が無いときは OIDC、あるときは token 経路で publish する。

## A. Trusted Publishing（推奨）

### 前提

- npm アカウントが `@b4moss` org で publish 可能
- GitHub repo: `b4m-oss/yoshinani-form-schema`
- Workflow file name: **`cd-npm-publish.yml`**（パスではなくファイル名）

### 手順（npmjs.com / ブラウザ）

1. https://www.npmjs.com/ にログイン
2. パッケージが未作成の場合
   - org `@b4moss` の Trusted Publisher 予約、または
   - 初回だけ token で `0.5.0` を作成してから Trusted Publisher を接続
3. パッケージページ（作成後）または org の Automation / Trusted Publishing 設定へ
4. **GitHub Actions** を選び、次を入力:
   - Repository owner: `b4m-oss`
   - Repository name: `yoshinani-form-schema`
   - Workflow filename: `cd-npm-publish.yml`
   - Environment: （空でよい。CD で environment 未使用）
5. 保存

### 動作確認

1. `release` に対象コミットがあること
2. `main` 上のそのコミットに厳密な `vX.Y.Z` タグを push
3. Actions の **CD npm publish** が OIDC 経路で成功すること
4. https://www.npmjs.com/package/@b4moss/yoshinani-form-schema を確認

## B. フォールバック: NPM_TOKEN

iPad 等で Trusted Publishing 設定が難しい場合（Mac 作業想定）。

1. npm で **Granular Access Token** を発行
   - Type: Automation 推奨
   - Permissions: `@b4moss` パッケージの **Read and write**（publish）
   - 有効期限を適切に
2. GitHub repo **Settings → Secrets and variables → Actions**
3. Secret 名: **`NPM_TOKEN`**
4. 値: 発行したトークン
5. 以降 CD は token 経路（`--provenance` なし）で publish

トークン運用時は最小権限・ローテーションを行う。Trusted Publishing が使えるようになったら `NPM_TOKEN` を削除して OIDC に戻す。

## セキュリティメモ

- `NPM_TOKEN` を workflow ログに echo しない
- Classic token より Granular / Automation を優先
- OIDC 利用時は空の `NODE_AUTH_TOKEN` を渡さない（本 CD workflow で分離済み）

## チェックリスト（#39）

- [ ] npm 側で `@b4moss` の publish 権限がある
- [ ] Trusted Publisher に `cd-npm-publish.yml` を登録した（または `NPM_TOKEN` を設定した）
- [ ] テストタグではなく、ゲートを満たした `vX.Y.Z` で CD が通る
- [ ] 不要になった token は revoke した
