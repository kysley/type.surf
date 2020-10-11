export function isAcceptedInput(e: KeyboardEvent) {
  const c = e.keyCode;

  // space || backspace
  if (c === 32 || c === 8) {
    return true;
  }

  if (
    !(c > 47 && c < 58) && // numeric (0-9)
    !(c > 64 && c < 91) && // upper alpha (A-Z)
    !(c > 96 && c < 123) // lower alpha (a-z)
  ) {
    return false;
  }

  return true;
}
