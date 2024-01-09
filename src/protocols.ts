import { Participant, Game } from "@prisma/client";

export type ParticipantsParamter = Omit<
  Participant,
  "id" | "createdAt" | "updatedAt"
>;

export type GameParameter = {
  homeTeamName: string;
  awayTeamName: string;
};

export type ApplicationError = {
  name: string;
  message: string;
};

export type BetParameter = {
  homeTeamScore: number;
  awayTeamScore: number;
  amountBet: number;
  gameId: number;
  participantId: number;
};

export type AppError = Error & {
  name: string;
  message: string;
};