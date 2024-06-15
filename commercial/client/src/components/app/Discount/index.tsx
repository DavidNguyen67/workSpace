'use client';
import React, { useCallback, useMemo } from 'react';
import { Row, Col, Typography, Button, Popover, List } from 'antd';
import { CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';

const { Text, Title, Paragraph } = Typography;

interface DiscountComponentProps {
  code?: string;
  discountImgUrl?: string;
  percentDiscount?: number;
  conditionalDiscount?: () => string[];
  dateExpired?: Date;
}

function DiscountComponent({
  code,
  discountImgUrl,
  percentDiscount,
  conditionalDiscount,
  dateExpired,
}: Readonly<DiscountComponentProps>) {
  const content = useMemo(
    () => (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <Text
            strong
            style={{ marginRight: 4 }}
          >
            Mã giảm giá:
          </Text>
          <Paragraph
            copyable
            style={{ margin: 0 }}
          >
            {code}
          </Paragraph>
        </div>
        <div style={{ marginBottom: 8 }}>
          <Text strong>HSD:</Text>
          <Text>
            {dateExpired ? dateExpired.toLocaleDateString() : 'Không có'}
          </Text>
        </div>
        <div style={{ marginBottom: 8 }}>
          <Text strong>Điều kiện:</Text>
          {conditionalDiscount ? (
            <List
              dataSource={conditionalDiscount()}
              renderItem={(item) => (
                <List.Item>
                  <CheckCircleOutlined
                    style={{
                      color: item ? '#52c41a' : 'inherit',
                      marginRight: 8,
                    }}
                  />
                  {item}
                </List.Item>
              )}
              size='small'
              bordered
            />
          ) : (
            <Text>Không có</Text>
          )}
        </div>
      </div>
    ),
    [code, conditionalDiscount, dateExpired]
  );

  return (
    <>
      <Row
        align='middle'
        gutter={[8, 0]}
      >
        {discountImgUrl && (
          <Col span={4}>
            <Image
              src={discountImgUrl}
              alt='Discount'
              width={60}
              height={60}
            />
          </Col>
        )}
        <Col span={20}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Title level={4}>
              {percentDiscount ? `Giảm ${percentDiscount}%` : 'Giảm giá'}
            </Title>
            <Popover
              content={content}
              trigger='hover'
            >
              <InfoCircleOutlined
                style={{
                  marginLeft: 'auto',
                  marginRight: '12px',
                  color: '#1890ff',
                  padding: '10px',
                }}
              />
            </Popover>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {dateExpired && (
              <Text type='secondary'>
                HSD: {dateExpired.toLocaleDateString()}
              </Text>
            )}
            <Button
              style={{ marginLeft: 'auto' }}
              type='primary'
            >
              Use
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default DiscountComponent;
