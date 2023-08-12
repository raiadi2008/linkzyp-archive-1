export default function isValid(variable: any): boolean {
  if (variable === null) {
    return true
  }

  if (Array.isArray(variable) && variable.length === 0) {
    return true
  }

  if (
    Array.isArray(variable) &&
    variable.every((item) => typeof item === "string" && item.length >= 1)
  ) {
    return true
  }

  return false
}
