import { BetParameter } from "@/protocols";
import Joi from "joi";

export const betSchema = Joi.object<BetParameter>({
  homeTeamScore: Joi.number().required(),
  awayTeamScore: Joi.number().required(),
  amountBet: Joi.number().required(),
  gameId: Joi.number().required(),
  participantId: Joi.number().required(),
});
