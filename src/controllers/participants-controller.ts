import { ParticipantsParamter } from "@/protocols";
import { partticipantsService } from "../services";
import { Request, Response} from "express";
import httpStatus from "http-status";

export async function postParticipant(req: Request, res: Response) {
  const { name, balance } = req.body as ParticipantsParamter;

  const response = await partticipantsService.postParticipant(name, balance);

  return res.status(httpStatus.CREATED).send(response);
}

export async function getParticipants(req: Request, res: Response) {
  const response = await partticipantsService.getParticipants();

  return res.status(httpStatus.OK).send(response);
}
