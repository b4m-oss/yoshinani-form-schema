# @b4moss/yoshinani-form-schema

JSON Schema extensions (`x-ys-*`) for Yoshinani form generators.

Japanese UX oriented contact / application forms can declare **layout**, **assist messages**, **error messages**, and **cross-field validation** alongside standard JSON Schema.

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

## Extension prefix

All Yoshinani keywords use the prefix **`x-ys-`**.

| Keyword | Purpose |
| --- | --- |
| `x-ys-layout` | Layout / presentation hints (order, width, section, widget, …) |
| `x-ys-assist` | Non-error guidance (help, tip, example) |
| `x-ys-errorMessage` | Human-readable messages keyed by validation keyword |
| `x-ys-crossValidation` | Cross-field validation rules |

## Example

```json
{
  "type": "string",
  "title": "メールアドレス",
  "format": "email",
  "x-ys-layout": { "order": 1, "width": "half", "widget": "email" },
  "x-ys-assist": { "help": "返信先として使用します", "example": "yamada@example.com" },
  "x-ys-errorMessage": {
    "required": "メールアドレスを入力してください",
    "format": "メールアドレスの形式が正しくありません"
  }
}
```

See [`examples/contact.schema.json`](./examples/contact.schema.json) for a fuller sample, and [`schemas/x-ys-extensions.json`](./schemas/x-ys-extensions.json) for vocabulary sketches.

## API (TypeScript)

```ts
import {
  YS_KEYWORDS,
  getYsExtensions,
  normalizeCrossValidation,
  type YsJsonSchema,
} from "@b4moss/yoshinani-form-schema";

const schema: YsJsonSchema = {
  type: "object",
  properties: {
    email: { type: "string", "x-ys-layout": { width: "half" } },
  },
};

const extensions = getYsExtensions(schema.properties!.email!);
```

This package currently ships **types**, **keyword constants**, and **small helpers**. Runtime form generation / validation engines are out of scope for the scaffold.

## Development

```bash
npm install
npm test
npm run build
```

## License

MIT © Bicycle for Mind LLC.
