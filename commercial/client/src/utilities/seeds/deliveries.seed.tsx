import { CarOutlined } from '@ant-design/icons';
import { IDelivery } from '../interfaces/Delivery.interface';
import { v4 } from 'uuid';

export const DELIVERIES: IDelivery[] = [
  { id: v4(), label: 'Hàng nội địa', value: 'domestic', icon: <CarOutlined /> },
  {
    id: v4(),
    label: 'Hàng quốc tế',
    value: 'international',
    icon: <CarOutlined />,
  },
];
