import { describe, it, expect } from "vitest";
import { calculateTotal } from "./calculateTotal";

describe("calculateTotal", () => {
  describe("comma-delimited inputs", () => {
    it("should calculate total for comma-separated numbers", () => {
      expect(calculateTotal("100, 200, 300")).toBe(600);
    });

    it("should handle comma-separated numbers without spaces", () => {
      expect(calculateTotal("100,200,300")).toBe(600);
    });

    it("should handle comma-separated numbers with varying spaces", () => {
      expect(calculateTotal("100,  200,   300")).toBe(600);
    });

    it("should handle single number", () => {
      expect(calculateTotal("100")).toBe(100);
    });

    it("should handle decimal numbers", () => {
      expect(calculateTotal("10.5, 20.3, 30.2")).toBe(61);
    });

    it("should handle negative numbers", () => {
      expect(calculateTotal("-10, 20, 30")).toBe(40);
    });

    it("should handle mix of positive and negative numbers", () => {
      expect(calculateTotal("100, -50, 200, -25")).toBe(225);
    });
  });

  describe("newline-delimited inputs", () => {
    it("should calculate total for newline-separated numbers", () => {
      expect(calculateTotal("100\n200\n300")).toBe(600);
    });

    it("should handle newline-separated numbers with spaces", () => {
      expect(calculateTotal("100  \n  200  \n  300")).toBe(600);
    });

    it("should handle multiple consecutive newlines", () => {
      expect(calculateTotal("100\n\n200\n\n\n300")).toBe(600);
    });
  });

  describe("mixed delimiters", () => {
    it("should handle mix of commas and newlines", () => {
      expect(calculateTotal("100, 200\n300, 400")).toBe(1000);
    });

    it("should handle complex mix of delimiters", () => {
      expect(calculateTotal("100,200\n300\n400,500")).toBe(1500);
    });

    it("should handle trailing commas and newlines", () => {
      expect(calculateTotal("100, 200, 300,\n")).toBe(600);
    });

    it("should handle leading commas and newlines", () => {
      expect(calculateTotal(",\n100, 200, 300")).toBe(600);
    });
  });

  describe("edge cases", () => {
    it("should return 0 for empty string", () => {
      expect(calculateTotal("")).toBe(0);
    });

    it("should return 0 for whitespace only", () => {
      expect(calculateTotal("   ")).toBe(0);
    });

    it("should return 0 for only delimiters", () => {
      expect(calculateTotal(",,,\n\n")).toBe(0);
    });

    it("should handle zero values", () => {
      expect(calculateTotal("0, 0, 0")).toBe(0);
    });

    it("should handle mix of zeros and numbers", () => {
      expect(calculateTotal("0, 100, 0, 200")).toBe(300);
    });

    it("should handle very large numbers", () => {
      expect(calculateTotal("1000000, 2000000, 3000000")).toBe(6000000);
    });

    it("should handle very small decimal numbers", () => {
      expect(calculateTotal("0.001, 0.002, 0.003")).toBeCloseTo(0.006, 3);
    });
  });

  describe("invalid inputs", () => {
    it("should ignore non-numeric values", () => {
      expect(calculateTotal("100, abc, 200")).toBe(300);
    });

    it("should ignore empty values between delimiters", () => {
      expect(calculateTotal("100, , 200")).toBe(300);
    });

    it("should handle all invalid values", () => {
      expect(calculateTotal("abc, def, xyz")).toBe(0);
    });

    it("should handle mix of valid and invalid values", () => {
      expect(calculateTotal("100, invalid, 200, xyz, 300")).toBe(600);
    });

    it("should handle special characters", () => {
      expect(calculateTotal("100, @#$, 200")).toBe(300);
    });

    it("should handle partial numbers", () => {
      expect(calculateTotal("100abc, 200, def300")).toBe(300);
    });
  });

  describe("scientific notation", () => {
    it("should handle scientific notation", () => {
      expect(calculateTotal("1e2, 2e2, 3e2")).toBe(600);
    });

    it("should handle mix of regular and scientific notation", () => {
      expect(calculateTotal("100, 1e2, 200")).toBe(400);
    });
  });

  describe("floating point precision", () => {
    it("should handle floating point arithmetic correctly", () => {
      const result = calculateTotal("0.1, 0.2, 0.3");
      expect(result).toBeCloseTo(0.6, 10);
    });

    it("should handle many decimal places", () => {
      const result = calculateTotal("1.111111, 2.222222, 3.333333");
      expect(result).toBeCloseTo(6.666666, 6);
    });
  });

  describe("real-world scenarios", () => {
    it("should handle typical airdrop amounts", () => {
      expect(calculateTotal("1000, 2000, 1500, 3000, 500")).toBe(8000);
    });

    it("should handle large list of amounts", () => {
      const amounts = Array(100).fill(10).join(",");
      expect(calculateTotal(amounts)).toBe(1000);
    });

    it("should handle newline-separated addresses with amounts", () => {
      const input = "100\n200\n300\n400\n500";
      expect(calculateTotal(input)).toBe(1500);
    });
  });
});
