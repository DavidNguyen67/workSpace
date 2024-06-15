import { ShopOutlined } from '@ant-design/icons';
import { ISupply } from '../interfaces/Supply.interface';
import { v4 } from 'uuid';

export const SUPPLIERS: ISupply[] = [
  { id: v4(), label: 'All', value: 'all' },
  {
    id: v4(),
    label: 'Nhà Sách Vĩnh Thụy',
    value: 'vinh_thuy',
    icon: <ShopOutlined />,
  },
  {
    id: v4(),
    label: 'Nhà sách Fahasa',
    value: 'fahasa',
    icon: <ShopOutlined />,
  },
  {
    id: v4(),
    label: 'Bamboo Books',
    value: 'bamboo_books',
    icon: <ShopOutlined />,
  },
  { id: v4(), label: 'Info book', value: 'info_book', icon: <ShopOutlined /> },
  {
    id: v4(),
    label: 'HỆ THỐNG NHÀ SÁCH ABC',
    value: 'abc_books',
    icon: <ShopOutlined />,
  },
];
