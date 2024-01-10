import supertest from "supertest";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import { cleanDB } from "../helpers";
import app from "../../src/app";
import { createParticipant } from "../factory/participant-factory";

beforeAll(async () => {
  await cleanDB();
});

const server = supertest(app);

describe("POST /participants", () => {
  it("should respond with status 422 when body is not given", async () => {
    const response = await server.post("/participants");
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 when balance is below the base", async () => {
    const body = {
      name: faker.person.firstName(),
      balance: 9,
    };

    const response = await server.post("/participants").send(body);
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 201 when body is valid", async () => {
    const body = {
      name: faker.person.firstName(),
      balance: 150,
    };

    const response = await server.post("/participants").send(body);
    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        name: expect.any(String),
        balance: expect.any(Number),
      })
    );
  });
});

describe("GET /participants", () => {
  it("should respond with status 200", async () => {
    await createParticipant();

    const response = await server.get("/participants");
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          name: expect.any(String),
          balance: expect.any(Number),
        },
      ])
    );
  });
});
