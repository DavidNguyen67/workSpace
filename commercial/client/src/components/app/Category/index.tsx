'use client';
import ModalCommon from '@/components/modal/ModalCommon';
import {
  setBrands,
  setDeliveries,
  setRatings,
  setServices,
  setSuppliers,
} from '@/redux/slices/filteredProduct.slice';
import { useAppDispatch, useAppSelector } from '@/redux/stores';
import { BaseItem } from '@/utilities/interfaces';
import {
  RATINGS,
  SERVICES,
  SUPPLIERS,
  PRICES,
  BRANDS,
  DELIVERIES,
} from '@/utilities/seeds';
import { FilterOutlined } from '@ant-design/icons';
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

interface AllFilterFeaturesComponentProps {}

const AllFilterFeaturesComponent =
  ({}: Readonly<AllFilterFeaturesComponentProps>) => {
    const {
      filterPrices,
      filterBrands,
      filterDeliveries,
      filterRatings,
      filterServices,
      filterSuppliers,
    } = useAppSelector((state) => state.filterProductSlice);

    const dispatch = useAppDispatch();

    const [minValue, setMinValue] = useState<number>(filterPrices.min ?? 0);

    const [maxValue, setMaxValue] = useState<number>(
      filterPrices.max ?? 999999999
    );

    const [api, contextHolder] = notification.useNotification();

    const actionMap = useMemo(
      () => ({
        services: setServices,
        ratings: setRatings,
        brands: setBrands,
        suppliers: setSuppliers,
        deliveries: setDeliveries,
      }),
      []
    );

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

    const handleClickFilterItem = useCallback(
      (item: BaseItem, filterType?: keyof typeof actionMap) => {
        if (filterType) dispatch(actionMap[filterType](item));
      },
      [dispatch, actionMap]
    );

    // Hàm render danh sách checkbox
    const renderCheckboxList = useCallback(
      (data: BaseItem[], filterType?: keyof typeof actionMap) => (
        <Row gutter={[8, 8]}>
          {data.map((item) => (
            <Col
              key={item.value}
              span={12}
            >
              <Checkbox onClick={() => handleClickFilterItem(item, filterType)}>
                <Space>
                  {item.icon}
                  {item.label}
                </Space>
              </Checkbox>
            </Col>
          ))}
        </Row>
      ),
      [handleClickFilterItem]
    );

    return (
      <>
        {contextHolder}
        <Divider>Dịch vụ</Divider>
        {renderCheckboxList(services, 'services')}

        <Divider>Ưu đãi</Divider>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Checkbox>Siêu rẻ</Checkbox>
          </Col>
        </Row>

        <Divider>Đánh giá</Divider>
        {renderCheckboxList(ratings, 'ratings')}

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
        {renderCheckboxList(brands, 'brands')}
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
        {renderCheckboxList(suppliers, 'suppliers')}
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
        {renderCheckboxList(deliveries, 'deliveries')}
      </>
    );
  };

interface FilterSectionComponentProps {}

function FilterSectionComponent({}: Readonly<FilterSectionComponentProps>) {
  const { ...filters } = useAppSelector((state) => state.filterProductSlice);

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
          mode='multiple'
          maxTagCount='responsive'
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
          mode='multiple'
          maxTagCount='responsive'
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
        onOk={() => {
          console.log(filters);
        }}
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
