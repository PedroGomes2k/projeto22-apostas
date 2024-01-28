import { gameWasFinished } from "@/errors/game-was-finished-error";
import { negativeValue } from "@/errors/negative-values-error";
import { notFoundError } from "@/errors/not-found-error-error";
import { GameOverParameter } from "@/protocols";
import {
  betRepository,
  gamesRepository,
  participantRepository,
} from "@/repositories";


async function createGames(homeTeamName: string, awayTeamName: string) {
  const response = await gamesRepository.createGame({
    homeTeamName,
    awayTeamName,
  });
  return response;
}

async function createGameOver(id: number, data: GameOverParameter) {

  if (data.awayTeamScore < 0 || data.homeTeamScore < 0) throw negativeValue();
  const game = await getGamesById(id);

  if (game.isFinished === true) throw gameWasFinished();

  const gameOver = await gamesRepository.createGameOver(
    id,
    data.homeTeamScore,
    data.awayTeamScore,
    true
  );

  await betRepository.updateBetById(id);

  await updateBets(id, data);

  return gameOver;
}

async function getGames() {
  const response = await gamesRepository.getGames();

  return response;
}

async function getGamesById(id: number) {
  const gameById = await gamesRepository.getGamesById(id);

  if (!gameById) throw notFoundError();

  const betsByGameId = await betRepository.getBetById(id);
  if (!betsByGameId) throw notFoundError();

  const response = { ...gameById, bets: betsByGameId };
  return response;
}

async function updateBets(id: number, data: GameOverParameter) {
  
  const verifyScore = await verifyGameScore(id, data);
  const betsByGameId = await betRepository.getSumBetsById(id);

  verifyScore.resultsScore.forEach(async (n) => {
    const participantId = n.participantId;

    const amountWon = await sumAmountWon(
      n.amountBet,
      verifyScore.sumBetsWin._sum.amountBet,
      betsByGameId._sum.amountBet
    );
 

    betRepository.updateBetById(
      id,
      participantId,
      data.homeTeamScore,
      data.awayTeamScore,
      amountWon,
      "WON"
    );

    const balanceOfParticipant = await getBalanceParticpantById(participantId);

    await participantRepository.updateValueParticipants(
      participantId,
      amountWon + balanceOfParticipant
    );
  });
}

async function sumAmountWon(
  amountBet: number,
  sumBetsWins: number,
  allBetsGame: number
) {
  // this value is rate of bets house
  const rateBettingHouse = 1 - 0.3;

  const response = (amountBet / sumBetsWins) * allBetsGame * rateBettingHouse;

  return response;
}

async function verifyGameScore(id: number, data: GameOverParameter) {
  const verifyScore = await betRepository.getBetGameScore(id, data);
  if (!verifyScore) throw notFoundError();

  return verifyScore;
}

async function getBalanceParticpantById(id: number) {
  const balance = await participantRepository.getParticipantsById(id);
  return balance.balance;
}

export const gamesServices = {
  createGames,
  createGameOver,
  getGames,
  getGamesById,
};
