'use client';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { GoogleOAuthProvider } from '@react-oauth/google';

function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AntdRegistry>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID || ''}>
        {children}
      </GoogleOAuthProvider>
    </AntdRegistry>
  );
}

export default Wrapper;
