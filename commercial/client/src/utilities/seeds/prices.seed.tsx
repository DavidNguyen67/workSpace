import { DollarOutlined } from '@ant-design/icons';
import { IPrice } from '../interfaces/Price.interface';
import { v4 } from 'uuid';

export const PRICES: IPrice[] = [
  { id: v4(), label: 'Dưới 60.000', value: '-60000', icon: <DollarOutlined /> },
  {
    id: v4(),
    label: '60.000 -> 140.000',
    value: '60000_140000',
    icon: <DollarOutlined />,
  },
  {
    id: v4(),
    label: '140.000 -> 280.000',
    value: '140000_280000',
    icon: <DollarOutlined />,
  },
  {
    id: v4(),
    label: 'Trên 280.000',
    value: '+280000',
    icon: <DollarOutlined />,
  },
];
