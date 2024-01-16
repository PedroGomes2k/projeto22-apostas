import prisma from "@/configs/database";
import { GameParameter } from "@/protocols";

async function createGame(data: GameParameter) {
  return prisma.game.create({
    data,
  });
}

async function createGameOver(
  id: number,
  homeTeamScore: number,
  awayTeamScore: number,
  isFinished: boolean
) {
  return prisma.game.update({
    where: { id },
    data: {
      homeTeamScore,
      awayTeamScore,
      isFinished,
    },
  });
}

async function getGames() {
  return prisma.game.findMany();
}

async function getGamesById(id: number) {
  return prisma.game.findUnique({
    where: { id },
  });
}

export const gamesRepository = {
  createGame,
  createGameOver,
  getGames,
  getGamesById,
};
