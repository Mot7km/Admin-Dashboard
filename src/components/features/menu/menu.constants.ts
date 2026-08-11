import type { MenuCategory, MenuProduct, MenuSlider } from './menu.types';

export const initialCategories: MenuCategory[] = [
  { id: 'cat-1', nameKey: 'menu.categoriesList.burgers', count: 18, isSoldOut: false, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=80' },
  { id: 'cat-2', nameKey: 'menu.categoriesList.beverages', count: 24, isSoldOut: false, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&auto=format&fit=crop&q=80' },
  { id: 'cat-3', nameKey: 'menu.categoriesList.pizza', count: 12, isSoldOut: false, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=200&auto=format&fit=crop&q=80' },
  { id: 'cat-4', nameKey: 'menu.categoriesList.desserts', count: 15, isSoldOut: false, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&auto=format&fit=crop&q=80' },
];

export const initialProducts: MenuProduct[] = [
  {
    id: 'prod-1',
    nameKey: 'dashboard.products.truffleBurger',
    categoryKey: 'menu.categoriesList.burgers',
    price: '$14.50',
    status: 'Active',
    badge: 'Bestseller',
    views: '4,820',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
    variants: ['Single ($14.50)', 'Double ($18.00)'],
    extras: ['Extra Cheese (+$1.50)', 'Truffle Dip (+$2.00)'],
  },
  {
    id: 'prod-2',
    nameKey: 'dashboard.products.icedLatte',
    categoryKey: 'menu.categoriesList.beverages',
    price: '$6.50',
    status: 'Sold Out',
    badge: 'Popular',
    views: '3,950',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop&q=80',
    variants: ['Medium ($6.50)', 'Large ($7.50)'],
    extras: ['Oat Milk (+$1.00)', 'Vanilla Syrup (+$0.50)'],
  },
  {
    id: 'prod-3',
    nameKey: 'dashboard.products.margheritaPizza',
    categoryKey: 'menu.categoriesList.pizza',
    price: '$18.00',
    status: 'Active',
    badge: 'New',
    views: '3,120',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&auto=format&fit=crop&q=80',
    variants: ['Medium 12"', 'Large 16"'],
    extras: ['Extra Mozzarella (+$2.50)'],
  },
];

export const initialSliders: MenuSlider[] = [
  {
    id: 'slide-1',
    titleKey: 'menu.slidersList.s1Title',
    subtitleKey: 'menu.slidersList.s1Subtitle',
    targetKey: 'dashboard.products.truffleBurger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    status: 'Active',
  },
  {
    id: 'slide-2',
    titleKey: 'menu.slidersList.s2Title',
    subtitleKey: 'menu.slidersList.s2Subtitle',
    targetKey: 'dashboard.products.icedLatte',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80',
    status: 'Active',
  },
];
