# @b4moss/yoshinani-form-schema

JSON Schema extensions (`x-ys-*`) for Yoshinani form generators.

> Japanese documentation: [README_ja.md](./README_ja.md)

## Documentation

- [docs/vocabulary.md](./docs/vocabulary.md) — `x-ys-*` vocabulary reference
- [docs/json-schema-conventions.md](./docs/json-schema-conventions.md) — plain JSON Schema conventions
- [docs/decisions.md](./docs/decisions.md) — design decisions
- [docs/main.md](./docs/main.md) — product feature memo

## Install

```bash
npm install @b4moss/yoshinani-form-schema
```

> Package publish may lag behind the git vocabulary work. Prefer the docs and `schemas/` in-repo until `0.1.0` is released.

## Extension prefix

All Yoshinani keywords use **`x-ys-*`** in **kebab-case**.

Through v0.4.0:

| Keyword | Purpose |
| --- | --- |
| `x-ys-version` | Required vocabulary SemVer on the form root |
| `x-ys-layout` | Fieldset layout (`type`, `legend`, `items`) |
| `x-ys-assist` | Assist messages (`string[]`) |
| `x-ys-error-messages` | Error copy map keyed by condition IDs |
| `x-ys-cross-validate` | Cross-field targets on the error-displaying field |
| `x-ys-flow` | Screen model (`screens`: `id` + `role`) |
| `x-ys-step-nav` | Placeable step navigation flag |
| `x-ys-terms` | Root terms consent setting |
| `x-ys-text-count` | Text count display on/off |
| `x-ys-disable-on-submit` | Disable control after submit |
| `x-ys-file` | File size / MIME / preview extras |
| `x-ys-array` | Array UI extras (e.g. drag-and-drop) |
| `x-ys-postal-lookup` | Postal-code → address lookup intent |
| `x-ys-address-lookup` | Address → postal-code lookup intent |
| `x-ys-corporate-number-lookup` | Corporate number → name/address lookup intent |

## Example

See [`examples/contact.schema.json`](./examples/contact.schema.json) and [`schemas/`](./schemas/).

```ts
import {
  YS_KEYWORDS,
  YS_VOCABULARY_VERSION,
  getYsExtensions,
  type YsJsonSchema,
} from "@b4moss/yoshinani-form-schema";

const schema: YsJsonSchema = {
  "x-ys-version": YS_VOCABULARY_VERSION,
  type: "object",
  properties: {
    email: {
      type: "string",
      "x-ys-assist": ["返信先として使用します"],
    },
  },
  "x-ys-layout": { type: "vertical", items: ["email"] },
};

const emailExt = getYsExtensions(schema.properties!.email!);
console.log(YS_KEYWORDS.layout, emailExt);
```

This package ships **types**, **keyword constants**, **small helpers**, and **JSON Schema sketches**. Runtime form engines are out of scope.

## Development

```bash
npm install
npm test
npm run build
```

## License

MIT © Bicycle for Mind LLC.
