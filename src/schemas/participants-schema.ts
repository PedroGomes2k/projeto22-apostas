import Joi from "joi";
import { ParticipantsSchema } from "@/protocols";

export const participantsSchema = Joi.object<ParticipantsSchema>({
  name: Joi.string().required(),
  balance: Joi.number().min(10).required(),
});
