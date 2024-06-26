'use client';
import FormLogin from '@/components/auth/FormLogin';
import ModalCommon from '@/components/modal/ModalCommon';
import { chunkArray } from '@/utilities/functions/array';
import {
  Button,
  Card,
  Carousel,
  Col,
  Divider,
  Input,
  InputNumber,
  Rate,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import Image from 'next/image';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/stores';
import NextLink from 'next/link';
import {
  ArrowRightOutlined,
  CreditCardOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
  SmileOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import AddressForm from '@/components/app/Form/Address';
import SimilarCommodities from '@/components/app/Commodity/SimilarCommodities';
import { COMMODITIES } from '@/utilities/seeds';
import DiscountComponent from '@/components/app/Discount';
import { isNumber } from 'lodash';
import { KEYBOARD_NUMBERS } from '@/utilities/enums';
import Link from 'next/link';
// import CustomMap from '@/components/app/GoogleMap/Map';

const { Title, Text } = Typography;

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
            layout='fill'
            objectFit='contain'
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
              {group.map((item, index) => (
                <div key={index}>Link xem</div>
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

  const chunkedItems = useMemo(() => chunkArray(COMMODITIES, 4), []);

  const [isVisibleModalLogin, setIsVisibleModalLogin] =
    useState<boolean>(false);

  const [isVisibleModalDiscount, setIsVisibleModalDiscount] =
    useState<boolean>(false);

  const [isVisibleModalChangeAddress, setIsVisibleModalChangeAddress] =
    useState<boolean>(false);

  const { accessToken } = useAppSelector((state) => state.user);

  const [similarCommodities, setSimilarCommodities] = useState(
    chunkArray(COMMODITIES, 3)
  );

  const [count, setCount] = useState<number>(0);

  const handleClickLinkItem = useCallback(() => {
    if (accessToken) {
      router.push('/profile');
    } else {
      setIsVisibleModalLogin(!isVisibleModalLogin);
    }
  }, [accessToken, isVisibleModalLogin, router]);

  const CardTitle = useCallback(() => {
    return (
      <>
        <div style={{ marginTop: '8px' }}></div>
        <Tag color='magenta'>magenta</Tag>
        <Tag color='red'>red</Tag>
        <Tag color='volcano'>volcano</Tag>
        <Tag color='orange'>orange</Tag>
        <Text>
          Thương hiệu:{' '}
          <NextLink
            href={'/brand/Elmich'}
            className='ant-typography css-dev-only-do-not-override-j9bb5n'
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
        <Space align='center'>
          <Text>24</Text>
          <Rate
            allowHalf
            defaultValue={2.8}
          />
        </Space>
        <Text style={{ marginLeft: '8px' }}>(50)</Text>
        <Divider type='vertical' />
        <Text>Đã bán 257</Text>
        <br />
        <Space style={{ marginTop: '8px' }}>
          <Text
            type='danger'
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
            type='danger'
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
          direction='horizontal'
          style={{ width: '100%', justifyContent: 'space-between' }}
        >
          <Space.Compact
            direction='vertical'
            style={{ justifyContent: 'space-between' }}
            block
          >
            <Text strong>Thông tin vận chuyển</Text>
            <Text>Giao đến {`${addressString}`}</Text>
          </Space.Compact>
          <Space direction='vertical'>
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
            type='danger'
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
            type='success'
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
          content={
            <AddressForm handleCloseModal={setIsVisibleModalChangeAddress} />
          }
        />
      </div>
    );
  }, [addressString, handleClickChangeAddress, isVisibleModalChangeAddress]);

  const handleGetSimilarCommodities = useCallback(async () => {}, []);

  const handleShowGetMoreDiscountModal = useCallback(async () => {
    setIsVisibleModalDiscount(!isVisibleModalDiscount);
  }, [isVisibleModalDiscount]);

  const handleMinusCount = useCallback(() => {
    setCount(count - 1);
  }, [count]);

  const handleAddCount = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const handleChangeCountInput = useCallback((event: any) => {
    if (
      KEYBOARD_NUMBERS.NUMBER_0 < event.which &&
      event.which <= KEYBOARD_NUMBERS.NUMBER_9
    ) {
      setCount(+event.key);
      return;
    }
    if (
      KEYBOARD_NUMBERS.NUMPAD_0 < event.which &&
      event.which <= KEYBOARD_NUMBERS.NUMPAD_9
    ) {
      setCount(+event.key);
      return;
    }
  }, []);

  const handleClickBuyItem = useCallback(() => {
    if (accessToken) {
      alert('Mua item');
    } else {
      setIsVisibleModalLogin(!isVisibleModalLogin);
    }
  }, [accessToken, isVisibleModalLogin]);

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
                  align='middle'
                  gutter={[16, 16]}
                >
                  <Col flex='auto'>
                    <Title level={5}>Ưu đãi khác</Title>
                    <Text>4 Mã Giảm Giá</Text>
                  </Col>
                  <Space
                    direction='horizontal'
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
                      padding: '12px',
                      cursor: 'pointer',
                    }}
                    onClick={handleShowGetMoreDiscountModal}
                  />
                </Row>
              </Card>
            </Col>
            <Col xs={24}>
              <Card title='Sản phẩm tương tự'>
                <SimilarCommodities
                  productTag=''
                  chunkedItems={similarCommodities}
                />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col
          xs={24}
          md={6}
        >
          <Card title='Card title'>
            <Space direction='vertical'>
              <Title level={5}>Số lượng</Title>
              <Space>
                <Button
                  icon={<MinusOutlined />}
                  onClick={handleMinusCount}
                  disabled={count === 1}
                />
                <Input
                  value={count}
                  style={{ margin: '0 4px', width: 60, textAlign: 'center' }}
                  onKeyDown={handleChangeCountInput}
                />
                <Button
                  icon={<PlusOutlined />}
                  onClick={handleAddCount}
                />
              </Space>
            </Space>
            <Space
              direction='vertical'
              style={{ marginTop: '4px' }}
            >
              <Title level={5}>Tạm tính</Title>
              <InputNumber
                value={count}
                variant={'borderless'}
                style={{ width: '100%', marginTop: '-12px' }}
                formatter={(value) =>
                  `${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                readOnly
              />
            </Space>
            <Space
              direction='vertical'
              style={{ width: '100%', marginTop: '16px' }}
            >
              <Button
                type='primary'
                danger
                style={{
                  width: '100%',
                }}
                icon={<ShoppingCartOutlined />}
                onClick={handleClickBuyItem}
              >
                Mua ngay
              </Button>
              <Button
                style={{
                  width: '100%',
                }}
                icon={<PlusOutlined />}
                onClick={handleClickBuyItem}
              >
                Thêm vào giỏ
              </Button>
              <Button
                style={{
                  width: '100%',
                }}
                icon={<CreditCardOutlined />}
                onClick={handleClickBuyItem}
              >
                Mua trước trả sau
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
      {/* Form login */}
      <ModalCommon
        content={<FormLogin setIsVisible={setIsVisibleModalLogin} />}
        isVisible={isVisibleModalLogin}
        setIsVisible={setIsVisibleModalLogin}
      />

      {/* Danh sách discount */}
      <ModalCommon
        content={
          <>
            <DiscountComponent
              discountImgUrl='https://vcdn.tikicdn.com/cache/128x128/ts/seller/21/ce/5c/b52d0b8576680dc3666474ae31b091ec.jpg'
              dateExpired={new Date()}
              percentDiscount={50}
              conditionalDiscount={() => [
                'Giảm 100K cho đơn hàng từ 1 triệu.',
                'Áp dụng cho các sản phẩm thương hiệu FAMCO, Elmich, Smartcook của nhà bán Tiki Trading',
                'Mỗi khách hàng được sử dụng tối đa 2 lần.',
              ]}
              code='ELM100T0624'
            />
          </>
        }
        isVisible={isVisibleModalDiscount}
        setIsVisible={setIsVisibleModalDiscount}
        title='Mã giảm giá'
      />
    </>
  );
}

export default Item;
