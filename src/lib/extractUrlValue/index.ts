export default function extractUrlValue(
  key: string,
  url: string,
): string | undefined {
  // the url is something like this ?redirect_to=/something
  // this match will try to split into ?redirect_to= and /something
  const match = url.match(`[?&]${key}=([^&]+)`);
  const value = match && match[1];
  return value || undefined;
}
