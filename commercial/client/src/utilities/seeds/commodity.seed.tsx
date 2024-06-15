import { v4 } from 'uuid';
import { ICommodity } from '../interfaces/Commodity.interface';

export const COMMODITIES: ICommodity[] = [
  {
    id: v4(),
    label: 'Áo thun nam',
    price: 150000,
    description: 'Áo thun nam kiểu dáng trẻ trung, phong cách.',
    imageUrl:
      'https://salt.tikicdn.com/cache/280x280/ts/product/12/81/63/bba4b0b8f768037d2f39e864095c96c5.jpg.webp',
  },
  {
    id: v4(),
    label: 'Quần jeans nữ',
    price: 250000,
    description: 'Quần jeans nữ thời trang, dễ phối đồ.',
    imageUrl:
      'https://salt.tikicdn.com/cache/280x280/ts/product/12/81/63/bba4b0b8f768037d2f39e864095c96c5.jpg.webp',
  },
  {
    id: v4(),
    label: 'Điện thoại di động',
    price: 3000000,
    description: 'Điện thoại di động công nghệ mới nhất.',
    imageUrl:
      'https://salt.tikicdn.com/cache/280x280/ts/product/12/81/63/bba4b0b8f768037d2f39e864095c96c5.jpg.webp',
  },
  {
    id: v4(),
    label: 'Túi xách nữ',
    price: 120000,
    description: 'Túi xách nữ thời trang, phong cách.',
    imageUrl:
      'https://salt.tikicdn.com/cache/280x280/ts/product/12/81/63/bba4b0b8f768037d2f39e864095c96c5.jpg.webp',
  },
  {
    id: v4(),
    label: 'Túi xách nữ',
    price: 120000,
    description: 'Túi xách nữ thời trang, phong cách.',
    imageUrl:
      'https://salt.tikicdn.com/cache/280x280/ts/product/12/81/63/bba4b0b8f768037d2f39e864095c96c5.jpg.webp',
  },
  {
    id: v4(),
    label: 'Túi xách nữ',
    price: 120000,
    description: 'Túi xách nữ thời trang, phong cách.',
    imageUrl:
      'https://salt.tikicdn.com/cache/280x280/ts/product/12/81/63/bba4b0b8f768037d2f39e864095c96c5.jpg.webp',
  },
];
