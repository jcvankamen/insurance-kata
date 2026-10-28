import { describe, it, expect } from "vitest";
import { claimSchema } from "./claim.schema";

describe("Claim Schema Validation", () => {
  const validClaim = {
    policyId: "123456",
    incidentType: "Accident",
    incidentDate: new Date("2023-01-01"),
    amountClaimed: 1000,
  };

  it("should allow a valid claim object", () => {
    const validClaim = {
      policyId: "123456",
      incidentType: "Accident",
      incidentDate: new Date("2023-01-01"),
      amountClaimed: 1000,
    };
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
});
