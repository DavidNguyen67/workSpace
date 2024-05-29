'use client';
import React, { useCallback, useMemo, useState } from 'react';
import {
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  GlobalOutlined,
  MoonOutlined,
  BookOutlined,
  ShopOutlined,
  TagsOutlined,
  WomanOutlined,
  ManOutlined,
  ToolOutlined,
  SyncOutlined,
  LikeOutlined,
  DollarOutlined,
  InboxOutlined,
  BarcodeOutlined,
  FireOutlined,
  AppstoreOutlined,
  AntDesignOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Row, Typography, theme } from 'antd';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAppSelector } from '@/redux/stores';
import { useRouter } from 'next/navigation';
import ModalCommon from '@/components/modal/ModalCommon';
import FormLogin from '@/components/auth/FormLogin';
import './Container.css';

const { Content, Footer, Sider, Header } = Layout;
const { Text, Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const productCategories = [
  { label: 'Nhà Sách Tiki', icon: <BookOutlined /> },
  { label: 'Nhà Cửa - Đời Sống', icon: <HomeOutlined /> },
  { label: 'Balo và Vali', icon: <ShopOutlined /> },
  { label: 'Voucher - Dịch vụ', icon: <TagsOutlined /> },
  { label: 'Túi thời trang nữ', icon: <WomanOutlined /> },
  { label: 'Túi thời trang nam', icon: <ManOutlined /> },
  { label: 'Chăm sóc nhà cửa', icon: <ToolOutlined /> },
];
const featuredItems = [
  { label: 'Tiki Exchange', icon: <SyncOutlined /> },
  { label: 'Tốt & Nhanh', icon: <LikeOutlined /> },
  { label: 'Giá Rẻ Mỗi Ngày', icon: <DollarOutlined /> },
  { label: 'Xả kho', icon: <InboxOutlined /> },
  { label: 'Mã giảm giá', icon: <BarcodeOutlined /> },
];

const Container = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { accessToken } = useAppSelector((state) => state.user);
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const pathname = usePathname();
  const breadcrumbItems = useMemo(() => {
    const paths = pathname.split('/').filter((path) => path);
    return (
      <Breadcrumb
        items={[
          { title: <Link href="/">Home</Link> },
          ...paths.map((item) => ({
            title: <Link href={`/${item}`}>{item}</Link>,
          })),
        ]}
      />
    );
  }, [pathname]);
  const handleClickAccountTab = useCallback(() => {
    if (accessToken) {
      router.push('/profile');
    } else {
      setIsVisibleModal(!isVisibleModal);
    }
  }, [accessToken, isVisibleModal, router]);

  const items: MenuItem[] = useMemo(
    () => [
      getItem(<Link href={'/'}>Home</Link>, '1', <HomeOutlined />),
      getItem(
        <Text
          onClick={handleClickAccountTab}
          style={{ color: 'white' }}
        >
          Account
        </Text>,
        '2',
        <UserOutlined />
      ),
      getItem('Cart', '3', <ShoppingCartOutlined />),
      getItem('Setting', 'sub1', <SettingOutlined />, [
        getItem('Theme', '4', <MoonOutlined />),
        getItem('Language', '5', <GlobalOutlined />, [
          getItem('Tiếng Việt - VI', '6', null),
          getItem('English - EN', '7', null),
        ]),
      ]),
    ],
    [handleClickAccountTab]
  );

  const sidebarItems = useMemo(
    () => [
      getItem(
        'Danh mục',
        'sub2',
        <AppstoreOutlined />,
        productCategories.map((category, index) =>
          getItem(
            <Link href={`/category/${index + 1}`}>{category.label}</Link>,
            `sub2-${index + 1}`,
            category.icon
          )
        )
      ),
      getItem(
        'Nổi bật',
        'sub3',
        <FireOutlined />,
        featuredItems.map((item, index) =>
          getItem(
            <Link href={`/featured/${index + 1}`}>{item.label}</Link>,
            `sub3-${index + 1}`,
            item.icon
          )
        )
      ),
      getItem(
        <Link href="/tiki-market">Bán hàng cùng tiki</Link>,
        'sub4',
        <ShopOutlined />
      ),
    ],
    []
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#001529',
        }}
      >
        <Link href={'/'}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <AntDesignOutlined
              style={{ fontSize: '24px', color: '#fff', marginRight: '10px' }}
            />
            <Title
              level={3}
              style={{ color: '#fff', marginBottom: '0' }}
            >
              Ant Design
            </Title>
          </div>
        </Link>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
        />
      </Header>
      <Layout style={{ marginTop: 64 }}>
        <Sider
          collapsible
          collapsed={collapsed}
          width={'15vw'}
          className="custom-scrollbar"
          onCollapse={(value) => setCollapsed(value)}
          style={{
            position: 'fixed',
            left: 0,
            height: '100vh',
            overflow: 'auto',
            zIndex: 1,
          }}
        >
          <Menu
            theme="dark"
            mode="inline"
            items={sidebarItems}
          />
        </Sider>
        <Layout
          style={{ marginLeft: collapsed ? 80 : 200, padding: '0 24px 24px' }}
        >
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            {breadcrumbItems}
            <div
              style={{
                padding: 24,
                background: '#fff',
                minHeight: '75vh',
              }}
            >
              <Row gutter={[16, 8]}>{children}</Row>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
      <ModalCommon
        content={<FormLogin setIsVisible={setIsVisibleModal} />}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      />
    </Layout>
  );
};

export default Container;
