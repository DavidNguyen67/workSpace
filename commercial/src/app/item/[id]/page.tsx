'use client';
import FormLogin from '@/components/auth/FormLogin';
import ModalCommon from '@/components/modal/ModalCommon';
import { chunkArray } from '@/utilities/functions/array';
import {
  Card,
  Carousel,
  Col,
  Divider,
  Rate,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/stores';
import NextLink from 'next/link';
import {
  ArrowRightOutlined,
  SmileOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import AddressForm from '@/components/app/Form/Address';
// import CustomMap from '@/components/app/GoogleMap/Map';

const { Title, Text, Paragraph } = Typography;

interface ItemImageProps {
  chunkedItems: any[][];
  handleClickLinkItem: () => void;
}

function ItemImage({
  chunkedItems,
  handleClickLinkItem,
}: Readonly<ItemImageProps>) {
  return (
    <Card
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
            alt={'Áo thun nam'}
            src={
              'https://salt.tikicdn.com/cache/280x280/ts/product/12/81/63/bba4b0b8f768037d2f39e864095c96c5.jpg.webp'
            }
            layout="fill"
            objectFit="contain"
            style={{ borderRadius: '8px', border: '2px solid #f0f0f0' }}
          />
        </div>
      }
    >
      <Carousel
        autoplay
        dots={false}
      >
        <div>item</div>
        <div>item</div>
        {chunkedItems.map((group, index) => (
          <div key={index}>
            <Row gutter={[8, 8]}>
              {group.map((item) => (
                <>Link xem</>
              ))}
            </Row>
          </div>
        ))}
      </Carousel>
      <Divider />
      <Text
        onClick={handleClickLinkItem}
        style={{ color: '#1677ff', cursor: 'pointer' }}
      >
        Ant Design Link
      </Text>
    </Card>
  );
}

interface ItemProps {
  params: { id: string };
}

function Item({ params }: Readonly<ItemProps>) {
  const ticketStyle = {
    border: '2px dashed #d9d9d9',
    padding: '4px',
    borderRadius: '4px',
    display: 'inline-block',
    margin: '4px 0',
  };
  const { addressString } = useAppSelector((state) => state.user);
  const router = useRouter();
  const chunkedItems = useMemo(() => chunkArray([], 4), []);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [isVisibleModalChangeAddress, setIsVisibleModalChangeAddress] =
    useState<boolean>(false);
  const { accessToken } = useAppSelector((state) => state.user);
  const [similarCommodities, setSimilarCommodities] = useState([]);

  const handleClickLinkItem = useCallback(() => {
    if (accessToken) {
      router.push('/profile');
    } else {
      setIsVisibleModal(!isVisibleModal);
    }
  }, [accessToken, isVisibleModal, router]);

  const CardTitle = useCallback(() => {
    return (
      <>
        <div style={{ marginTop: '8px' }}></div>
        <Tag color="magenta">magenta</Tag>
        <Tag color="red">red</Tag>
        <Tag color="volcano">volcano</Tag>
        <Tag color="orange">orange</Tag>
        <Text>
          Thương hiệu:{' '}
          <NextLink
            href={'/brand/Elmich'}
            className="ant-typography css-dev-only-do-not-override-j9bb5n"
          >
            Elmich
          </NextLink>
        </Text>
        <Title
          level={3}
          style={{ marginTop: '8px' }}
        >
          h3. Ant Design
        </Title>
        <Space align="center">
          <Text>24</Text>
          <Rate
            allowHalf
            defaultValue={2.8}
          />
        </Space>
        <Text style={{ marginLeft: '8px' }}>(50)</Text>
        <Divider type="vertical" />
        Đã bán 257
        <Space style={{ marginTop: '8px' }}>
          <Text
            type="danger"
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            999.000₫
          </Text>
          <Text
            delete
            style={{
              marginLeft: '8px',
              color: '#999',
            }}
          >
            2.080.000₫
          </Text>
          <Text
            type="danger"
            style={{
              marginLeft: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            -52%
          </Text>
        </Space>
      </>
    );
  }, []);

  const handleClickChangeAddress = useCallback(() => {
    setIsVisibleModalChangeAddress(true);
  }, []);

  const CardBody = useCallback(() => {
    return (
      <div>
        <Space
          direction="horizontal"
          style={{ width: '100%', justifyContent: 'space-between' }}
        >
          <Space.Compact
            direction="vertical"
            style={{ justifyContent: 'space-between' }}
            block
          >
            <Text strong>Thông tin vận chuyển</Text>
            <Text>Giao đến {`${addressString}`}</Text>
          </Space.Compact>
          <Space direction="vertical">
            <Text
              style={{
                marginLeft: '8px',
                color: '#1677ff',
                cursor: 'pointer',
              }}
              onClick={handleClickChangeAddress}
            >
              Đổi
            </Text>
          </Space>
        </Space>
        <div style={{ margin: '8px 0' }}>
          <Title level={5}>
            <ThunderboltOutlined
              style={{ marginRight: '8px', color: '#f5222d' }}
            />
            Giao siêu tốc 2h
          </Title>
          <Text>Trước 10h ngày mai: </Text>
          <Text
            type="danger"
            strong
          >
            12.000₫
          </Text>
          <Text
            delete
            style={{ marginLeft: '8px', color: '#999' }}
          >
            37.000₫
          </Text>
          <Title level={5}>
            <SmileOutlined style={{ marginRight: '8px', color: '#faad14' }} />
            Giao đúng chiều mai
          </Title>
          <Text>13h - 18h, 01/06: </Text>
          <Text
            type="success"
            strong
          >
            Miễn phí
          </Text>
          <Text
            delete
            style={{ marginLeft: '8px', color: '#999' }}
          >
            25.000₫
          </Text>
        </div>
        <ModalCommon
          isVisible={isVisibleModalChangeAddress}
          setIsVisible={setIsVisibleModalChangeAddress}
          content={<AddressForm afterSubmit={setIsVisibleModalChangeAddress} />}
        />
      </div>
    );
  }, [addressString, handleClickChangeAddress, isVisibleModalChangeAddress]);

  const handleGetSimilarCommodities = useCallback(async () => {}, []);

  return (
    <>
      <Row gutter={[16, 8]}>
        <Col
          xs={24}
          md={8}
        >
          <ItemImage
            chunkedItems={chunkedItems}
            handleClickLinkItem={handleClickLinkItem}
          />
        </Col>
        <Col
          xs={24}
          md={10}
        >
          <Row gutter={[0, 16]}>
            <Col xs={24}>
              <Card title={<CardTitle />}>
                <CardBody />
              </Card>
            </Col>
            <Col xs={24}>
              <Card>
                <Row
                  align="middle"
                  gutter={[16, 16]}
                >
                  <Col flex="auto">
                    <Title level={5}>Ưu đãi khác</Title>
                    <Text>4 Mã Giảm Giá</Text>
                  </Col>
                  <Space
                    direction="horizontal"
                    style={{ marginRight: '8px' }}
                  >
                    <div style={ticketStyle}>
                      <Text style={{ fontSize: '12px' }}>
                        Giảm 70K <SmileOutlined style={{ color: '#52c41a' }} />
                      </Text>
                    </div>
                    <div style={ticketStyle}>
                      <Text style={{ fontSize: '12px' }}>
                        Giảm 15K{' '}
                        <ThunderboltOutlined style={{ color: '#faad14' }} />
                      </Text>
                    </div>
                  </Space>

                  <ArrowRightOutlined
                    style={{
                      fontSize: '24px',
                      margin: '0 auto',
                    }}
                  />
                </Row>
              </Card>
            </Col>
            <Col xs={24}>
              <Card title="Sản phẩm tương tự"></Card>
            </Col>
          </Row>
        </Col>
        <Col
          xs={24}
          md={6}
        >
          <Card title="Card title">Card content</Card>
        </Col>
      </Row>
      <ModalCommon
        content={<FormLogin setIsVisible={setIsVisibleModal} />}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      />
    </>
  );
}

export default Item;
