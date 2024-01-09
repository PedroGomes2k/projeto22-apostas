import { ApplicationError } from "@/protocols";

export function gameWasFinished(text?: string): ApplicationError {
  const message = text || "You can't change a game was finished";
  return {
    name: "gameWasFinished",
    message,
  };
}
