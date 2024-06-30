'use client';
import { UserEntity } from '@/utility/class';
import { Button, Checkbox, Form, Input, Modal, Space } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

interface ModalUpdateUserProps {
  isModalVisible: boolean;
  handleConfirmUpdateUser: (values: any) => void;
  setIsModalVisible: (value: React.SetStateAction<boolean>) => void;
  data: UserEntity | null;
}

function ModalUpdateUser({
  isModalVisible = false,
  handleConfirmUpdateUser = () => {},
  setIsModalVisible = () => {},
  data,
}: ModalUpdateUserProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        active: data.active,
        id: data.id,
        insertedAt: data.insertedAt,
        updatedAt: data.updatedAt,
      });
    } else {
      form.resetFields();
    }
  }, [data, form]);

  const onFinish = useCallback(
    (values: UserEntity) => {
      handleConfirmUpdateUser(values);
    },
    [handleConfirmUpdateUser]
  );

  if (!mounted) return <></>;

  return (
    <Modal
      forceRender
      footer={null}
      getContainer={false}
      title='Cập nhật người dùng'
      open={isModalVisible}
      onOk={() => setIsModalVisible(false)}
      onCancel={() => setIsModalVisible(false)}
    >
      <Form
        form={form}
        layout='vertical'
        name='userForm'
        initialValues={{ active: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name='email'
          label='Email'
          rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='firstName'
          label='First Name'
          rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='lastName'
          label='Last Name'
          rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='active'
          valuePropName='checked'
        >
          <Checkbox>Active</Checkbox>
        </Form.Item>

        <Space
          direction='horizontal'
          style={{ width: '100%' }}
        >
          <Button
            onClick={() => setIsModalVisible(false)}
            style={{ marginLeft: 'auto' }}
          >
            Cancel
          </Button>
          <Button
            type='primary'
            htmlType='submit'
          >
            Submit
          </Button>
        </Space>
      </Form>
    </Modal>
  );
}

export default ModalUpdateUser;
