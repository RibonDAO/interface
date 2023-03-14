import { languageByCoin } from "lib/languageByCoin";

export function removeInsignificantZeros(price: string) {
  const lastThree = price.slice(price.length - 3);
  if (lastThree === ".00" || lastThree === ",00")
    return price.split(lastThree)[0];
  return price;
}

export function formatPrice(price: number, currency: string) {
  const formatter = new Intl.NumberFormat(languageByCoin(currency), {
    style: "currency",
    currency,
  });
  const formattedPrice = formatter.format(price);
  return removeInsignificantZeros(formattedPrice);
}

export function formatPriceWithZeros(
  price: number,
  currency: string,
  locale: string,
) {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  });
  return formatter.format(price);
}
