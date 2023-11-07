import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { TabNames } from './constants';
import WalletInformation from './layout/wallet-information-tab';
import InteractiveForm from './layout/interactive-form';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const [activeTab, setActiveTab] = useState<TabNames>(TabNames.WalletInfo);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
              onClick: () => setActiveTab(TabNames.WalletInfo)
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
              onClick: () => setActiveTab(TabNames.InteractiveForm)
            }
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}
        >
          {activeTab === TabNames.WalletInfo ? (
            <WalletInformation />
          ) : (
            <InteractiveForm />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
