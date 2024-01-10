import prisma from "@/configs/database";
import { faker } from "@faker-js/faker";

export async function createParticipant() {
  const data = {
    name: faker.person.firstName(),
    balance: 100,
  };

  return prisma.participant.create({
    data,
  });
}
