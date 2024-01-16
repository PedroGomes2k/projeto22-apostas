import { ApplicationError } from "@/protocols";

export function negativeValue(text?: string): ApplicationError {
  const message = text || "You can't pass a negative value!";
  return {
    name: "negativeValue",
    message,
  };
}
