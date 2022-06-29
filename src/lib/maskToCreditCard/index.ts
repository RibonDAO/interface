export const maskToCreditCard = (number: string) =>
  number
    .replace(/[^0-9]/g, "")
    .replace(/\s?/g, "")
    .replace(/(\d{4})/g, "$1 ")
    .trim();
