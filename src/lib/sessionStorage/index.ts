export function setSessionStorageItem(key: string, value: string): void {
  sessionStorage.setItem(key, value);
}

export function getSessionStorageItem(key: string): string | null {
  return sessionStorage.getItem(key);
}

export function removeSessionStorageItem(key: string) {
  sessionStorage.removeItem(key);
}

export function clearSessionStorage() {
  sessionStorage.clear();
}