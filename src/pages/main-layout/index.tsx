/* eslint-disable */
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SwapOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Button, Flex, Layout, Menu, Space, theme } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import Web3 from 'web3';
import { ConnectWalletModal } from '../../components/modals/connect-wallet-modal';
import { WalletOptions } from '../../constants';
import { TabNames, TokenBalanceType } from '../../models';
import TransactionForm from '../../pages/transaction-form/index';
import WalletInformation from '../../pages/wallet-information/index';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  getBalance,
  getUserAddress,
  getWalletName
} from '../../store/selectors';
import { walletActions } from '../../store/slides';
import {
  ERC20Abi,
  BEP20Abi,
  REACT_APP_BSC_TESTNET_CONTRACT_ADDRESS,
  REACT_APP_BSC_TESTNET_RPC_URL,
  REACT_APP_GBC_CONTRACT_ADDRESS
} from '../../web3/constants';
import { useNativeContract } from '../../web3/hooks/useNativeContract';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const { isActive, account, provider } = useWeb3React();

  const wallet = useAppSelector(getWalletName);
  const userAddress = useAppSelector(getUserAddress);
  const balance = useAppSelector(getBalance);
  const dispatch = useAppDispatch();

  const { getTokenBalance } = useNativeContract();

  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<TabNames>(TabNames.WalletInfo);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const tokenList: TokenBalanceType[] = useMemo(() => {
    if (!wallet) {
      return [];
    }

    return [
      {
        type: 'Native',
        tokenName: 'tBNB',
        balance: balance || ''
      }
    ];
  }, [balance, wallet]);

  const onConnectWallet = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {}, [isActive]);
  useEffect(() => {
    dispatch(walletActions.setUserAddress(account ?? null));
    if (account && provider) {
      getTokenBalance();
    }
  }, [account, provider]);

  return (
    <Layout className="container">
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
              icon: <SwapOutlined />,
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
            {!userAddress ? (
              <Button type="primary" onClick={onConnectWallet}>
                Connect Wallet
              </Button>
            ) : (
              <Space style={{ color: 'blue' }}>
                Connected to {wallet?.trim()}!
              </Space>
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
            <WalletInformation
              walletAddress={userAddress}
              balances={tokenList}
            />
          ) : (
            <TransactionForm />
          )}
        </Content>
      </Layout>
      {isModalOpen && (
        <ConnectWalletModal
          wallets={WalletOptions}
          isOpened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Layout>
  );
};

export default MainLayout;
