import { describe, z } from "zod";

export const claimSchema = z
  .object({
    policyId: z.string().trim().nonempty().max(6),
    incidentType: z.string().trim().nonempty(),
    incidentDate: z.date().refine(
      (date: Date): boolean => {
        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);
        return date <= endOfToday;
      },
      { message: "incident date cannot be in the future" },
    ),
    amountClaimed: z.number().positive(),
  })
  .describe("claimSchema to be used for validating incomuing claims data.");
