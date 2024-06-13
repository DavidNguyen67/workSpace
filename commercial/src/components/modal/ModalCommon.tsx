import { Modal } from 'antd';
import { useCallback, useState } from 'react';

interface ModalCommonProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  content: React.ReactNode;
  title?: string;
  width?: number;
}

function ModalCommon({
  isVisible,
  setIsVisible,
  content,
  title = '',
  width,
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
        title={title}
        width={width}
      >
        {content}
      </Modal>
    </>
  );
}

export default ModalCommon;
