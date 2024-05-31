'use client';
import React, { useMemo, useState } from 'react';
import {
  Row,
  Col,
  Card,
  Carousel,
  Divider,
  Typography,
  Space,
  Button,
} from 'antd';
import { chunkArray, takeItems } from '@/utilities/functions/array';
import { ADVERTISEMENTS } from '@/utilities/seeds';
import CommodityComponent from '@/components/app/Commodity';
import { truncateDescription } from '@/utilities/functions/text';
import { LikeOutlined } from '@ant-design/icons';
import Countdown from '@/components/time/Countdown';
import HotCommodities from '@/components/app/hotCommodity/HotCommodities';

const { Meta } = Card;
const { Title } = Typography;

const contentStyle: React.CSSProperties = {
  height: '39vh',
  color: '#fff',
  lineHeight: '39vh',
  textAlign: 'center',
  background: '#364d79',
};

function AdvertiseComponent() {
  const [listItems, setListItems] = useState<Advertisement[]>(
    takeItems(ADVERTISEMENTS, 6)
  );
  return (
    <Col
      xs={24}
      lg={12}
    >
      <Row gutter={[8, 8]}>
        <Col xs={24}>
          <Carousel
            autoplay
            arrows
          >
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
        <Divider />
        {listItems.map((item) => (
          <Col
            xs={12}
            lg={8}
            key={item.id}
          >
            <Card hoverable>
              <Meta
                title={item.label}
                avatar={item.icon}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </Col>
  );
}

const ListAdvertise = () => {
  const [listItems, setListItems] = useState<Advertisement[]>(ADVERTISEMENTS);

  const chunkedItems = useMemo(() => chunkArray(listItems, 8), [listItems]);

  return (
    <>
      <Col
        xs={24}
        lg={12}
      >
        <Carousel
          autoplay
          dots={false}
        >
          {chunkedItems.map((group, index) => (
            <div key={index}>
              <Row gutter={[8, 8]}>
                {group.map((item) => (
                  <Col
                    key={item.id}
                    xs={24}
                    md={12}
                  >
                    <Card
                      hoverable
                      onClick={() => {}}
                    >
                      <Meta
                        title={item.label}
                        avatar={item.icon}
                        description={`${truncateDescription(
                          item.description,
                          45
                        )}`}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Carousel>
      </Col>
    </>
  );
};

const App: React.FC = () => {
  return (
    <>
      <AdvertiseComponent />
      <ListAdvertise />
      <Divider>
        <Title level={4}>
          <Space>
            <LikeOutlined />
            TOP DEAL SIÊU RẺ
          </Space>
        </Title>
      </Divider>
      <CommodityComponent />
      {/* <Divider>
        <Title level={4}>
          <Space>Hàng xịn giá sốc</Space>
        </Title>
        <Countdown />
      </Divider>
      <HotCommodities />
      <Divider>
        <Title level={4}>
          <Space>BẠN CÓ THỂ THÍCH</Space>
        </Title>
      </Divider>
      <CommodityComponent /> */}
    </>
  );
};

export default App;
