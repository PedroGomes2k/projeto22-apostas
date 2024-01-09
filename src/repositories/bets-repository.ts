import prisma from "@/configs/database";
import { BetParameter } from "@/protocols";

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

export const betRepository = {
  createBet,
  getBetById,
};
