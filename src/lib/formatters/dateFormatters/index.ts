import { Languages } from "@ribon.io/shared/types";

export function stringToLocaleDateString(date: string) {
  return new Date(date).toLocaleDateString();
}

export function add30DaysAndFormatDate(date: string, currentLang: Languages): string {
  const originalDate = new Date(date);
  const newDate = new Date(originalDate);
  newDate.setDate(newDate.getDate() + 30);

  const day = String(newDate.getDate()).padStart(2, "0");
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const year = newDate.getFullYear();

  if (currentLang === Languages.PT) return `${day}/${month}/${year}`;
  return `${month}/${day}/${year}`;
}
