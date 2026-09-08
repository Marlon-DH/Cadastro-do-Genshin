const characterAliases: Record<string, string> = {
  Aether: "UI_AvatarIcon_PlayerBoy.png",
  Lumine: "UI_AvatarIcon_PlayerGirl.png",
  Amber: "UI_AvatarIcon_Ambor.png",
  Albedo: "UI_AvatarIcon_Albedo.png",
  Alhaitham: "UI_AvatarIcon_Alhatham.png",
  Baizhu: "UI_AvatarIcon_Baizhuer.png",
};

export function getCharacterImageUrl(
  imageUrl: string | null,
  name: string,
): string {
  const fileName = characterAliases[name] ?? imageUrl?.split("/").pop();

  return fileName
    ? `https://enka.network/ui/${fileName}`
    : `https://placehold.co/240x240/f1edf8/8b8495?text=${encodeURIComponent(name)}`;
}