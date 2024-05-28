import { Modal } from 'antd';
import { useCallback, useState } from 'react';

interface ModalAuthProps {
  toggleModal: boolean;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  content: React.ReactNode;
}

function ModalAuth({
  toggleModal,
  setToggleModal,
  title,
  content,
}: Readonly<ModalAuthProps>) {
  const hideModal = useCallback(() => {
    setToggleModal(false);
  }, [setToggleModal]);

  const handleSubmit = useCallback(() => {
    hideModal();
  }, [hideModal]);

  return (
    <>
      <Modal
        title={title}
        open={toggleModal}
        onCancel={hideModal}
        onOk={handleSubmit}
      >
        {content}
      </Modal>
    </>
  );
}

export default ModalAuth;
