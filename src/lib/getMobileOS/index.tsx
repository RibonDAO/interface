export const getMobileOS = () =>
  /android/i.test(window.navigator.userAgent) ? "android" : "ios";
