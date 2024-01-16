import supertest from "supertest";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import { cleanDB } from "../helpers";
import app from "@/app";
import { createGame, gameOverFinish } from "../factory/game-factory";
import {
  createParticipant,
  getParticipantsById,
} from "../factory/participant-factory";
import { error } from "console";

beforeAll(async () => {
  await cleanDB();
});

const server = supertest(app);

describe("POST /bets", () => {
  it("should respond with status 422 when body isn't give", async () => {
    const response = await server.post("/bets");
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 when body give dont have all information", async () => {
    const body = {
      homeTeamScore: 0,
      awayTeamScore: 0,
      amountBet: 20,
    };
    const response = await server.post("/bets").send(body);
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  describe("when body is valid", () => {
    it("should respond with status 404 when game id dont exist", async () => {
      const body = {
        homeTeamScore: 0,
        awayTeamScore: 0,
        amountBet: 20,
        gameId: 0,
        participantId: 0,
      };
      const response = await server.post("/bets").send(body);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 404 when participant id dont exist", async () => {
      const gameId = await createGame();

      const body = {
        homeTeamScore: 0,
        awayTeamScore: 0,
        amountBet: 20,
        gameId: gameId.id,
        participantId: -1,
      };
      const response = await server.post("/bets").send(body);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 409 when amount bet is below the balance", async () => {
      const gameId = await createGame();
      const participant = await createParticipant();
      const body = {
        homeTeamScore: 0,
        awayTeamScore: 0,
        amountBet: 2000,
        gameId: gameId.id,
        participantId: participant.id,
      };
      const response = await server.post("/bets").send(body);
      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it("should respond with status 409 when you try post a negative value on bet or a bet equal 0", async () => {
      const gameId = await createGame();
      const participant = await createParticipant();
      const body = {
        homeTeamScore: 0,
        awayTeamScore: 0,
        amountBet: 0,
        gameId: gameId.id,
        participantId: participant.id,
      };
      const response = await server.post("/bets").send(body);
      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it("should respond with status 409 when bet for a finished game", async () => {
      const gameId = await createGame();
      const participant = await createParticipant();
      const body = {
        homeTeamScore: 0,
        awayTeamScore: 0,
        amountBet: 100,
        gameId: gameId.id,
        participantId: participant.id,
      };
      const data = {
        awayTeamScore: body.awayTeamScore,
        homeTeamScore: body.homeTeamScore,
      };

      await gameOverFinish(
        gameId.id,
        data.awayTeamScore,
        data.homeTeamScore,
        true
      );

      const response = await server.post("/bets").send(body);
      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it("should respond with status 201", async () => {
      const gameId = await createGame();
      const participant = await createParticipant();
      const body = {
        homeTeamScore: 0,
        awayTeamScore: 0,
        amountBet: 100,
        gameId: gameId.id,
        participantId: participant.id,
      };

      const response = await server.post("/bets").send(body);
      const verifyBalance = await getParticipantsById(participant.id);
     
      if(verifyBalance.balance  > participant.balance) throw error()


      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual(
        expect.objectContaining({
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
        })
      );
    });
  });
});
