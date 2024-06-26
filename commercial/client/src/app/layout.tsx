import type { Metadata } from 'next';
import Wrapper from '@/components/app/Wrapper';
import 'antd/dist/reset.css';
import Container from './Container';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Wrapper>
          <Container>{children}</Container>
        </Wrapper>
      </body>
    </html>
  );
}
