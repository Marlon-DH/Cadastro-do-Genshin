export function getCharacterImageUrl(
  imageUrl: string | null,
  name: string,
): string {
  const fileName = imageUrl?.split("/").pop();

  if (fileName) {
    return `https://enka.network/ui/${fileName}`;
  }

  return `https://placehold.co/160x160/f1edf8/8b8495?text=${encodeURIComponent(name)}`;
}