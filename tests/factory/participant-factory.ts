import prisma from "@/configs/database";
import { faker } from "@faker-js/faker";
import { number } from "joi";

export async function createParticipant() {
  const data = {
    name: faker.person.firstName(),
    balance: 1000,
  };

  return prisma.participant.create({
    data,
  });
}

export async function getParticipantsById(id: number) {
  return prisma.participant.findUnique({
    where: { id },
  });
}

export async function updateBet(id: number, balance: number) {
  return prisma.participant.update({
    where: { id },
    data: {
      balance,
    },
  });
}
