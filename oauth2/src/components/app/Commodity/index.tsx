import React, { useMemo, useState } from 'react';
import {
  Card,
  Row,
  Col,
  Tag,
  Space,
  Divider,
  Typography,
  Carousel,
  Tabs,
} from 'antd';
import { COMMODITIES } from '@/utilities/seeds/commodity.seed';
import { CarOutlined, FireOutlined, StarOutlined } from '@ant-design/icons';
import moment from 'moment';
import { truncateDescription } from '@/utilities/functions/text';
import { chunkArray } from '@/utilities/functions/array';
import type { TabsProps } from 'antd';

const { Meta } = Card;
const { Text } = Typography;

interface ItemCommodityProps {
  item: Commodity;
}

function ItemCommodity({ item }: Readonly<ItemCommodityProps>) {
  return (
    <>
      <Col
        key={item.id}
        xs={12}
        md={8}
        lg={6}
      >
        <Card
          hoverable
          cover={
            <img
              alt={item.name}
              src={item.imageUrl}
              style={{ borderRadius: '8px', border: '2px solid #f0f0f0' }}
            />
          }
        >
          <Meta
            title={item.name}
            description={
              <>
                <Space>
                  <Tag color="blue">
                    <StarOutlined /> Mới
                  </Tag>
                  <Tag color="green">
                    <FireOutlined /> Bán chạy
                  </Tag>
                  <Tag color="blue">
                    <StarOutlined /> Mới
                  </Tag>
                </Space>
                <div>{truncateDescription(item.description, 30)}</div>
                <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                  {`${item.price.toLocaleString()} VND`}
                </div>
                <Divider />

                <Space>
                  <CarOutlined style={{ color: '#1890ff' }} />
                  <Text>Giao chiều thứ 6 ({moment().format('DD/MM')})</Text>
                </Space>
              </>
            }
          />
        </Card>
      </Col>
    </>
  );
}

function ListItemCommodity() {
  const [listItems, setListItems] = useState<Commodity[]>(COMMODITIES);

  const chunkedItems = useMemo(() => chunkArray(listItems, 4), [listItems]);

  return (
    <Carousel
      autoplay
      arrows
    >
      {chunkedItems.map((group, index) => (
        <div key={index}>
          <Row gutter={[8, 8]}>
            {group.map((item) => (
              <ItemCommodity
                item={item}
                key={item.id}
              />
            ))}
          </Row>
        </div>
      ))}
    </Carousel>
  );
}

const CommodityComponent = () => {
  const items: TabsProps['items'] = useMemo(
    () => [
      {
        key: '1',
        label: 'Tab 1',
        children: <ListItemCommodity />,
      },
      {
        key: '2',
        label: 'Tab 2',
        children: <ListItemCommodity />,
      },
      {
        key: '3',
        label: 'Tab 3',
        children: <ListItemCommodity />,
      },
    ],
    []
  );

  return (
    <Col xs={24}>
      <Tabs
        defaultActiveKey="1"
        items={items}
      />
    </Col>
  );
};

export default CommodityComponent;
