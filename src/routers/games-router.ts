import { getGames, getGamesById, postGameOver, postGames } from "@/controllers";
import { validateSchemaMiddleware } from "@/middlewares";
import { GameSchema, gameOverSchema } from "@/schemas/game-schema";
import { Router } from "express";

const gamesRouter = Router()
  .post("/", validateSchemaMiddleware(GameSchema), postGames)
  .post("/:id/finish", validateSchemaMiddleware(gameOverSchema), postGameOver)
  .get("/", getGames)
  .get("/:id", getGamesById);

export { gamesRouter };
