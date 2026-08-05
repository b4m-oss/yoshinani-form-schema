import { describe, expect, it } from "vitest";
import {
  YS_KEYWORDS,
  YS_VOCABULARY_VERSION,
  getYsExtension,
  isKnownYsKeyword,
  type YsJsonSchema,
} from "./index.js";

describe("constants", () => {
  it("includes v0.3.0 file/array keywords", () => {
    expect(YS_VOCABULARY_VERSION).toBe("0.3.0");
    expect(YS_KEYWORDS.file).toBe("x-ys-file");
    expect(YS_KEYWORDS.array).toBe("x-ys-array");
    expect(isKnownYsKeyword("x-ys-file")).toBe(true);
    expect(isKnownYsKeyword("x-ys-postal-lookup")).toBe(false);
  });
});

describe("getYsExtension file/array", () => {
  it("reads structured input extensions", () => {
    const participants: YsJsonSchema = {
      type: "array",
      minItems: 1,
      maxItems: 5,
      "x-ys-array": { dragAndDrop: true },
    };
    const attachments: YsJsonSchema = {
      type: "array",
      maxItems: 3,
      "x-ys-file": {
        maxSize: 5242880,
        accept: ["image/png", "application/pdf"],
        preview: true,
      },
    };

    expect(getYsExtension(participants, "x-ys-array")).toEqual({
      dragAndDrop: true,
    });
    expect(getYsExtension(attachments, "x-ys-file")?.maxSize).toBe(5242880);
  });
});
