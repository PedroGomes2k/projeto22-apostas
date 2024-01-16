import { balanceBelowAmount } from "@/errors/balance-below-amount-error";
import { participantRepository } from "../repositories/participants-repository";
import { negativeValue } from "@/errors/negative-values-error";

async function postParticipant(name: string, balance: number) {
  if (balance < 10) throw negativeValue("You can't pass a value below a 10");

  const response = await participantRepository.createParticipants({
    name,
    balance,
  });
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
