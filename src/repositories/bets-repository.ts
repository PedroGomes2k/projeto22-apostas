import prisma from "@/configs/database";
import {
  BetParameter,
  DataUpdateParameter,
  GameOverParameter,
  WhereUpdateParameter,
} from "@/protocols";

async function createBet(data: BetParameter) {
  return prisma.bet.create({
    data,
  });
}

async function getBetById(id: number) {
  return prisma.bet.findMany({
    where: { gameId: id },
  });
}

async function getSumBetsById(id: number) {
  return prisma.bet.aggregate({
    where: { gameId: id },
    _sum: {
      amountBet: true,
    },
  });
}

async function updateBetById(
  gameId: number,
  participantId?: number,
  homeTeamScore?: number,
  awayTeamScore?: number,
  amount?: number,
  statusPass?: string
) {
  const status = statusPass || "LOST";
  const amountWon = amount || 0;

  return prisma.bet.updateMany({
    where: { gameId, participantId, homeTeamScore, awayTeamScore },
    data: { amountWon, status },
  });
}

async function getBetGameScore(id: number, data: GameOverParameter) {
  const resultsScore = await prisma.bet.findMany({
    where: {
      gameId: id,
      homeTeamScore: data.homeTeamScore,
      awayTeamScore: data.awayTeamScore,
    },
  });

  const sumBetsWin = await prisma.bet.aggregate({
    where: {
      gameId: id,
      homeTeamScore: data.homeTeamScore,
      awayTeamScore: data.awayTeamScore,
    },
    _sum: {
      amountBet: true,
    },
  });

  return { resultsScore, sumBetsWin };
}

export const betRepository = {
  createBet,
  getBetById,
  updateBetById,
  getBetGameScore,
  getSumBetsById,
};
