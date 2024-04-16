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
import { getMessages } from '../utilities/services/message.service';

export default function ChatBox(props: {
  recipientId: string;
  roomId: string;
}) {
  const { recipientId, roomId } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetMessage = useCallback(async () => {
    setIsLoading(true);
    const response = await getMessages(roomId);
    console.log(response);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    handleGetMessage();
  }, []);

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

      <MDBCardBody className="overflow-y-scroll ">
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
              backgroundColor: '#fbfbfb',
            }}
          >
            <p className="small mb-0">
              Hello and thank you for visiting MDBootstrap. Please click the
              video below.
            </p>
          </div>
        </div>

        <div className="d-flex flex-row justify-content-end mb-4">
          <div
            className="p-3 me-3 border"
            style={{
              borderRadius: '15px',
              backgroundColor: 'rgba(57, 192, 237,.2)',
            }}
          >
            <p className="small mb-0">Thank you, I really like your product.</p>
          </div>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
            alt="avatar 1"
            style={{ width: '45px', height: '100%' }}
          />
        </div>
      </MDBCardBody>
      <div className="row m-2">
        <div className="col-10">
          <MDBTextArea
            className="form-outline "
            label="Type your message"
            id="textAreaExample"
            rows={2}
            disabled={isLoading}
          />
        </div>
        <div className="col-2">
          <MDBBtn
            className="w-100 h-100 "
            // onClick={handleSendMessage}
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
