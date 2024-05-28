'use client';
import React from 'react';
import { Row, Col, Card, Carousel, Divider } from 'antd';
import {
  CarOutlined,
  GiftOutlined,
  MedicineBoxOutlined,
  CameraOutlined,
} from '@ant-design/icons';

const { Meta } = Card;

const contentStyle: React.CSSProperties = {
  height: '200px',
  color: '#fff',
  lineHeight: '200px',
  textAlign: 'center',
  background: '#364d79',
};

const itemStyle: React.CSSProperties = {
  marginBottom: '16px',
};

const gutter = { xs: 8, sm: 16 };

// Hàm để cắt chuỗi và hiển thị chỉ 2 dòng
const truncateDescription = (description: string) => {
  const maxLength = 30; // Độ dài tối đa của chuỗi
  if (description.length > maxLength) {
    return description.substring(0, maxLength).trim() + '...'; // Cắt chuỗi và thêm dấu "..."
  }
  return description;
};

function AdvertiseComponent() {
  return (
    <Col
      xs={24}
      sm={20}
      md={16}
      lg={12}
      xl={8}
    >
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
      <Divider />
      <div style={{ marginTop: '16px' }}>
        <Row gutter={gutter}>
          <Col
            xs={24}
            md={12}
            style={itemStyle}
          >
            <Card
              hoverable
              title="Xe hơi"
              extra={<CarOutlined />}
            >
              <Meta
                description={truncateDescription(
                  'Mua xe hơi mới giảm giá lớn!'
                )}
              />
            </Card>
          </Col>
          <Col
            xs={24}
            md={12}
            style={itemStyle}
          >
            <Card
              hoverable
              title="Quà tặng"
              extra={<GiftOutlined />}
            >
              <Meta
                description={truncateDescription(
                  'Mua quà tặng cho bạn bè và gia đình ngay hôm nay!'
                )}
              />
            </Card>
          </Col>
          <Col
            xs={24}
            md={12}
            style={itemStyle}
          >
            <Card
              hoverable
              title="Dược phẩm"
              extra={<MedicineBoxOutlined />}
            >
              <Meta
                description={truncateDescription(
                  'Chăm sóc sức khỏe của bạn với các sản phẩm dược phẩm chất lượng cao!'
                )}
              />
            </Card>
          </Col>
          <Col
            xs={24}
            md={12}
            style={itemStyle}
          >
            <Card
              hoverable
              title="Máy ảnh"
              extra={<CameraOutlined />}
            >
              <Meta
                description={truncateDescription(
                  'Nhiếp ảnh gia và người yêu nhiếp ảnh, đây là dành cho bạn!'
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </Col>
  );
}

const App: React.FC = () => {
  return (
    <>
      <AdvertiseComponent />
      <Divider type="vertical" />
    </>
  );
};

export default App;
