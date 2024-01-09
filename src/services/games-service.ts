import { gameWasFinished } from "@/errors/game-was-finished-error";
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
  const verifyGameById = await getGamesById(id);
  if (!verifyGameById) throw notFoundError();
  if (verifyGameById.gameById.isFinished === true) throw gameWasFinished();

  const gameOver = await gamesRepository.createGameOver(id, data);

  await updateBets(id, data, gameOver.homeTeamScore, gameOver.awayTeamScore);
}

async function updateBets(
  id: number,
  data: GameOverParameter,
  homeTeamScore: number,
  awayTeamScore: number
) {
  const verifyScore = await betRepository.getBetGameScore(id, data);
  if (!verifyScore) throw notFoundError();

  const betsByGameId = await betRepository.getSumBetsById(id);

  await betRepository.updateBetById(id);

  const sumBetsWinners = verifyScore.resultsScore.map((n) => {
    const amountWon =
      (n.amountBet / verifyScore.sumBetsWin._sum.amountBet) *
      betsByGameId._sum.amountBet *
      0.7;

    for (let i = 0; i < verifyScore.resultsScore.length; i++) {
      const participantId = verifyScore.resultsScore.map(
        (i) => i.participantId
      );

      betRepository.updateBetById(
        id,
        participantId[i],
        homeTeamScore,
        awayTeamScore,
        amountWon,
        "WON"
      );

      participantRepository.updateValueParticipants(
        participantId[i],
        amountWon + n.amountBet
      );
    }
  });

  /* for(let i = 0; i < sumBetsWinners.length; i++){
    await betRepository.updateBetById(id, sumBetsWinners., "WON")
  }
*/

  //betRepository.updateBetById(id, , "WON")
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
  createGameOver,
  getGames,
  getGamesById,
};
