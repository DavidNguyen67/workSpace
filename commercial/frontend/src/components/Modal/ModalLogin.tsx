import { Button, Form, Modal } from 'antd';
import  { useCallback, useState } from 'react';
import { LoginUserDto } from '../../utility/dto';
import userService from '../../service/user';

interface ModalLoginProps {
  isVisible: boolean;
  onClose: () => void;
}

const ModalLogin = ({ isVisible, onClose }: ModalLoginProps) => {
  const [payload, setPayload] = useState<LoginUserDto>({
    email: '',
    password: '',
  });

  const handleLogin = useCallback(() => {
    try {
      const response = userService.loginUser(payload);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, [payload]);

  return (
    <Modal
      title='Login'
      open={isVisible}
      onCancel={onClose}
      footer={[
        <Button
          key='cancel'
          onClick={onClose}
        >
          Cancel
        </Button>,
        <Button
          key='submit'
          type='primary'
          onClick={handleLogin}
        >
          Login
        </Button>,
      ]}
    >
      <Form layout='vertical'>
        {/* <Form.Item label='Email'>
          <Input
            type='email'
            value={payload.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item label='Password'>
          <Input
            type='password'
            value={payload.password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default ModalLogin;
