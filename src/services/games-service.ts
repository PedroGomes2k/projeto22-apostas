import { notFoundError } from "@/errors/not-found-error-error";
import { betRepository, gamesRepository } from "@/repositories";
import { response } from "express";

async function createGames(homeTeamName: string, awayTeamName: string) {
  const response = await gamesRepository.createGame({
    homeTeamName,
    awayTeamName,
  });
  return response;
}

async function getGames() {
  const response = await gamesRepository.getGames();

  return response;
}

async function getGamesById(id: number) {

  const gameById = await gamesRepository.getGamesById(id);
 
  if (!gameById || gameById === null) throw notFoundError();
 

  const betsByGameId = await betRepository.getBetById(id);
  if (!betsByGameId) throw notFoundError();

  return { gameById, bets: betsByGameId };
}

export const gamesServices = {
  createGames,
  getGames,
  getGamesById,
};
