'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, Button, Space, Divider, Select, FormProps } from 'antd';
import { fetchProvince } from '@/utilities/services/address/address.service';
import {
  District,
  NestedDivisions,
  Ward,
} from '@/utilities/types/address/Province';
import { setAddress } from '@/redux/slices/user.slice';
import { useAppDispatch } from '@/redux/stores';

const { Option } = Select;

interface AddressFormProps {
  afterSubmit?: Function;
}

const AddressForm = ({ afterSubmit }: Readonly<AddressFormProps>) => {
  const [form] = Form.useForm<AddressForm>();
  const [cities, setCities] = useState<NestedDivisions[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedCity, setSelectedCity] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const handleFetchProvinces = useCallback(async () => {
    const response: NestedDivisions[] = await fetchProvince();
    setCities(response);
  }, []);

  const handleCitySelectedChange = useCallback(
    (value: number) => {
      setSelectedCity(value);
      setDistricts(cities.find((item) => item.code === value)?.districts ?? []);
      setWards([]);
    },
    [cities]
  );

  const handleDistrictSelectedChange = useCallback(
    (value: number) => {
      setSelectedDistrict(value);
      setWards(districts.find((item) => item.code === value)?.wards ?? []);
    },
    [districts]
  );

  const onFinish: FormProps<AddressForm>['onFinish'] = useCallback(
    (values: AddressForm) => {
      dispatch(
        setAddress({
          address: values,
          addressString: `
          ${wards.find((item) => item.code === values.wardCode)?.name},
          ${districts.find((item) => item.code === values.districtCode)?.name},
          ${cities.find((item) => item.code === values.cityCode)?.name}`,
        })
      );
      if (typeof afterSubmit === 'function') afterSubmit();
    },
    [dispatch, wards, districts, cities, afterSubmit]
  );

  const onFinishFailed: FormProps<AddressForm>['onFinishFailed'] = useCallback(
    (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    },
    []
  );

  useEffect(() => {
    handleFetchProvinces();
  }, [handleFetchProvinces]);

  return (
    <>
      <Form
        form={form}
        name="addressForm"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {/* <Form.Item<AddressForm>
          name="fullName"
          label="Họ và Tên"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          required
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value) {
                  return Promise.reject(
                    new Error('Vui lòng nhập số điện thoại!')
                  );
                }
                if (validator.isMobilePhone(value)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(
                    new Error('Số điện thoại không hợp lệ')
                  );
                }
              },
            }),
          ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item> */}
        <Form.Item<AddressForm>
          name="cityCode"
          label="Tỉnh/Thành phố"
          rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
        >
          <Select
            placeholder="Chọn tỉnh/thành phố"
            onChange={handleCitySelectedChange}
          >
            {cities?.length > 0 &&
              cities.map((city) => (
                <Option
                  key={city.code}
                  value={city.code}
                >
                  {city.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item<AddressForm>
          name="districtCode"
          label="Quận/Huyện"
          rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}
        >
          <Select
            placeholder="Chọn quận/huyện"
            onChange={handleDistrictSelectedChange}
            disabled={!selectedCity}
          >
            {districts?.length > 0 &&
              districts.map((district) => (
                <Option
                  key={district.code}
                  value={district.code}
                >
                  {district.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item<AddressForm>
          name="wardCode"
          label="Phường/Xã"
          rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}
        >
          <Select
            placeholder="Chọn phường/xã"
            disabled={!selectedDistrict}
          >
            {wards?.length > 0 &&
              wards.map((ward) => (
                <Option
                  key={ward.code}
                  value={ward.code}
                >
                  {ward.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item<AddressForm>
          name="detailedAddress"
          label="Địa chỉ chi tiết"
        >
          <Input placeholder="Nhập số nhà, ngõ ngách, đường phố" />
        </Form.Item>
        <Divider />
        <Form.Item style={{ textAlign: 'right' }}>
          <Space>
            <Button
              htmlType="reset"
              onClick={() => form.resetFields()}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
            >
              Lưu
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddressForm;
