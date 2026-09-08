export type DatabaseCharacter = {
  id: number;
  name: string;
  element: string;
  title: string;
  image_url: string | null;
};

export type DatabaseWeapon = {
  id: number;
  name: string;
  type: string;
  image_url: string | null;
};

export type DatabaseMaterial = {
  id: number;
  name: string;
  type: string;
  location: string;
  farm_days: string;
};
