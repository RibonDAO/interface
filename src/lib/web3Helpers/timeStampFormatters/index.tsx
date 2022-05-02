export function formatDate(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString().toString();
}
