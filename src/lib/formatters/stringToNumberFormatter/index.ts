export function stringToNumber(value: string, localeString = "en"): number {
  if (localeString === "en") {
    return parseFloat(value.replace(/,/g, ""));
  }

  return parseFloat(value.replace(/\./g, "").replace(",", "."));
}
