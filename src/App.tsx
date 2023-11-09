import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import { Provider } from 'react-redux';
import MainLayout from './pages/main-layout';
import { store } from './store';
import { appConnectors } from './web3/connectors';

const App: React.FC = () => {
  return (
    <Web3ReactProvider connectors={appConnectors}>
      <Provider store={store}>
        <MainLayout />
      </Provider>
    </Web3ReactProvider>
  );
};

export default App;
