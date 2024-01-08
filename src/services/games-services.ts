import { notFoundError } from "@/errors/not-found-error-error";
import { gamesRepository } from "@/repositories";

async function createGames(homeTeamName: string, awayTeamName: string) {
  await gamesRepository.createGame({ homeTeamName, awayTeamName });
}

async function getGames() {
  const response = await gamesRepository.getGames();

  return response;
}

async function getGamesById(id: number) {
  const response = await gamesRepository.getGamesById(id);
  if (!response) throw notFoundError();

  return response;
} 

export const gamesServices = {
  createGames,
  getGames,
  getGamesById,
};
