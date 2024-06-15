import { ShopOutlined } from '@ant-design/icons';
import { IBrand } from '../interfaces/Brand.interface';
import { v4 } from 'uuid';

export const BRANDS: IBrand[] = [
  { id: v4(), label: 'Deli', value: 'deli', icon: <ShopOutlined /> },
  {
    id: v4(),
    label: 'Thiên Long',
    value: 'thien_long',
    icon: <ShopOutlined />,
  },
  { id: v4(), label: 'Hồng Hà', value: 'hong_ha', icon: <ShopOutlined /> },
  { id: v4(), label: 'Pentel', value: 'pentel', icon: <ShopOutlined /> },
  { id: v4(), label: 'KLONG', value: 'klong', icon: <ShopOutlined /> },
];
