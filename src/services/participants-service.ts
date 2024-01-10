import { participantRepository } from "../repositories/participants-repository";

async function postParticipant(name: string, balance: number) {
  const data = { name, balance };

  const response = await participantRepository.createParticipants(data);
  return response;
}

async function getParticipants() {
  const response = await participantRepository.getParticipants();

  return response;
}

export const partticipantsService = {
  postParticipant,
  getParticipants,
};
