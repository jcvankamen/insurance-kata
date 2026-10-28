import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { claimSchema } from "./schemas/claim.schema";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/healthcheck", (_req, res) => {
  res.set("Cache-Control", "no-store"); // Prevent 304 and hard load
  res.status(200).json({ data: "claimsApi is running!" });
});

app.post("/api/claims", (req, res) => {
  const result = claimSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error });
  }

  res.set("Cache-Control", "no-store"); // Prevent 304 and hard load
  res.status(200).json({ data: req.body, result: "Data recieved!" });
});

// utilize config
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
  });
}

export default app;
