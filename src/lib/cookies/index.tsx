import Cookies from "universal-cookie";

export const cookies = new Cookies();

export function setCookiesItem(key: string, value: string): void {
  cookies.set(key, value, {
    secure: true,
    sameSite: "strict",
  });
}

export function getCookiesItem(key: string): string | null {
  return cookies.get(key) || null;
}

export function removeCookiesItem(key: string) {
  cookies.remove(key, {
    secure: true,
    sameSite: "strict",
  });
}
