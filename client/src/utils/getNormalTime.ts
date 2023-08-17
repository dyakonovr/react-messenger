export function getNormalTime(t: string) {
  const date = new Date(t);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes}`;
}