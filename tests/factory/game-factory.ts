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

export async function gameOverFinish(id: number, data: GameOverParameter) {
  return prisma.game.update({
    where: { id },
    data,
  });
}
