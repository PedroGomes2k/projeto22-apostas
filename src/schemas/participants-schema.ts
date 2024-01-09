import Joi from "joi";
import { ParticipantsParamter } from "@/protocols";

export const participantsSchema = Joi.object<ParticipantsParamter>({
  name: Joi.string().required(),
  balance: Joi.number().min(10).required(),
});
