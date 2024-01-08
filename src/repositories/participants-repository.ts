import prisma from "@/configs/database";
import { ParticipantsSchema } from "@/protocols";

async function createParticipants(data: ParticipantsSchema) {
  return prisma.participant.create({
    data,
  });
}

async function getParticipants() {
  return prisma.participant.findMany();
}

export const participantRepository = {
  createParticipants,
  getParticipants,
};
