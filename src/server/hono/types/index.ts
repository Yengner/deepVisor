import { User } from "next-auth"

export type SessionVars = {
  user: User;
}