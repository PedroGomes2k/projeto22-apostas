import prisma from "@/configs/database";
import { GameOverParameter, GameParameter } from "@/protocols";

async function createGame(data: GameParameter) {
  return prisma.game.create({
    data,
  });
}

async function createGameOver(id: number, data: GameOverParameter) {
  return prisma.game.update({
    where: { id },
    data,
  });
}

async function getGames() {
  return prisma.game.findMany();
}

async function getGamesById(id: number) {
  return prisma.game.findFirst({
    where: { id },
  });
}


export const gamesRepository = {
  createGame,
  createGameOver,
  getGames,
  getGamesById,

};
