import { balanceBelowAmount } from "@/errors/balance-below-amount-error";
import { notFoundError } from "@/errors/not-found-error-error";
import { BetParameter } from "@/protocols";
import {
  betRepository,
  gamesRepository,
  participantRepository,
} from "@/repositories";

async function postBet(data: BetParameter) {
  const verifyParticipant = await participantRepository.getParticipantsById(
    data.participantId
  );

  if (!verifyParticipant) throw notFoundError();
  if (verifyParticipant.balance < data.amountBet) throw balanceBelowAmount();

  const verifyGame = await gamesRepository.getGamesById(data.gameId);
  if (!verifyGame) throw notFoundError();

  const response = await betRepository.createBet(data);

  const balance = verifyParticipant.balance - data.amountBet;

  await updateBet(verifyParticipant.id, balance);

  return response;
}

async function updateBet(id: number, balance: number) {
  
  await participantRepository.updateValeuParticipants(id, balance);
}

export const betService = {
  postBet,
};
