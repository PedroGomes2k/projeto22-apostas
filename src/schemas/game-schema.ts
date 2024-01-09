import { GameOverParameter, GameParameter } from "@/protocols";
import Joi from "joi";

export const GameSchema = Joi.object<GameParameter>({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});

export const gameOverSchema = Joi.object<GameOverParameter>({
  homeTeamScore: Joi.number().required(),
  awayTeamScore: Joi.number().required(),
  isFinished: Joi.boolean().valid(true).required(),
});
