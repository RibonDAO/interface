export default function extractUrlValue(
  key: string,
  url: string,
): string | undefined {
  const match = url.match(`[?&]${key}=([^&]+)`);
  const value = match && match[1];
  return value || undefined;
}
