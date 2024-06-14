import { DollarOutlined } from '@ant-design/icons';

export const PRICES = [
  { label: 'Dưới 60.000', value: 'below_60000', icon: <DollarOutlined /> },
  {
    label: '60.000 -> 140.000',
    value: '60000_140000',
    icon: <DollarOutlined />,
  },
  {
    label: '140.000 -> 280.000',
    value: '140000_280000',
    icon: <DollarOutlined />,
  },
  { label: 'Trên 280.000', value: 'above_280000', icon: <DollarOutlined /> },
];
