import { getGames, getGamesById, postGames } from "@/controllers";
import { validateSchemaMiddleware } from "@/middlewares";
import { GameSchema } from "@/schemas/game-schema";
import { Router } from "express";

const gamesRouter = Router()
  .post("/", validateSchemaMiddleware(GameSchema), postGames)
  .post("/:id/finish", validateSchemaMiddleware(GameSchema))
  .get("/", getGames)
  .get("/:id", getGamesById);

export { gamesRouter };
