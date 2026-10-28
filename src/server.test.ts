import { afterEach, describe, it, expect, vi } from "vitest";
import request from "supertest";
import app from "./server";
import { claimSchema } from "./schemas/claim.schema";

afterEach(() => {
  vi.restoreAllMocks();
});

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
  it("should return 200 when mocked validation succeeds", async () => {
    const body = { test: "claim" };
    const result = claimSchema.safeParse({
      policyId: "123456",
      incidentType: "Accident",
      incidentDate: "2023-01-01",
      amountClaimed: 1000,
    });
    if (!result.success) throw new Error("Expected test claim to be valid");

    const safeParse = vi
      .spyOn(claimSchema, "safeParse")
      .mockReturnValue(result);

    const response = await request(app).post("/api/claims").send(body);

    expect(safeParse).toHaveBeenCalledWith(body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: body,
      result: "Data recieved!",
    });
  });

  it("should return 400 when mocked validation fails", async () => {
    const body = { test: "claim" };
    const result = claimSchema.safeParse({});
    if (result.success) throw new Error("Expected empty claim to be invalid");

    const safeParse = vi
      .spyOn(claimSchema, "safeParse")
      .mockReturnValue(result);

    const response = await request(app).post("/api/claims").send(body);

    expect(safeParse).toHaveBeenCalledWith(body);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });

  it("should return 200 with valid requests - integrate zod", async () => {
    const validClaim = {
      policyId: "123456",
      incidentType: "Accident",
      incidentDate: "2023-01-01",
      amountClaimed: 1000,
    };
    //acts as component integration testing
    const response = await request(app)
      .post("/api/claims")
      .send(validClaim)
      .expect("Content-Type", /json/);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: validClaim,
      result: "Data recieved!",
    });
  });

  it("should return 400 with when invalid data is sent - integrate zod", async () => {
    //acts as component integration testing
    const response = await request(app)
      .post("/api/claims")
      .send({ payload: "Test claim" })
      .expect("Content-Type", /json/);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });
});
