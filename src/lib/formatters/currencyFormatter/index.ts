export function removeInsignificantZeros(price: string) {
  const lastThree = price.slice(price.length - 3);
  if (lastThree === ".00" || lastThree === ",00")
    return price.split(lastThree)[0];
  return price;
}
