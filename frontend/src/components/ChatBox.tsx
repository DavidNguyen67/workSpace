import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBTextArea,
  MDBBtn,
  MDBSpinner,
} from 'mdb-react-ui-kit';
import { useCallback, useEffect, useState } from 'react';
import {
  getMessages,
  sendMessage,
} from '../utilities/services/message.service';
import { useAppSelector } from '../utilities/hooks/reduxHook';
import { v4 } from 'uuid';
import toast from 'react-hot-toast';
import _ from 'lodash';

export default function ChatBox(props: {
  recipientId: string;
  roomId: string;
}) {
  const { recipientId, roomId } = props;
  const { userId } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<Message>({
    id: v4(),
    senderId: userId || '',
    text: '',
    roomId,
  });
  const [messages, setMessages] = useState<Message[]>([]);

  const handleChangeTextArea = (event: any) => {
    setNewMessage((prev) => ({
      ...prev,
      text: event.target?.value ?? prev.text,
    }));
  };
  const handleGetMessage = useCallback(async () => {
    if (userId && recipientId) {
      const response: MessageResponse[] = await getMessages(
        _.join(
          _.orderBy(
            [userId, recipientId],
            [(userId) => userId.toLowerCase()],
            ['desc']
          ),
          '_'
        )
      );
      if (response?.length > 0) {
        setMessages(response);
      }
    }
  }, [recipientId, userId]);
  const handleSendMessage = useCallback(async () => {
    setIsLoading(true);
    if (newMessage.text) {
      const response = await sendMessage(newMessage);
      if (response) {
        setNewMessage({ id: v4(), senderId: userId || '', text: '', roomId });
        handleGetMessage();
      }
    } else {
      toast.error("Message can't be empty");
    }
    setIsLoading(false);
  }, [handleGetMessage, newMessage, roomId, userId]);

  useEffect(() => {
    handleGetMessage();
  }, [handleGetMessage]);

  return (
    <MDBCard
      id="chat1"
      style={{ borderRadius: '15px', height: '85vh' }}
    >
      <MDBCardHeader
        className="d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
        style={{
          borderTopLeftRadius: '15px',
          borderTopRightRadius: '15px',
        }}
      >
        <p className="mb-0 fw-bold text-center">{recipientId ?? 'Live chat'}</p>
      </MDBCardHeader>

      <MDBCardBody className="overflow-y-scroll">
        {messages?.length > 0 &&
          // eslint-disable-next-line array-callback-return
          messages.map((item) => {
            if (item.roomId === roomId) {
              if (item.senderId === userId) {
                return (
                  <div
                    className="d-flex flex-row justify-content-end mb-4"
                    key={item.id}
                  >
                    <div
                      className="p-3 me-3 border"
                      style={{
                        borderRadius: '15px',
                        backgroundColor: 'rgba(57, 192, 237,.2)',
                      }}
                    >
                      <p className="small mb-0">{item.text}</p>
                    </div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      alt="avatar 1"
                      style={{ width: '45px', height: '100%' }}
                    />
                  </div>
                );
              }
              return (
                <div
                  className="d-flex flex-row justify-content-start mb-4"
                  key={item.id}
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="avatar 1"
                    style={{ width: '45px', height: '100%' }}
                  />
                  <div
                    className="p-3 ms-3"
                    style={{
                      borderRadius: '15px',
                      backgroundColor: '#fbfbfb',
                    }}
                  >
                    <p className="small mb-0">{item.text}</p>
                  </div>
                </div>
              );
            }
          })}
      </MDBCardBody>
      <div className="row m-2">
        <div className="col-10">
          <MDBTextArea
            className="form-outline "
            label="Type your message"
            id="textAreaExample"
            rows={2}
            disabled={isLoading}
            onChange={handleChangeTextArea}
            value={newMessage?.text}
          />
        </div>
        <div className="col-2">
          <MDBBtn
            className="w-100 h-100 "
            onClick={handleSendMessage}
            disabled={isLoading}
          >
            {isLoading ? (
              <MDBSpinner role="status">
                <span className="visually-hidden">Loading...</span>
              </MDBSpinner>
            ) : (
              <MDBIcon
                fas
                icon="arrow-right"
              />
            )}
          </MDBBtn>
        </div>
      </div>
    </MDBCard>
  );
}
