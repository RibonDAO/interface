import { DEBUG_EVENTS_ENABLED } from "utils/constants";

export const LOGO_CLICKED_KEY = "LOGO_CLICKED_KEY";

export const debugEnabled = () => {
  const value = localStorage.getItem(LOGO_CLICKED_KEY);

  return !!(value && Number(value) > 15) && DEBUG_EVENTS_ENABLED;
};

export const incrementLocalStorageValue = () => {
  const key = LOGO_CLICKED_KEY;
  let value = Number(localStorage.getItem(key));

  if (value) {
    value = Number(value) + 1;
  } else {
    value = 1;
  }

  localStorage.setItem(key, value.toString());
};
