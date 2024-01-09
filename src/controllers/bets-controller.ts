import { BetParameter } from "@/protocols";
import { betService } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function postBet(req: Request, res: Response) {
  const { homeTeamScore, awayTeamScore, amountBet, gameId, participantId } =
    req.body as BetParameter;

  const response = await betService.postBet({
    homeTeamScore,
    awayTeamScore,
    amountBet,
    gameId,
    participantId,
  });

  console.log(response)

  return res.status(httpStatus.CREATED).send(response);
}
