import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBTextArea,
} from 'mdb-react-ui-kit';
import { useCallback, useMemo, useState } from 'react';
import useSocket from '../utilities/hooks/useSocket';
import toast, { Toaster } from 'react-hot-toast';
import { SOCKET_ACTION } from '../utilities/constants/constant-socket';
import { v4 } from 'uuid';

export default function App() {
  const [message, setMessage] = useState<Message | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  const messageId: string = useMemo(() => v4(), [messages]);

  const { socket, isConnected, toastId, isSending, setIsSending } = useSocket();

  const handleSendMessage = useCallback(() => {
    if (isConnected) {
      console.log('sent', message);

      try {
        setIsSending(true);
        socket.emit(SOCKET_ACTION.sendMessage, message);
      } catch (error) {
        console.log(error);
      }
    }
  }, [isConnected, message, socket, toastId]);

  const handleChangeMessage = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage({
      message: event.target?.value?.trim() ?? event.target?.value,
      id: messageId,
    });
  };

  return (
    <MDBContainer className="py-5">
      <MDBRow className="d-flex justify-content-center">
        <MDBCol
          md="8"
          lg="6"
          xl="4"
        >
          <MDBCard
            id="chat1"
            style={{ borderRadius: '15px' }}
          >
            <MDBCardHeader
              className="d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
              style={{
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
              }}
            >
              <MDBIcon
                fas
                icon="angle-left"
              />
              <p className="mb-0 fw-bold">Live chat</p>
              <MDBIcon
                fas
                icon="times"
              />
            </MDBCardHeader>

            <MDBCardBody>
              <div className="d-flex flex-row justify-content-start mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="avatar 1"
                  style={{ width: '45px', height: '100%' }}
                />
                <div
                  className="p-3 ms-3"
                  style={{
                    borderRadius: '15px',
                    backgroundColor: 'rgba(57, 192, 237,.2)',
                  }}
                >
                  <p className="small mb-0">
                    Hello and thank you for visiting MDBootstrap. Please click
                    the video below.
                  </p>
                </div>
              </div>

              <div className="d-flex flex-row justify-content-end mb-4">
                <div
                  className="p-3 me-3 border"
                  style={{ borderRadius: '15px', backgroundColor: '#fbfbfb' }}
                >
                  <p className="small mb-0">
                    Thank you, I really like your product.
                  </p>
                </div>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                  alt="avatar 1"
                  style={{ width: '45px', height: '100%' }}
                />
              </div>

              <MDBTextArea
                className="form-outline"
                label="Type your message"
                id="textAreaExample"
                rows={4}
                value={message?.message ?? ''}
                onChange={handleChangeMessage}
                onKeyDown={(event) => {
                  if (event.keyCode === 13) {
                    handleSendMessage();
                  }
                }}
              />
              <button
                className="btn btn-primary"
                onClick={handleSendMessage}
              >
                {isSending ? 'Loading' : 'Send'}
              </button>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <Toaster />
    </MDBContainer>
  );
}
