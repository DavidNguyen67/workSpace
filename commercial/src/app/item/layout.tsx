import { Col } from 'antd';

export default function ItemLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <Col xs={24}>{children}</Col>;
}
