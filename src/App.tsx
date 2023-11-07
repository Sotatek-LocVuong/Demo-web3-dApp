import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import { Button, Flex, Layout, Menu, Space, theme } from 'antd';
import React, { useState } from 'react';
import Web3 from 'web3';
import JsonERC20Abi from './constants/abi/ERC20_ABI.json';
import InteractiveForm from './layout/interactive-form';
import WalletInformation from './layout/wallet-information-tab';
import { TabNames, TokenBalanceType } from './models';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const [activeTab, setActiveTab] = useState<TabNames>(TabNames.WalletInfo);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [tokenList, setTokenList] = useState<TokenBalanceType[]>([]);

  const onConnectWallet = async () => {
    try {
      await (window as any)?.ethereum.request({
        method: 'eth_requestAccounts'
      });
      const web3 = new Web3((window as any)?.ethereum);
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);
      // const tokenName = await web3.eth.getCoinbase();
      if (accounts[0]) {
        setIsConnected(true);
        setWalletAddress(accounts[0]);
        setTokenList([
          {
            balance: +web3.utils.fromWei(balance, 'ether'),
            tokenName: 'tBNB',
            type: 'Native'
          }
        ]);
      }

      const GBCAddress = '0xBfa64AB5dbdA007E3d4FB3a57A32C799BFDe13f9';
      // const GBCAddress = process.env.GBC_CONTRACT_ADDRESS;
      console.log('accounts', accounts, balance, GBCAddress);
      const GBCContract = new web3.eth.Contract(JsonERC20Abi, GBCAddress);
      const gbcBalance = await (GBCContract.methods.balanceOf as any)(
        accounts[0]
      ).call();
      // const gbcBalance = await GBCContract.methods.balanceOf(accounts[0]).call();

      console.log('gbcBalance', gbcBalance);
    } catch (err) {
      console.log(err);
    }
  };

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
              label: 'Wallet Information',
              onClick: () => setActiveTab(TabNames.WalletInfo)
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Make transactions',
              onClick: () => setActiveTab(TabNames.InteractiveForm)
            }
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ padding: '0 20px 0 0', background: colorBgContainer }}>
          <Flex justify="space-between" align="center">
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
            {!isConnected ? (
              <Button type="primary" onClick={onConnectWallet}>
                Connect Wallet
              </Button>
            ) : (
              <Space style={{ color: 'blue' }}> Connected to MetaMask!</Space>
            )}
          </Flex>
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
            <WalletInformation address={walletAddress} balances={tokenList} />
          ) : (
            <InteractiveForm />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
