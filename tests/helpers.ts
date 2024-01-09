import prisma from "@/configs/database";

export async function cleanDB() {
  await prisma.participant.deleteMany();
  await prisma.bet.deleteMany();
  await prisma.game.deleteMany();
}
