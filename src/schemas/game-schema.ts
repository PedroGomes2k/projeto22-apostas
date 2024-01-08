import { GameParameter } from "@/protocols";
import Joi from "joi";

export const GameSchema = Joi.object<GameParameter>({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});
