'use client';
import { useUpdateUserMutation } from '@/redux/asyncSlice/userApi.slice';
import { UserEntity } from '@/utility/class';
import { UpdateUserDto } from '@/utility/dto/updateUser.dto';
import { Button, Checkbox, Form, Input, Modal, Space } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

interface ModalUpdateUserProps {
  isModalVisible: boolean;
  setIsModalVisible: (value: React.SetStateAction<boolean>) => void;
  data: UserEntity | null;
}

let promise: any;

function ModalUpdateUser({
  isModalVisible = false,
  setIsModalVisible = () => {},
  data,
}: ModalUpdateUserProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [form] = Form.useForm();

  const [updateUser, { isLoading, error }] = useUpdateUserMutation();

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, [setIsModalVisible]);

  const handleUpdateUser = useCallback(
    async (payload: UpdateUserDto) => {
      try {
        if (promise) {
          promise.abort();
          promise = null;
        }

        promise = updateUser(payload);
        await promise.unwrap();

        console.log('User updated:', promise);
        handleCloseModal();
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    },
    [handleCloseModal, updateUser]
  );

  const onFinish = useCallback(
    async (values: UserEntity) => {
      if (data?.id) {
        await handleUpdateUser({ ...values, id: data.id });
      }
    },
    [data?.id, handleUpdateUser]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

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
            onClick={handleCloseModal}
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
