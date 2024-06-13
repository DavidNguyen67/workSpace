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
  Button,
} from 'antd';
import { COMMODITIES } from '@/utilities/seeds/commodity.seed';
import { CarOutlined, FireOutlined, StarOutlined } from '@ant-design/icons';
import moment from 'moment';
import { truncateDescription } from '@/utilities/functions/text';
import { chunkArray } from '@/utilities/functions/array';
import type { TabsProps } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const { Meta } = Card;
const { Text } = Typography;

interface ItemCommodityProps {
  item: Commodity;
  onClick?: () => void;
  isShowTile?: boolean;
  isShowTags?: boolean;
  isShowInfoShip?: boolean;
  suffixCurrency?: string;
  currencyFontSize?: number | string;
  descriptionFontSize?: number | string;
  groupLength?: number;
}

export function ItemCommodity({
  item,
  onClick,
  isShowTile = true,
  isShowTags = true,
  isShowInfoShip = true,
  suffixCurrency = 'VND',
  currencyFontSize = '1.2em',
  descriptionFontSize = '1em',
  groupLength = 4,
}: Readonly<ItemCommodityProps>) {
  return (
    <>
      <Col
        key={item.id}
        xs={24}
        sm={12}
        lg={24 / groupLength}
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
                layout='fill'
                objectFit='contain'
                style={{ borderRadius: '8px', border: '2px solid #f0f0f0' }}
              />
            </div>
          }
        >
          <Meta
            title={isShowTile && item.name}
            description={
              <>
                {isShowTags && (
                  <>
                    <Space>
                      <Tag color='blue'>
                        <StarOutlined /> Mới
                      </Tag>
                      <Tag color='green'>
                        <FireOutlined /> Bán chạy
                      </Tag>
                    </Space>
                    <br />
                  </>
                )}
                <Text style={{ fontSize: descriptionFontSize }}>
                  {truncateDescription(item.description, 30)}
                </Text>
                <br />
                <Text
                  style={{ fontSize: currencyFontSize, fontWeight: 'bold' }}
                >
                  {`${item.price.toLocaleString()} ${suffixCurrency}`}
                </Text>

                {isShowInfoShip && (
                  <>
                    <Divider />
                    <Space>
                      <CarOutlined style={{ color: '#1890ff' }} />
                      <Text>Giao chiều thứ 6 ({moment().format('DD/MM')})</Text>
                    </Space>
                  </>
                )}
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
  const router = useRouter();

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
                onClick={() => router.push(`/item/${index}`)}
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
    <>
      <Button
        style={{ marginLeft: 'auto' }}
        type='primary'
      >
        Xem tất cả
      </Button>
      <Col xs={24}>
        <Tabs
          defaultActiveKey='1'
          items={items}
        />
      </Col>
    </>
  );
};

export default CommodityComponent;
