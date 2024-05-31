import React, { useState, useEffect } from 'react';
import { Row, Col, Input } from 'antd';

const Countdown: React.FC = () => {
  const [hours, setHours] = useState<number>(1);
  const [minutes, setMinutes] = useState<number>(1);
  const [seconds, setSeconds] = useState<number>(1);

  useEffect(() => {
    const interval = setInterval(() => {}, 1000);

    return () => clearInterval(interval);
  }, [minutes, hours, seconds]);

  return (
    <Row
      align="middle"
      justify="center"
      gutter={8}
    >
      <Col xs={8}>
        <Input
          value={String(hours).padStart(2, '0')}
          style={{
            width: '50px',
            textAlign: 'center',
            marginRight: '5px',
          }}
          readOnly
        />
        <span style={{ fontSize: '24px', lineHeight: '32px' }}>:</span>
      </Col>
      <Col xs={8}>
        <Input
          value={String(minutes).padStart(2, '0')}
          style={{
            width: '50px',
            textAlign: 'center',
            margin: '0 5px',
          }}
          readOnly
        />
        <span style={{ fontSize: '24px', lineHeight: '32px' }}>:</span>
      </Col>
      <Col xs={8}>
        <Input
          value={String(seconds).padStart(2, '0')}
          style={{
            width: '50px',
            textAlign: 'center',
            marginLeft: '10px',
          }}
          readOnly
        />
      </Col>
    </Row>
  );
};

export default Countdown;
