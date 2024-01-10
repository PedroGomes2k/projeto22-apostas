import supertest from "supertest";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import { cleanDB } from "../helpers";
import app from "@/app";

beforeAll(async () => {
  await cleanDB();
});

const server = supertest(app);

describe("POST /games", () =>{

  it("should respond with status 422 when body isn't give", async () => {
      
    const response = await server.post("/games");
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  })

  it("should respond with status 422 when information body is missing ", async () => {
      
    const response = await server.post("/games");
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  })

  it("should respond with status 200", async () => {
      
    const response = await server.post("/games");
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  })
  

})

/*
 it("should respond with status 422 when body isn't give", async () => {
      

    const response = await server.post("/games").send(body);
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  })


*/
