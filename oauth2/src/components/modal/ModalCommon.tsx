import { Modal } from 'antd';
import { useCallback, useState } from 'react';

interface ModalCommonProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  content: React.ReactNode;
}

function ModalCommon({
  isVisible,
  setIsVisible,
  content,
}: Readonly<ModalCommonProps>) {
  const hideModal = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  const handleSubmit = useCallback(() => {
    hideModal();
  }, [hideModal]);

  return (
    <>
      <Modal
        open={isVisible}
        onCancel={hideModal}
        onOk={handleSubmit}
        footer={[]}
      >
        {content}
      </Modal>
    </>
  );
}

export default ModalCommon;
