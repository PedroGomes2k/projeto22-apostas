import { ParticipantsSchema } from "@/protocols";
import { partticipantsService } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function postParticipant(req: Request, res: Response) {
  const { name, balance } = req.body as ParticipantsSchema;

  await partticipantsService.postParticipant(name, balance);

  return res.sendStatus(httpStatus.CREATED);
}

export async function getParticipants(req: Request, res: Response) {
    
  const response = await partticipantsService.getParticipants();

  return res.status(httpStatus.OK).send(response);
}
