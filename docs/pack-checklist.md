# npm pack 確認メモ（publish しない）

> パッケージ実体は `packages/yoshinani-form-schema/`。ルートからは `make pack-check`。

## 手順

```bash
make install
make test
make build
make typecheck
make pack-check
```

`pack-check` は `npm pack --dry-run` 相当の内容確認を行う。

## 配布に含めるもの（package.json `files`）

- `dist/`（minify 済みビルド）
- `schemas/`
- `README.md`
- `README_ja.md`
- `LICENSE`

## 含めないもの

- `examples/`（リポジトリ参照用。npm には載せない）
- `src/`
- `docs/`（リポジトリ参照。npm パッケージには載せない）
- `node_modules/`
- テストファイル

## 確認観点

- [ ] `make test` 成功
- [ ] `make build` で `dist/yoshinani-form-schema.js` と `dist/index.d.ts` が生成される
- [ ] `make typecheck` 成功
- [ ] `make pack-check` に `dist` / `schemas` / README / LICENSE が含まれる
- [ ] `make pack-check` に `examples` / `src` / `docs` / テストが入らない

## 補足

- 語彙バージョンは `YS_VOCABULARY_VERSION` / フォーム JSON の `x-ys-version` で識別する
- 公開判断は PO
