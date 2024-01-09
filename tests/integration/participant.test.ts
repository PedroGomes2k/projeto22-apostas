import supertest from "supertest";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import { cleanDB } from "../helpers";
import app from "@/app";

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


    it('should res', async () => {

        const response = await server.post("/participants")
        expect(response.status).toBe(httpStatus.)
    })  
});

/*
it('', async () => {

    const response = await server.post("/participants").send()
    expect(response.status).toBe(httpStatus.)
})
*/
