import { Modal, ModalProps } from 'antd';
import { FC, useCallback, useState } from 'react';

interface ModalCommonProps extends ModalProps {
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
  footer = [],
  okText,
  cancelText,
  onOk,
}: Readonly<ModalCommonProps>) {
  const hideModal = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  const handleSubmit = useCallback(
    (event: any) => {
      if (typeof onOk === 'function') {
        onOk(event);
      }
      hideModal();
    },
    [hideModal, onOk]
  );

  return (
    <>
      <Modal
        open={isVisible}
        onCancel={hideModal}
        onOk={handleSubmit}
        footer={footer}
        title={title}
        width={width}
        okText={okText}
        cancelText={cancelText}
      >
        {content}
      </Modal>
    </>
  );
}

export default ModalCommon;
