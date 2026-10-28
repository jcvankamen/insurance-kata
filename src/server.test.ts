import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "./server";
import { ClaimRequest } from "./schemas/claim.schema";

describe("Startup Test", () => {
  it("should always pass, test configuration setup", () => {
    expect(true).toBe(true);
  });
});

describe("Server 404", () => {
  it("should return a 404 status and error message for non-existent endpoints", async () => {
    const response = await request(app).get("/does-not-exist");
    expect(response.status).toBe(404);
  });
});

describe("Get Healthcheck", () => {
  it("should return 200 status and data on success", async () => {
    const response = await request(app)
      .get("/api/healthcheck")
      .expect("Content-Type", /json/);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: "claimsApi is running!",
    });
  });
});

describe("Post Claims", () => {
  it("should return 200 with valid requests", async () => {
    const validClaim: ClaimRequest = {
      policyId: "123456",
      incidentType: "Accident",
      incidentDate: new Date("2023-01-01"),
      amountClaimed: 1000,
    };

    const response = await request(app)
      .post("/api/claims")
      .send(validClaim)
      .expect("Content-Type", /json/);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: { payload: "Test claim" },
      result: "Data recieved!",
    });
  });

  it("should return 400 with when invalid data is sent", async () => {
    const response = await request(app)
      .post("/api/claims")
      .send({ payload: "Test claim" })
      .expect("Content-Type", /json/);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });
});
