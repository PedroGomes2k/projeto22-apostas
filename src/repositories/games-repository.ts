import prisma from "@/configs/database";
import { GameParameter } from "@/protocols";

async function createGame(data: GameParameter) {
  return prisma.game.create({
    data,
  });
}

async function getGames() {
  return prisma.game.findMany();
}

async function getGamesById(id: number) {
  return prisma.game.findFirst({
    where:{id}
  })
}

export const gamesRepository = {
  createGame,
  getGames,
  getGamesById
};
