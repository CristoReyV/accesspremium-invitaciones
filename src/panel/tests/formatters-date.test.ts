import { describe, expect, it } from "vitest";
import { formatDate } from "../utils/formatters";

describe("event date formatting", () => {
  it("preserves PostgreSQL DATE calendar day without timezone shift", () => {
    const result = formatDate("2027-01-30");
    expect(result).toMatch(/30/);
    expect(result).toMatch(/2027/);
    expect(result).not.toMatch(/^29\b/);
  });

  it("still formats timestamp values", () => {
    const result = formatDate("2027-01-30T19:00:00-06:00");
    expect(result).not.toBe("—");
    expect(result).toMatch(/2027/);
  });
});
