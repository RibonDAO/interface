import { logFirebaseEvent } from "services/analytics";

interface EventParams {
  [key: string]: string | number | undefined;
}

export function logEvent(name: string, params?: EventParams) {
  logFirebaseEvent(name, params);
}
