export function removeInsignificantZeros(price: string) {
  const lastThree = price.slice(price.length - 3);
  if (lastThree === ".00" || lastThree === ",00")
    return price.split(lastThree)[0];
  return price;
}

export function formatPrice(price: number, currency: string) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  const formattedPrice = formatter.format(price);
  return removeInsignificantZeros(formattedPrice);
}
