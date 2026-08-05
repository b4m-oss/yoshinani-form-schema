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
  it("uses kebab-case x-ys- keywords through v0.2.0", () => {
    expect(YS_PREFIX).toBe("x-ys-");
    expect(YS_VOCABULARY_VERSION).toBe("0.2.0");
    expect(YS_KEYWORDS.flow).toBe("x-ys-flow");
    expect(YS_KEYWORDS.stepNav).toBe("x-ys-step-nav");
    expect(YS_KEYWORDS.terms).toBe("x-ys-terms");
    expect(YS_KEYWORDS.textCount).toBe("x-ys-text-count");
    expect(YS_KEYWORDS.disableOnSubmit).toBe("x-ys-disable-on-submit");
  });
});

describe("isYsKeyword", () => {
  it("detects known v0.2.0 keywords", () => {
    expect(isYsKeyword("x-ys-flow")).toBe(true);
    expect(isKnownYsKeyword("x-ys-step-nav")).toBe(true);
    expect(isKnownYsKeyword("x-ys-file")).toBe(false);
  });
});

describe("getYsExtensions", () => {
  const schema: YsJsonSchema = {
    "x-ys-version": "0.2.0",
    type: "object",
    "x-ys-flow": {
      screens: [
        { id: "input", role: "form" },
        { id: "confirm", role: "confirm", label: "確認" },
      ],
    },
    "x-ys-terms": { required: true },
    properties: {
      stepNavTop: { "x-ys-step-nav": true },
      message: {
        type: "string",
        "x-ys-text-count": true,
      },
      submit: { "x-ys-disable-on-submit": true },
    },
  };

  it("extracts flow/terms from root and flags from fields", () => {
    expect(getYsExtensions(schema)["x-ys-flow"]?.screens).toHaveLength(2);
    expect(getYsExtensions(schema)["x-ys-terms"]).toEqual({ required: true });
    expect(getYsExtension(schema.properties!.stepNavTop!, "x-ys-step-nav")).toBe(
      true,
    );
    expect(
      getYsExtension(schema.properties!.message!, "x-ys-text-count"),
    ).toBe(true);
    expect(
      getYsExtension(schema.properties!.submit!, "x-ys-disable-on-submit"),
    ).toBe(true);
  });
});
