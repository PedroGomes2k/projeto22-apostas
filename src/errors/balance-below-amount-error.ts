import { ApplicationError } from "@/protocols";

export function balanceBelowAmount(): ApplicationError {
  return {
    name: "balanceBelowAmount",
    message: "Your balance is below value you bet!",
  };
}
