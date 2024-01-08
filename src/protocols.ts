import { Participant, Game } from "@prisma/client";

export type ParticipantsSchema = Omit<
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
