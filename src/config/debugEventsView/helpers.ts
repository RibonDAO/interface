export const LOGO_CLICKED_KEY = "LOGO_CLICKED_KEY";

export const isLogoClickedValueGreaterThan15 = () => {
  const key = LOGO_CLICKED_KEY;

  // Retrieve the value from local storage
  const value = localStorage.getItem(key);

  // Check if the value exists and is greater than 15
  return !!(value && Number(value) > 15);
};

export const incrementLocalStorageValue = () => {
  const key = LOGO_CLICKED_KEY;

  // Retrieve the current value from local storage
  let value = Number(localStorage.getItem(key));

  // Check if the value exists
  if (value) {
    // Convert the value to a number and increment it by one
    value = Number(value) + 1;
  } else {
    // If the value doesn't exist, set it to 1
    value = 1;
  }

  // Store the updated value in local storage
  localStorage.setItem(key, value.toString());
};
