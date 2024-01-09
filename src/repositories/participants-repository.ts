import prisma from "@/configs/database";
import { ParticipantsParamter } from "@/protocols";

async function createParticipants(data: ParticipantsParamter) {
  return prisma.participant.create({
    data,
  });
}

async function getParticipants() {
  return prisma.participant.findMany();
}

async function getParticipantsById(id: number) {
  return prisma.participant.findFirst({
    where: { id },
  });
}

async function updateValueParticipants(id: number,balance: number) {
  return prisma.participant.update({
    where: { id },
    data: { balance },
  });
}

export const participantRepository = {
  createParticipants,
  getParticipants,
  getParticipantsById,
  updateValueParticipants
};
