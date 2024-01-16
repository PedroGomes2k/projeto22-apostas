import prisma from "@/configs/database";
import { createGame } from "./game-factory";
import {
  createParticipant,
  getParticipantsById,
  updateBet,
} from "./participant-factory";

export async function createBet(
  gameId: number,
  participantId: number,
  score?: number
) {
  const homeTeamScore = score || 1;

  const data = {
    homeTeamScore,
    awayTeamScore: 0,
    amountBet: 500,
    gameId,
    participantId,
  };

  return prisma.bet.create({
    data,
  });
}

export async function generateBetsForGame() {
  const gameId = await createGame();
  const participant1 = await createParticipant();
  const participant2 = await createParticipant();

  const bet = await createBet(gameId.id, participant1.id);

  await createBet(gameId.id, participant2.id, 2);
  await updateBet(participant1.id, participant1.balance - bet.amountBet);

  return {
    partcipantId: participant1.id,
    participantBalance: participant1.balance,
    gameId: gameId.id,
  };
}

export async function updateBetsWin(
  gameId: number,
  participantId: number,
  participantBalance: number
) {
  await updateBetsWinById(gameId, participantId, 1, 0, 350, "WON");
  await updateBet(participantId, participantBalance + 350);
}

export async function updateBetsWinById(
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
