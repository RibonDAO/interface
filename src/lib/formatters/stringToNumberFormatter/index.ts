export function stringToNumber(value: string, localeString = "en-US"): number {
  if (localeString === "en-US") {
    return parseFloat(value.replace(/,/g, ""));
  }

  return parseFloat(value.replace(/\./g, "").replace(",", "."));
}
