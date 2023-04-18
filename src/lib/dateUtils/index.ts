export function nextDay() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}

export const beginningOfToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const beginningOfThisMonth = () => {
  const today = new Date();
  today.setDate(1);
  today.setHours(0, 0, 0, 0);
  return today;
};

export function nextMonth() {
  const nextMonthDate = new Date();
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
  nextMonthDate.setHours(0, 0, 0, 0);
  return nextMonthDate;
}
