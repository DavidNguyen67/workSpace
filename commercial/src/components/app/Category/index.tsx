'use client';
import ModalCommon from '@/components/modal/ModalCommon';
import { SUPPLIERS } from '@/utilities/seeds';
import {
  CarOutlined,
  DollarOutlined,
  FilterOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';

const { Option } = Select;
const { Text } = Typography;

const services = [
  { label: 'Giao siêu tốc 2H', value: 'fast_delivery_2h' },
  { label: 'Ưu đãi', value: 'discount' },
];

const ratings = [
  { label: 'Từ 5 sao', value: '5_star' },
  { label: 'Từ 4 sao', value: '4_star' },
  { label: 'Từ 3 sao', value: '3_star' },
];

const prices = [
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

const brands = [
  { label: 'Deli', value: 'deli', icon: <ShopOutlined /> },
  { label: 'Thiên Long', value: 'thien_long', icon: <ShopOutlined /> },
  { label: 'Hồng Hà', value: 'hong_ha', icon: <ShopOutlined /> },
  { label: 'Pentel', value: 'pentel', icon: <ShopOutlined /> },
  { label: 'KLONG', value: 'klong', icon: <ShopOutlined /> },
];

const suppliers = [
  { label: 'Nhà Sách Vĩnh Thụy', value: 'vinh_thuy', icon: <ShopOutlined /> },
  { label: 'Nhà sách Fahasa', value: 'fahasa', icon: <ShopOutlined /> },
  { label: 'Bamboo Books', value: 'bamboo_books', icon: <ShopOutlined /> },
  { label: 'Info book', value: 'info_book', icon: <ShopOutlined /> },
  {
    label: 'HỆ THỐNG NHÀ SÁCH ABC',
    value: 'abc_books',
    icon: <ShopOutlined />,
  },
];

const deliveries = [
  { label: 'Hàng nội địa', value: 'domestic', icon: <CarOutlined /> },
  { label: 'Hàng quốc tế', value: 'international', icon: <CarOutlined /> },
];

const AllFilterFeaturesComponent = () => {
  const handleClickViewMoreBrands = useCallback(() => {
    alert('View more branches');
  }, []);

  const handleClickViewMoreSuppliers = useCallback(() => {
    alert('View more suppliers');
  }, []);

  // Hàm render danh sách checkbox
  const renderCheckboxList = useCallback(
    (
      data: {
        label: string;
        value: string;
        icon?: JSX.Element;
      }[]
    ) => (
      <Row gutter={[8, 8]}>
        {data.map((item) => (
          <Col
            key={item.value}
            span={12}
          >
            <Checkbox>
              <Space>
                {item.icon}
                {item.label}
              </Space>
            </Checkbox>
          </Col>
        ))}
      </Row>
    ),
    []
  );

  return (
    <>
      <Divider>Dịch vụ</Divider>
      {renderCheckboxList(services)}

      <Divider>Ưu đãi</Divider>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Checkbox>Siêu rẻ</Checkbox>
        </Col>
      </Row>

      <Divider>Đánh giá</Divider>
      {renderCheckboxList(ratings)}

      <Divider>Giá</Divider>
      {renderCheckboxList(prices)}
      <br />
      <Text>Tự nhập khoảng giá</Text>
      <Col span={24}>
        <Space>
          <Input
            type='number'
            placeholder='₫'
          />
          -
          <Input
            type='number'
            placeholder='₫'
          />
        </Space>
      </Col>

      <Divider>Thương hiệu</Divider>
      {renderCheckboxList(brands)}
      <Col span={24}>
        <Text
          underline
          onClick={handleClickViewMoreBrands}
          style={{ cursor: 'pointer' }}
        >
          Xem thêm
        </Text>
      </Col>

      <Divider>Nhà cung cấp</Divider>
      {renderCheckboxList(suppliers)}
      <Col span={24}>
        <Text
          underline
          onClick={handleClickViewMoreSuppliers}
          style={{ cursor: 'pointer' }}
        >
          Xem thêm
        </Text>
      </Col>

      <Divider>Giao hàng</Divider>
      {renderCheckboxList(deliveries)}
    </>
  );
};

interface FilterSectionComponentProps {}

function FilterSectionComponent({}: Readonly<FilterSectionComponentProps>) {
  const suppliers = useMemo(() => SUPPLIERS, []);

  const [isShowFilterItemModal, setIsShowFilterItemModal] =
    useState<boolean>(false);

  const handleShowFilterItem = useCallback(() => {
    setIsShowFilterItemModal(!isShowFilterItemModal);
  }, [isShowFilterItemModal]);

  return (
    <Row gutter={[8, 8]}>
      <Col xs={10}>
        <Text>Thương hiệu</Text>
        <Select
          defaultValue='all'
          style={{ width: '100%' }}
          mode='tags'
        >
          {suppliers.map((supplier) => (
            <Option
              key={supplier.value}
              value={supplier.value}
            >
              {supplier.label}
            </Option>
          ))}
        </Select>
      </Col>
      <Col xs={10}>
        <Text>Nhà cung cấp</Text>
        <Select
          defaultValue='all'
          style={{ width: '100%' }}
          mode='tags'
        >
          {suppliers.map((supplier) => (
            <Option
              key={supplier.value}
              value={supplier.value}
            >
              {supplier.label}
            </Option>
          ))}
        </Select>
      </Col>
      <Col xs={4}>
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'end',
            height: '100%',
            width: '100%',
          }}
        >
          <div style={{ marginTop: 'auto', width: '100%' }}>
            <Button
              style={{ width: '100%' }}
              icon={<FilterOutlined />}
              onClick={handleShowFilterItem}
            >
              Tất cả
            </Button>
          </div>
        </div>
      </Col>
      <ModalCommon
        isVisible={isShowFilterItemModal}
        setIsVisible={setIsShowFilterItemModal}
        content={<AllFilterFeaturesComponent />}
        title='Tất cả bộ lọc'
        footer={<>test</>}
      />
    </Row>
  );
}

export default FilterSectionComponent;
