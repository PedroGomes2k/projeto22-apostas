import { balanceBelowAmount } from "@/errors/balance-below-amount-error";
import { gameWasFinished } from "@/errors/game-was-finished-error";
import { negativeValue } from "@/errors/negative-values-error";
import { notFoundError } from "@/errors/not-found-error-error";
import { BetParameter } from "@/protocols";
import {
  betRepository,
  gamesRepository,
  participantRepository,
} from "@/repositories";

async function postBet(data: BetParameter) {
  const { amountBet, participantId, gameId } = data;

  if (amountBet <= 0) throw negativeValue("You cant post a bet with a negative value");
  const verifyParticipant = await verifyParticipantById(
    participantId,
    amountBet
  );

  await verifyGame(gameId);

  const response = await betRepository.createBet(data);

  await updateValue(participantId, verifyParticipant.balance, amountBet);

  return response;
}

async function verifyParticipantById(id: number, amountBet: number) {
  const verifyParticipant = await participantRepository.getParticipantsById(id);
  if (!verifyParticipant) throw notFoundError();
  if (verifyParticipant.balance < amountBet) throw balanceBelowAmount();

  return verifyParticipant;
}

async function verifyGame(id: number) {
  const verifyGame = await gamesRepository.getGamesById(id);
  if (!verifyGame) throw notFoundError();
  if (verifyGame.isFinished === true)
    throw gameWasFinished("You can't post a new bet for a finished game");
}

async function updateValue(
  id: number,
  participantBalance: number,
  amountBet: number
) {
  const balance = participantBalance - amountBet;

  await participantRepository.updateValueParticipants(id, balance);
}

export const betService = {
  postBet,
};
