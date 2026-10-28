import { describe, z } from "zod";

export const claimSchema = z
  .object({
    policyId: z.string().trim().nonempty().max(6),
    incidentType: z.string().trim().nonempty(),
    incidentDate: z
      .iso.date()
      .refine((date) => {
        const today = new Date();
        const todayString = [
          today.getFullYear(),
          String(today.getMonth() + 1).padStart(2, "0"),
          String(today.getDate()).padStart(2, "0"),
        ].join("-");
        return date <= todayString;
      }, { message: "incident date cannot be in the future" })
      .transform((date) => new Date(`${date}T00:00:00.000Z`)),
    amountClaimed: z.number().positive(),
  })
  .describe("claimSchema to be used for validating incoming claims data");

export type ClaimRequest = z.infer<typeof claimSchema>;
