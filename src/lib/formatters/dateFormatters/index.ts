import { Languages } from "@ribon.io/shared/types";

export function stringToLocaleDateString(date: string) {
  return new Date(date).toLocaleDateString();
}

export function add30DaysAndFormatDate(date: string, currentLang: Languages): string {
  const originalDate = new Date(date);
  const newDate = new Date(originalDate);
  newDate.setDate(newDate.getDate() + 30);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  };

  return newDate.toLocaleDateString(currentLang, options);
}
