import {
  Button,
  Card,
  Carousel,
  Col,
  Progress,
  Row,
  Space,
  Typography,
} from 'antd';
import { ItemCommodity } from '../Commodity';
import { useMemo, useState } from 'react';
import { COMMODITIES } from '@/utilities/seeds/commodity.seed';
import { chunkArray } from '@/utilities/functions/array';
import Meta from 'antd/es/card/Meta';
import Image from 'next/image';

const { Text } = Typography;

interface ItemCommodityHotProps {
  item: Commodity;
  onClick?: () => void;
}

function ItemCommodityHot({ item, onClick }: Readonly<ItemCommodityHotProps>) {
  return (
    <>
      <Col
        key={item.id}
        xs={12}
        lg={6}
      >
        <Card
          hoverable
          onClick={onClick}
          cover={
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                padding: '50%',
              }}
            >
              <Image
                alt={item.name}
                src={item.imageUrl}
                layout="fill"
                objectFit="contain"
                style={{ borderRadius: '8px', border: '2px solid #f0f0f0' }}
              />
            </div>
          }
        >
          <Meta
            style={{ textAlign: 'center' }}
            description={
              <>
                <Text
                  style={{
                    fontSize: '1.2em',
                    fontWeight: 'bold',
                  }}
                >
                  {`${item.price.toLocaleString()} VND`}
                </Text>
                <Progress
                  percent={70}
                  size="small"
                />
              </>
            }
          />
        </Card>
      </Col>
    </>
  );
}

function HotCommodities() {
  const [listItems, setListItems] = useState<Commodity[]>(COMMODITIES);
  const chunkedItems = useMemo(() => chunkArray(listItems, 4), [listItems]);

  return (
    <>
      <Button
        style={{ marginLeft: 'auto' }}
        type="primary"
      >
        Xem tất cả
      </Button>
      <Col xs={24}>
        <Carousel
          autoplay
          arrows
        >
          {chunkedItems.map((group, index) => (
            <div key={index}>
              <Row gutter={[8, 8]}>
                {group.map((item) => (
                  <ItemCommodityHot
                    item={item}
                    key={item.id}
                  />
                ))}
              </Row>
            </div>
          ))}
        </Carousel>
      </Col>
    </>
  );
}

export default HotCommodities;
