import prisma from "../src/configs/database";

export async function cleanDB() {
  await prisma.bet.deleteMany();
  await prisma.game.deleteMany();
  await prisma.participant.deleteMany();
  
  

}
