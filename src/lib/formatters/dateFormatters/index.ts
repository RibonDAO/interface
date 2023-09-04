import { Languages } from "@ribon.io/shared/types";

export function stringToLocaleDateString(date: string) {
  return new Date(date).toLocaleDateString();
}

export function add30DaysAndFormatDate(
  date: string,
  currentLang: Languages,
): string {
  const originalDate = new Date(date);
  const newDate = new Date(originalDate);
  newDate.setDate(newDate.getDate() + 30);

  return newDate.toLocaleDateString(currentLang);
}
