export async function fetchAudioAndSaveToStorage(
  audioUrl: string,
  storageKey: string,
) {
  if (localStorage.getItem(storageKey)) return;

  const response = await fetch(audioUrl);
  const audioBlob = await response.blob();

  const reader = new FileReader();
  reader.readAsDataURL(audioBlob);
  reader.onloadend = function () {
    const base64Audio = reader.result as string;
    const encodedKey = window.btoa(storageKey);
    localStorage.setItem(encodedKey, base64Audio);
  };
}

export function getAudioFromStorage(storageKey: string): string | null {
  const encodedKey = window.btoa(storageKey);
  const base64Audio = localStorage.getItem(encodedKey);
  return base64Audio;
}
