import supertest from "supertest";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import { cleanDB } from "../helpers";
import app from "@/app";
import {
  createBet,
  createParticipant,
  createGame,
  gameOverFinish,
  getParticipantsById,
  updateBet,
  generateBetsForGame,
  updateBetsWin,
} from "../factory";
import { error } from "console";

beforeAll(async () => {
  await cleanDB();
});

const server = supertest(app);

describe("POST /games", () => {
  it("should respond with status 422 when body isn't gived", async () => {
    const response = await server.post("/games");
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 when information body is missing ", async () => {
    const body = {
      homeTeamName: "Real",
      awayTeamName: "",
    };

    const response = await server.post("/games").send(body);
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 201", async () => {
    const body = {
      homeTeamName: "Real",
      awayTeamName: "AtleticMadri",
    };

    const response = await server.post("/games").send(body);
    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        homeTeamName: expect.any(String),
        awayTeamName: expect.any(String),
        homeTeamScore: expect.any(Number),
        awayTeamScore: expect.any(Number),
        isFinished: false,
      })
    );
  });
});

describe("GET /games", () => {
  it("should respond with status 200", async () => {
    await createGame();

    const response = await server.get("/games");
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          homeTeamName: expect.any(String),
          awayTeamName: expect.any(String),
          homeTeamScore: expect.any(Number),
          awayTeamScore: expect.any(Number),
          isFinished: expect.any(Boolean),
        },
      ])
    );
  });
});

describe("GET /games/:id", () => {
  it("should respond with status 500 when params gived is wrong", async () => {
    const response = await server.get("/games/asd");
    expect(response.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
  });

  it("should respond with status 404 when params don't exist", async () => {
    const response = await server.get("/games/-1");
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with 200", async () => {
    const gameId = await createGame();
    const participantId = await createParticipant();
    await createBet(gameId.id, participantId.id);

    const response = await server.get(`/games/${gameId.id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        homeTeamName: expect.any(String),
        awayTeamName: expect.any(String),
        homeTeamScore: expect.any(Number),
        awayTeamScore: expect.any(Number),
        isFinished: expect.any(Boolean),
        bets: expect.arrayContaining([
          {
            id: expect.any(Number),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            homeTeamScore: expect.any(Number),
            awayTeamScore: expect.any(Number),
            amountBet: expect.any(Number),
            gameId: expect.any(Number),
            participantId: expect.any(Number),
            status: expect.any(String),
            amountWon: null,
          },
        ]),
      })
    );
  });
});

describe("POST /games/:id/finish", () => {
 
  it("should respond with status 404 when params don't exist", async () => {
    const response = await server.get("/games/-1/finish");
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 422 when body isn't gived", async () => {
    const gameId = await createGame();
    const response = await server.post(`/games/${gameId.id}/finish`);
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 when information body is missing ", async () => {
    const gameId = await createGame();

    const body = {
      homeTeamScore: 0,
      awayTeamScore: "",
    };

    const response = await server.post(`/games/${gameId.id}/finish`).send(body);
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 409 when valeu of body is negative ", async () => {
    const gameId = await createGame();

    const body = {
      homeTeamScore: 0,
      awayTeamScore: -1,
    };

    const response = await server.post(`/games/${gameId.id}/finish`).send(body);
    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it("should respond with status 409 when game was finished ", async () => {
    const gameId = await createGame();

    const body = {
      homeTeamScore: 0,
      awayTeamScore: 0,
    };
    await gameOverFinish(
      gameId.id,
      body.homeTeamScore,
      body.awayTeamScore,
      true
    );
    const response = await server.post(`/games/${gameId.id}/finish`).send(body);
    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it("should respond with status 200, verify the router is work ", async () => {
    const gameId = await createGame();

    const body = {
      homeTeamScore: 0,
      awayTeamScore: 0,
    };

    const response = await server.post(`/games/${gameId.id}/finish`).send(body);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        homeTeamName: expect.any(String),
        awayTeamName: expect.any(String),
        homeTeamScore: expect.any(Number),
        awayTeamScore: expect.any(Number),
        isFinished: true,
      })
    );
  });

  it("should respond with status 200, verify if balance of participant change ", async () => {
    const { partcipantId, participantBalance, gameId } =
      await generateBetsForGame();

    const body = {
      homeTeamScore: 1,
      awayTeamScore: 0,
    };

    const response = await server.post(`/games/${gameId}/finish`).send(body);

    await updateBetsWin(gameId, partcipantId, participantBalance);
    
    const balance = await getParticipantsById(partcipantId);
    
    if (balance.balance < participantBalance) throw error();

    expect(response.status).toBe(httpStatus.CREATED);
  }, 10000);
});
