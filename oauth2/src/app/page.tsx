'use client';
import React, { useState } from 'react';
import { Row, Col, Card, Carousel, Divider } from 'antd';
import { CarOutlined } from '@ant-design/icons';
import { truncateDescription } from '@/utilities/functions/text';
import ItemCard from '@/components/renderItem/Item';

const { Meta } = Card;

const contentStyle: React.CSSProperties = {
  height: '35vh',
  color: '#fff',
  lineHeight: '35vh',
  textAlign: 'center',
  background: '#364d79',
};

function AdvertiseComponent() {
  return (
    <Col
      xs={24}
      lg={12}
    >
      <Row gutter={[8, 8]}>
        <Row gutter={[8, 8]}>
          <Col xs={24}>
            <Carousel autoplay>
              <div>
                <h3 style={contentStyle}>1</h3>
              </div>
              <div>
                <h3 style={contentStyle}>2</h3>
              </div>
              <div>
                <h3 style={contentStyle}>3</h3>
              </div>
              <div>
                <h3 style={contentStyle}>4</h3>
              </div>
            </Carousel>
          </Col>
        </Row>
        <Divider />
        <Row gutter={[8, 8]}>
          {Array.from(
            [1, 2, 3, 4].map((item) => (
              <Col
                xs={24}
                lg={12}
                key={item}
              >
                <Card
                  hoverable
                  title="Xe hơi"
                  extra={<CarOutlined />}
                >
                  <Meta
                    description={truncateDescription(
                      'Mua xe hơi mới giảm giá lớn!',
                      15
                    )}
                  />
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Row>
    </Col>
  );
}

const ListItem = () => {
  // const [listItems, setListItems] = useState<>([]);

  return (
    <>
      <Col
        xs={24}
        lg={12}
      >
        <Row gutter={[8, 8]}>
          {Array.from(
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <Col
                key={item}
                xs={24}
                lg={12}
                xl={8}
              >
                <ItemCard />
              </Col>
            ))
          )}
        </Row>
      </Col>
    </>
  );
};

const App: React.FC = () => {
  return (
    <>
      <AdvertiseComponent />
      <ListItem />
    </>
  );
};

export default App;
