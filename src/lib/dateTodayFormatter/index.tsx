export function today() {
  const dateNow = Date.now();
  const todayDate = new Date(dateNow);

  return todayDate.toLocaleDateString().toString();
}
