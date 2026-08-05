PKG := packages/yoshinani-form-schema

.PHONY: install test typecheck build pack-check clean help

help:
	@echo "Targets (run from repo root):"
	@echo "  make install     - npm ci in $(PKG)"
	@echo "  make test        - run tests"
	@echo "  make typecheck   - tsc --noEmit"
	@echo "  make build       - vite production build (minified)"
	@echo "  make pack-check  - build + npm pack dry-run checks"
	@echo "  make clean       - remove $(PKG)/dist"

install:
	npm ci --prefix $(PKG)

test:
	npm test --prefix $(PKG)

typecheck:
	npm run typecheck --prefix $(PKG)

build:
	npm run build --prefix $(PKG)

pack-check:
	npm run pack:check --prefix $(PKG)

clean:
	rm -rf $(PKG)/dist
