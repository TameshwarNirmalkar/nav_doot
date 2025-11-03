import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@ant-design/v5-patch-for-react-19';
import { StoreProviders } from '@redux-store/providers';
import { auth } from '@server/auth';
import theme from '@theme/themeConfig';
import { App, ConfigProvider } from 'antd';
import type { Metadata } from 'next';
import type { Session } from 'next-auth';
import { AuthProvider } from './Provider';
import 'animate.css';
import './globals.css';
import '../assets/css/loader.css';

export const metadata: Metadata = {
  title: 'Application',
  description: 'Book your slot',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = (await getServerAuthSession()) as Session;
  const authSession = (await auth()) as Session;

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <StoreProviders>
          <AuthProvider session={authSession}>
            <AntdRegistry>
              <ConfigProvider theme={theme}>
                <App>{children}</App>
              </ConfigProvider>
            </AntdRegistry>
          </AuthProvider>
        </StoreProviders>
      </body>
    </html>
  );
}
