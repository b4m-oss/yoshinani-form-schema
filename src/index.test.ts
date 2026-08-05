import { describe, expect, it } from "vitest";
import {
  YS_KEYWORDS,
  YS_PREFIX,
  getYsExtension,
  getYsExtensions,
  isKnownYsKeyword,
  isYsKeyword,
  normalizeCrossValidation,
  type YsJsonSchema,
} from "./index.js";

describe("constants", () => {
  it("uses the x-ys- prefix", () => {
    expect(YS_PREFIX).toBe("x-ys-");
    expect(YS_KEYWORDS.layout).toBe("x-ys-layout");
    expect(YS_KEYWORDS.assist).toBe("x-ys-assist");
    expect(YS_KEYWORDS.errorMessage).toBe("x-ys-errorMessage");
    expect(YS_KEYWORDS.crossValidation).toBe("x-ys-crossValidation");
  });
});

describe("isYsKeyword", () => {
  it("detects any x-ys-* key", () => {
    expect(isYsKeyword("x-ys-layout")).toBe(true);
    expect(isYsKeyword("x-ys-custom")).toBe(true);
    expect(isYsKeyword("x-other")).toBe(false);
    expect(isYsKeyword("title")).toBe(false);
  });

  it("detects known keywords only via isKnownYsKeyword", () => {
    expect(isKnownYsKeyword("x-ys-layout")).toBe(true);
    expect(isKnownYsKeyword("x-ys-custom")).toBe(false);
  });
});

describe("getYsExtensions", () => {
  const schema: YsJsonSchema = {
    type: "string",
    title: "Email",
    "x-ys-layout": { width: "half", order: 1 },
    "x-ys-assist": "例）yamada@example.com",
    "x-ys-errorMessage": {
      required: "メールアドレスを入力してください",
      format: "メールアドレスの形式が正しくありません",
    },
  };

  it("extracts only x-ys-* extensions", () => {
    expect(getYsExtensions(schema)).toEqual({
      "x-ys-layout": { width: "half", order: 1 },
      "x-ys-assist": "例）yamada@example.com",
      "x-ys-errorMessage": {
        required: "メールアドレスを入力してください",
        format: "メールアドレスの形式が正しくありません",
      },
    });
  });

  it("reads a single extension", () => {
    expect(getYsExtension(schema, "x-ys-layout")).toEqual({
      width: "half",
      order: 1,
    });
  });

  it("returns empty object for nullish input", () => {
    expect(getYsExtensions(undefined)).toEqual({});
    expect(getYsExtension(null, "x-ys-assist")).toBeUndefined();
  });
});

describe("normalizeCrossValidation", () => {
  it("normalizes a single rule to an array", () => {
    const rule = {
      assert: { op: "eq" as const, left: "email", right: "emailConfirm" },
      message: "メールアドレスが一致しません",
    };
    expect(normalizeCrossValidation(rule)).toEqual([rule]);
  });

  it("passes through arrays and empty input", () => {
    expect(normalizeCrossValidation([])).toEqual([]);
    expect(normalizeCrossValidation(undefined)).toEqual([]);
  });
});
