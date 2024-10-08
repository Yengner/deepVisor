import { CredentialsSignin } from "next-auth";

class InvalidCredentialsError extends CredentialsSignin {
  code = "Invalid credentials provided";

  constructor() {
    super();
  }
}

class UserNotFoundError extends CredentialsSignin {
  code = "User not found";

  constructor() {
    super();
  }
}

class IncorrectPasswordError extends CredentialsSignin {
  code = "Incorrect Password";

  constructor() {
    super();
  }
}

export { InvalidCredentialsError, UserNotFoundError, IncorrectPasswordError }