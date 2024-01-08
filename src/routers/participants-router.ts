import { getParticipants, postParticipant } from "@/controllers";
import { validateSchemaMiddleware } from "@/middlewares";
import { participantsSchema } from "@/schemas/participants-schema";
import { Router } from "express";

const participantsRouter = Router()
  .post("/", validateSchemaMiddleware(participantsSchema), postParticipant)
  .get("/", getParticipants);

export { participantsRouter };
