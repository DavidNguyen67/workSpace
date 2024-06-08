'use client';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from '@/amplifyconfiguration.json';
import { Amplify } from 'aws-amplify';
import { Layout, notification } from 'antd';

Amplify.configure(config);

const { Content } = Layout;

function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AntdRegistry>
        <Layout style={{ padding: '24px' }}>
          <Content>{children}</Content>
        </Layout>
      </AntdRegistry>
    </>
  );
}

export default withAuthenticator(Wrapper);
