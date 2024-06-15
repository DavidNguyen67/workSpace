import {
  ThunderboltOutlined,
  GiftOutlined,
  BookOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
  CameraOutlined,
  ShoppingCartOutlined,
  GlobalOutlined,
  SkinOutlined,
  MobileOutlined,
  SmileOutlined,
  TrophyOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { v4 } from 'uuid';
import { IAdvertisement } from '../interfaces/Advertisement.interface';

export const ADVERTISEMENTS: IAdvertisement[] = [
  {
    label: 'Top Deal',
    id: v4(),
    icon: <ThunderboltOutlined />,
    description: 'Nơi hội tụ các sản phẩm với giá tốt nhất.',
  },
  {
    label: 'Nhập khẩu chính hãng',
    id: v4(),
    icon: <GlobalOutlined />,
    description: 'Các sản phẩm nhập khẩu chính hãng, đảm bảo chất lượng.',
  },
  {
    label: 'Sản phẩm mới',
    id: v4(),
    icon: <GiftOutlined />,
    description: 'Cập nhật những sản phẩm mới nhất trên thị trường.',
  },
  {
    label: 'Nhà Sách Tiki',
    id: v4(),
    icon: <BookOutlined />,
    description: 'Kho sách khổng lồ, đa dạng thể loại.',
  },
  {
    label: 'Nhà cửa',
    id: v4(),
    icon: <HomeOutlined />,
    description: 'Tất cả những gì bạn cần cho ngôi nhà của mình.',
  },
  {
    label: 'Dược phẩm',
    id: v4(),
    icon: <MedicineBoxOutlined />,
    description: 'Sản phẩm chăm sóc sức khỏe và dược phẩm chất lượng.',
  },
  {
    label: 'Máy ảnh',
    id: v4(),
    icon: <CameraOutlined />,
    description:
      'Các loại máy ảnh hiện đại, đáp ứng nhu cầu chụp ảnh chuyên nghiệp.',
  },
  {
    label: 'Giỏ hàng',
    id: v4(),
    icon: <ShoppingCartOutlined />,
    description: 'Tiện ích giỏ hàng giúp bạn quản lý mua sắm dễ dàng.',
  },
  {
    label: 'Thời trang',
    id: v4(),
    icon: <SkinOutlined />,
    description: 'Các sản phẩm thời trang mới nhất và phong cách nhất.',
  },
  {
    label: 'Điện tử',
    id: v4(),
    icon: <MobileOutlined />,
    description: 'Thiết bị điện tử hiện đại và công nghệ tiên tiến.',
  },
  {
    label: 'Đồ chơi',
    id: v4(),
    icon: <SmileOutlined />,
    description: 'Đồ chơi an toàn và thú vị cho trẻ em.',
  },
  {
    label: 'Thể thao',
    id: v4(),
    icon: <TrophyOutlined />,
    description: 'Dụng cụ và trang phục thể thao chất lượng cao.',
  },
  {
    label: 'Mỹ phẩm',
    id: v4(),
    icon: <HeartOutlined />,
    description: 'Các sản phẩm chăm sóc sắc đẹp và mỹ phẩm chính hãng.',
  },
  {
    label: 'Sức khỏe',
    id: v4(),
    icon: <MedicineBoxOutlined />,
    description: 'Sản phẩm chăm sóc sức khỏe chất lượng.',
  },
  {
    label: 'Đồ gia dụng',
    id: v4(),
    icon: <HomeOutlined />,
    description: 'Các sản phẩm gia dụng tiện ích cho cuộc sống hàng ngày.',
  },
  {
    label: 'Văn phòng phẩm',
    id: v4(),
    icon: <BookOutlined />,
    description: 'Các sản phẩm văn phòng phẩm đa dạng và tiện lợi.',
  },
];
