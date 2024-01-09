import supertest from "supertest";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import { cleanDB } from "../helpers";
import app from "@/app";

beforeAll(async () => {
  await cleanDB();
});

const server = supertest(app);
