import { GameParameter } from "@/protocols";
import { gamesServices } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function postGames(req: Request, res: Response) {
  const { homeTeamName, awayTeamName } = req.body as GameParameter;

  await gamesServices.createGames(homeTeamName, awayTeamName);

  return res.sendStatus(httpStatus.CREATED);
}

export async function getGames(req: Request, res: Response) {
  const response = await gamesServices.getGames();

  return res.status(httpStatus.OK).send(response);
}

export async function getGamesById(req: Request, res: Response) {

  const {id} = req.params  
  
  const idInt = Number(id)

  const response = await gamesServices.getGamesById(idInt);

  return res.status(httpStatus.OK).send(response);
}
