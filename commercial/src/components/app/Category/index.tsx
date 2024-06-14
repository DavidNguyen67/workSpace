'use client';
import ModalCommon from '@/components/modal/ModalCommon';
import { useAppSelector } from '@/redux/stores';
import {
  RATINGS,
  SERVICES,
  SUPPLIERS,
  PRICES,
  BRANDS,
  DELIVERIES,
} from '@/utilities/seeds';
import { CarOutlined, FilterOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Divider,
  InputNumber,
  InputNumberProps,
  notification,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import { useCallback, useMemo, useState } from 'react';

const { Option } = Select;
const { Text } = Typography;

const AllFilterFeaturesComponent = () => {
  const {
    filterPrices,
    filterBrands,
    filterDeliveries,
    filterRatings,
    filterServices,
    filterSuppliers,
  } = useAppSelector((state) => state.filterProductSlice);

  const [minValue, setMinValue] = useState<number>(filterPrices.min ?? 0);

  const [maxValue, setMaxValue] = useState<number>(
    filterPrices.max ?? 999999999
  );

  const [api, contextHolder] = notification.useNotification();

  const services = useMemo(() => SERVICES, []);

  const ratings = useMemo(() => RATINGS, []);

  const prices = useMemo(() => PRICES, []);

  const brands = useMemo(() => BRANDS, []);

  const suppliers = useMemo(() => SUPPLIERS, []);

  const deliveries = useMemo(() => DELIVERIES, []);

  const handleChangeMinValue: InputNumberProps['onChange'] = useCallback(
    (value: any) => {
      if (value < 0) return;
      if (value >= maxValue) {
        api.warning({
          message: 'Greater than max value',
        });
        return;
      }
      setMinValue(value);
    },
    [maxValue, api]
  );

  const handleChangeMaxValue: InputNumberProps['onChange'] = useCallback(
    (value: any) => {
      if (value <= minValue) {
        api.warning({
          message: 'Less than min value',
        });
        return;
      }
      setMaxValue(value);
    },
    [api, minValue]
  );

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
      {contextHolder}
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
          <InputNumber
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value && value?.replace(/\s?đ|(,*)/g, '')}
            style={{ width: '100%' }}
            addonAfter='VND'
            defaultValue={minValue}
            onChange={handleChangeMinValue}
            min={0}
            formNoValidate
          />
          -
          <InputNumber
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value && value?.replace(/\s?đ|(,*)/g, '')}
            style={{ width: '100%' }}
            addonAfter='VND'
            defaultValue={maxValue}
            onChange={handleChangeMaxValue}
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
        okText='Lọc'
        cancelText='Huỷ'
        centered
        footer={(_, { CancelBtn, OkBtn }) => {
          return (
            <>
              <CancelBtn />
              <OkBtn />
            </>
          );
        }}
      />
    </Row>
  );
}

export default FilterSectionComponent;
