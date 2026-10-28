import { describe, z } from "zod";

export const claimSchema = z
  .object({
    policyId: z.string().trim().nonempty().max(6),
    incidentType: z.string(),
    incidentDate: z.date(),
    amountClaimed: z.number().positive(),
  })
  .describe("claimSchema to be used for validating incomuing claims data.");
