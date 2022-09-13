export const maskToExpirationDate = (date: string) => {
  const v = date.replace(/\D/g, "").slice(0, 10);
  if (v.length >= 5) {
    return `${v.slice(0, 2)}/${v.slice(2, 6)}`;
  } else if (v.length >= 3) {
    return `${v.slice(0, 2)}/${v.slice(2)}`;
  }
  return v;
};
