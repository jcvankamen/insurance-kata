import { describe, it, expect } from "vitest";
import { claimSchema } from "./claim.schema";

describe("Claim Schema Base Validation", () => {
  const validClaim = {
    policyId: "123456",
    incidentType: "Accident",
    incidentDate: new Date("2023-01-01"),
    amountClaimed: 1000,
  };

  it("should allow a valid claim object", () => {
    const result = claimSchema.safeParse(validClaim);
    expect(result.success).toBe(true);
  });

  it.each([
    { fieldName: "policyId" },
    { fieldName: "incidentType" },
    { fieldName: "incidentDate" },
    { fieldName: "amountClaimed" },
  ])(
    "should reject a claim object when '$fieldName' is missing",
    ({ fieldName }) => {
      //copy valid claim and remove field
      const invalidClaim = { ...validClaim };
      delete invalidClaim[fieldName as keyof typeof validClaim];
      const result = claimSchema.safeParse(invalidClaim);
      expect(result.success).toBe(false);
    },
  );

  describe("policyId", () => {
    it("should reject a claim object when policyId is not a string", () => {
      const invalidClaim = { ...validClaim, policyId: 123456 };
      const result = claimSchema.safeParse(invalidClaim);
      expect(result.success).toBe(false);
    });

    it("should reject a claim object when policyId is an empty string", () => {
      const invalidClaim = { ...validClaim, policyId: "" };
      const result = claimSchema.safeParse(invalidClaim);
      expect(result.success).toBe(false);
    });

    it("should reject a claim object when policyId is a string with only whitespace", () => {
      const invalidClaim = { ...validClaim, policyId: "   " };
      const result = claimSchema.safeParse(invalidClaim);
      expect(result.success).toBe(false);
    });

    it("should reject a claim object when policyId length is over 6 characters", () => {
      const invalidClaim = { ...validClaim, policyId: "1234567" };
      const result = claimSchema.safeParse(invalidClaim);
      expect(result.success).toBe(false);
    });
  });

  describe("incidentType", () => {
    it("should reject a claim object when incidentType is not a string", () => {
      const invalidClaim = { ...validClaim, incidentType: 123 };
      const result = claimSchema.safeParse(invalidClaim);
      expect(result.success).toBe(false);
    });

    it("should reject a claim object when incidentType is an empty string", () => {
      const invalidClaim = { ...validClaim, incidentType: "" };
      const result = claimSchema.safeParse(invalidClaim);
      expect(result.success).toBe(false);
    });
  });

  describe("incidentDate", () => {
    it("should reject a claim object when incidentDate is not a date", () => {
      const invalidClaim = { ...validClaim, incidentDate: "2023-01-01" };
      const result = claimSchema.safeParse(invalidClaim);
      expect(result.success).toBe(false);
    });

    it("should reject a claim object when incidentDate is an invalid date", () => {
      const invalidClaim = {
        ...validClaim,
        incidentDate: new Date("invalid-date"),
      };
      const result = claimSchema.safeParse(invalidClaim);
      expect(result.success).toBe(false);
    });

    it("should reject a claim object when incidentDate is null", () => {
      const invalidClaim = { ...validClaim, incidentDate: null };
      const result = claimSchema.safeParse(invalidClaim);
      expect(result.success).toBe(false);
    });

    it("should reject a claim object when incidentDate is undefined", () => {
      const invalidClaim = { ...validClaim, incidentDate: undefined };
      const result = claimSchema.safeParse(invalidClaim);
      expect(result.success).toBe(false);
    });

    it("should reject a claim object when incidentDate is in the future", () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      const invalidClaim = { ...validClaim, incidentDate: futureDate };
      const result = claimSchema.safeParse(invalidClaim);
      expect(result.success).toBe(false);
    });
  });

  describe("amountClaimed", () => {
    it("should reject a claim object when amountClaimed is not a number", () => {
      const invalidClaim = { ...validClaim, amountClaimed: "1000" };
      const result = claimSchema.safeParse(invalidClaim);
      expect(result.success).toBe(false);
    });

    it("should reject a claim object when amountClaimed is zero", () => {
      const invalidClaim = { ...validClaim, amountClaimed: 0 };
      const result = claimSchema.safeParse(invalidClaim);
      expect(result.success).toBe(false);
    });

    it("should reject a claim object when amountClaimed is negative", () => {
      const invalidClaim = { ...validClaim, amountClaimed: -1000 };
      const result = claimSchema.safeParse(invalidClaim);
      expect(result.success).toBe(false);
    });
  });
});
