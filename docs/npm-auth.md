# npm 認証（NPM_TOKEN）

> Issue: #39  
> CD 本体: [`ci-cd.md`](./ci-cd.md) / [`.github/workflows/cd-npm-publish.yml`](../.github/workflows/cd-npm-publish.yml)

## 方針

他の `@b4moss` 公開リポ（`hyogen-md` / `jp-local-gov-id`）と同じく、**GitHub Actions secret `NPM_TOKEN`** で publish する。

Trusted Publishing（OIDC のみ）は使わない。

## 設定手順（PO）

1. npm で **Granular Access Token**（Automation 推奨）を発行  
   - `@b4moss` への publish（Read and write）ができること  
   - 他リポの CD で使っているトークンを流用してもよい（権限範囲に注意）
2. GitHub: `b4m-oss/yoshinani-form-schema`  
   **Settings → Secrets and variables → Actions**
3. New repository secret
   - Name: **`NPM_TOKEN`**
   - Value: 発行したトークン
4. 保存

## CD 側の挙動

- `NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}` を渡して `npm publish --access public --provenance`
- secret が未設定なら publish ステップで失敗（明示エラー）

## チェックリスト（#39）

- [ ] `NPM_TOKEN` をこのリポの Actions secrets に追加した
- [ ] トークンに `@b4moss` publish 権限がある
- [ ] （任意）他リポの CD と同じトークン運用方針に揃えた

## セキュリティメモ

- トークンを workflow ログに出さない
- 不要になったら revoke / ローテーション
- Classic より Granular / Automation を優先
