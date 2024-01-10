import prisma from "@/configs/database";

export async function createBet(gameId: number, participantId: number) {
  const data = {
    homeTeamScore: 1,
    awayTeamScore: 0,
    amountBet: 100,
    gameId,
    participantId,
  };
  return prisma.bet.create({
    data,
  });
}
