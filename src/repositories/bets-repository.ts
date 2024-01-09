import prisma from "@/configs/database";
import { BetParameter, GameOverParameter } from "@/protocols";

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
  amountPass?: number,
  statusPass?: string
) {
  const status = statusPass || "LOST";
  const amountWon = amountPass || 0;

  return prisma.bet.updateMany({
    where: { gameId, participantId, homeTeamScore, awayTeamScore },
    data: {
      amountWon,
      status,
    },
  });
}

async function getBetGameScore(
  id: number,
  data: Omit<GameOverParameter, "isFinished">
) {
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
