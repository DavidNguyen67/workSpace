import React, { useState, useEffect } from 'react';
import { Row, Col, Input } from 'antd';

const Countdown: React.FC = () => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          if (minutes === 0 && hours === 0) {
            clearInterval(interval);
            return 0;
          } else if (minutes === 0) {
            setHours((prevHours) => prevHours - 1);
            setMinutes(59);
            return 59;
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            return 59;
          }
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, hours]);

  return (
    <Row
      align="middle"
      justify="center"
    >
      <Col>
        <Input
          value={String(hours).padStart(2, '0')}
          style={{
            width: '50px',
            textAlign: 'center',
            marginRight: '5px',
          }}
          readOnly
        />
      </Col>
      <span style={{ fontSize: '24px', lineHeight: '32px' }}>:</span>
      <Col>
        <Input
          value={String(minutes).padStart(2, '0')}
          style={{
            width: '50px',
            textAlign: 'center',
            margin: '0 5px',
          }}
          readOnly
        />
      </Col>
      <span style={{ fontSize: '24px', lineHeight: '32px' }}>:</span>
      <Col>
        <Input
          value={String(seconds).padStart(2, '0')}
          style={{
            width: '50px',
            textAlign: 'center',
            marginLeft: '5px',
          }}
          readOnly
        />
      </Col>
    </Row>
  );
};

export default Countdown;
