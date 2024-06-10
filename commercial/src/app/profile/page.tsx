'use client';
import React from 'react';
import { Avatar, Card, Col, Row, Typography, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Image from 'next/image';

const { Title, Paragraph } = Typography;

const ProfileCard = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{ height: '100vh' }}
    >
      <Col span={8}>
        <Card
          style={{ width: 300 }}
          actions={[<Button key="edit">Edit Profile</Button>]}
        >
          <Card.Meta
            avatar={
              <Avatar
                size={64}
                icon={<UserOutlined />}
              />
            }
            title="John Doe"
            description="Software Engineer"
          />
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante.
          </Paragraph>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfileCard;
