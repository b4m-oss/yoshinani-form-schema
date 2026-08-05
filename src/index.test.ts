import { describe, expect, it } from "vitest";
import {
  YS_KEYWORDS,
  YS_VOCABULARY_VERSION,
  getYsExtension,
  isKnownYsKeyword,
  type YsJsonSchema,
} from "./index.js";

describe("constants", () => {
  it("includes v0.4.0 Japan lookup keywords", () => {
    expect(YS_VOCABULARY_VERSION).toBe("0.4.0");
    expect(YS_KEYWORDS.postalLookup).toBe("x-ys-postal-lookup");
    expect(YS_KEYWORDS.addressLookup).toBe("x-ys-address-lookup");
    expect(YS_KEYWORDS.corporateNumberLookup).toBe(
      "x-ys-corporate-number-lookup",
    );
    expect(isKnownYsKeyword("x-ys-postal-lookup")).toBe(true);
  });
});

describe("japan lookup extensions", () => {
  it("reads intent flags", () => {
    const postal: YsJsonSchema = {
      type: "string",
      "x-ys-postal-lookup": true,
    };
    const address: YsJsonSchema = {
      type: "string",
      "x-ys-address-lookup": true,
    };
    const corp: YsJsonSchema = {
      type: "string",
      "x-ys-corporate-number-lookup": true,
    };

    expect(getYsExtension(postal, "x-ys-postal-lookup")).toBe(true);
    expect(getYsExtension(address, "x-ys-address-lookup")).toBe(true);
    expect(getYsExtension(corp, "x-ys-corporate-number-lookup")).toBe(true);
  });
});
