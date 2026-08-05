import { describe, expect, it } from "vitest";
import {
  YS_KEYWORDS,
  YS_PREFIX,
  YS_VOCABULARY_VERSION,
  getYsExtension,
  getYsExtensions,
  isKnownYsKeyword,
  isYsKeyword,
  type YsJsonSchema,
} from "./index.js";

describe("constants", () => {
  it("uses kebab-case x-ys- keywords", () => {
    expect(YS_PREFIX).toBe("x-ys-");
    expect(YS_VOCABULARY_VERSION).toBe("0.1.0");
    expect(YS_KEYWORDS.version).toBe("x-ys-version");
    expect(YS_KEYWORDS.layout).toBe("x-ys-layout");
    expect(YS_KEYWORDS.assist).toBe("x-ys-assist");
    expect(YS_KEYWORDS.errorMessages).toBe("x-ys-error-messages");
    expect(YS_KEYWORDS.crossValidate).toBe("x-ys-cross-validate");
  });
});

describe("isYsKeyword", () => {
  it("detects any x-ys-* key", () => {
    expect(isYsKeyword("x-ys-layout")).toBe(true);
    expect(isYsKeyword("x-ys-custom")).toBe(true);
    expect(isYsKeyword("x-other")).toBe(false);
  });

  it("detects known v0.1.0 keywords only via isKnownYsKeyword", () => {
    expect(isKnownYsKeyword("x-ys-layout")).toBe(true);
    expect(isKnownYsKeyword("x-ys-flow")).toBe(false);
  });
});

describe("getYsExtensions", () => {
  const schema: YsJsonSchema = {
    type: "string",
    title: "Email",
    "x-ys-assist": ["返信先として使用します"],
    "x-ys-error-messages": {
      required: "メールアドレスを入力してください",
      format: "メールアドレスの形式が正しくありません",
    },
    "x-ys-cross-validate": { targets: ["email"] },
  };

  it("extracts known extensions", () => {
    expect(getYsExtensions(schema)).toEqual({
      "x-ys-assist": ["返信先として使用します"],
      "x-ys-error-messages": {
        required: "メールアドレスを入力してください",
        format: "メールアドレスの形式が正しくありません",
      },
      "x-ys-cross-validate": { targets: ["email"] },
    });
  });

  it("reads a single extension", () => {
    expect(getYsExtension(schema, "x-ys-cross-validate")).toEqual({
      targets: ["email"],
    });
  });

  it("returns empty object for nullish input", () => {
    expect(getYsExtensions(undefined)).toEqual({});
    expect(getYsExtension(null, "x-ys-assist")).toBeUndefined();
  });
});
