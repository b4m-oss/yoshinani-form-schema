# npm pack 確認メモ（publish しない）

> v0.5.0 マイルストーン用。`npm publish` は行わない。

## 手順

```bash
npm test
npm run build
npm run typecheck
npm run pack:check
```

`pack:check` は `npm pack --dry-run` 相当の内容確認を行う。

## 配布に含めるもの（package.json `files`）

- `dist/`
- `schemas/`
- `examples/`
- `README.md`
- `README_ja.md`
- `LICENSE`

## 含めないもの

- `src/`
- `docs/`（リポジトリ参照。npm パッケージには載せない）
- `node_modules/`
- テストファイル

## 確認観点

- [x] `npm test` 成功
- [x] `npm run build` で `dist/yoshinani-form-schema.js` と `dist/index.d.ts` が生成される
- [x] `npm run typecheck` 成功
- [x] `npm pack --dry-run` に `dist` / `schemas` / `examples` / README / LICENSE が含まれる
- [x] `npm pack --dry-run` に `src` / `docs` / テストが入らない

## 補足

- 語彙バージョンは `YS_VOCABULARY_VERSION` / フォーム JSON の `x-ys-version` で識別する
- 公開判断は PO。このマイルストーンは準備確認まで
