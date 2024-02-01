import { useEffect, useState } from "react";

const getReturnValues = (countDown: any) => {
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  const arr = [];
  if (hours > 0) arr.push(hours);
  arr.push(minutes);
  arr.push(seconds);

  return arr;
};

const useCountdown = (targetDate: any, callback?: any) => {
  const countDownDate = new Date(targetDate).getTime();
  const now = new Date().getTime();

  const [countDown, setCountDown] = useState(countDownDate - now);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  useEffect(() => {
    if (countDown < 0 && callback) {
      callback();
    }
  }, [countDown, callback]);

  return getReturnValues(countDown);
};

export { useCountdown };
