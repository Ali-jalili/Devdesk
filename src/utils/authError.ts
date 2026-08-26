/** @format */

export function getAuthErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return "Something went wrong. Please try again.";
  }

  const message = error.message.toLowerCase();

  if (
    message.includes("already registered") ||
    message.includes("already exists")
  ) {
    return "An account with this email already exists.";
  }

  if (
    message.includes("invalid login") ||
    message.includes("invalid credentials")
  ) {
    return "Email or password is incorrect.";
  }

  if (message.includes("password")) {
    return "Password does not meet the requirements.";
  }

  if (message.includes("network") || message.includes("fetch")) {
    return "Unable to connect. Please check your internet connection.";
  }

  return "Something went wrong. Please try again.";
}
