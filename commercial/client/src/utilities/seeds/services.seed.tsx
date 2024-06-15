import { v4 } from 'uuid';
import { IService } from '../interfaces/Service.interface';

export const SERVICES: IService[] = [
  { id: v4(), label: 'Giao siêu tốc 2H', value: 'fast_delivery_2h' },
  { id: v4(), label: 'Ưu đãi', value: 'discount' },
];
