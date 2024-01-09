import { postBet } from "@/controllers";
import { validateSchemaMiddleware } from "@/middlewares";
import { betSchema } from "@/schemas/bet-schema";
import { Router } from "express";

export const betsRouter = Router().post(
  "/",
  validateSchemaMiddleware(betSchema),
  postBet
);

export default { betsRouter };
