export type MenuProductStatus = 'Active' | 'Sold Out';

export type MenuCategory = {
  id: string;
  nameKey: string;
  count: number;
  isSoldOut: boolean;
  image: string;
};

export type MenuProduct = {
  id: string;
  nameKey: string;
  categoryKey: string;
  price: string;
  status: MenuProductStatus;
  badge: string;
  views: string;
  image: string;
  variants: string[];
  extras: string[];
};

export type MenuSlider = {
  id: string;
  titleKey: string;
  subtitleKey: string;
  targetKey: string;
  image: string;
  status: string;
};
