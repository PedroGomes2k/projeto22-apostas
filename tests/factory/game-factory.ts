import prisma from "@/configs/database";
import { GameOverParameter } from "@/protocols";
import { faker } from "@faker-js/faker";

export async function createGame() {
  const data = {
    homeTeamName: faker.company.name(),
    awayTeamName: faker.company.name(),
  };

  return prisma.game.create({
    data,
  });
}

export async function gameOverFinish(
  id: number,
  homeTeamScore: number,
  awayTeamScore: number,
  isFinished: boolean
) {
  return prisma.game.update({
    where: { id },
    data: {
      homeTeamScore,
      awayTeamScore,
      isFinished,
    },
  });
}
