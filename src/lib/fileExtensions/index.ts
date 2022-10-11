export function getFileExtension(filename: string) {
  return filename.split(".").pop();
}

export function isVideo(filename: string) {
  const fileExtension = getFileExtension(filename);
  const videoExtensions = ["webm", "mp4"];
  if (!fileExtension) return false;

  return videoExtensions.includes(fileExtension);
}
