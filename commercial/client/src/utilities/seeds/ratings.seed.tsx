import { v4 } from 'uuid';
import { IRating } from '../interfaces/Rating.interface';

export const RATINGS: IRating[] = [
  { id: v4(), label: 'Từ 5 sao', value: 5 },
  { id: v4(), label: 'Từ 4 sao', value: 4 },
  { id: v4(), label: 'Từ 3 sao', value: 3 },
];
