import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import config from '../config.json';

import {
  loadProvider,
  loadNetwork,
  loadAccount,
  loadTokens,
  loadExchange,
  loadAllOrders,
  subscribeToEvents,
} from '../store/interactions';

import Navbar from './Navbar';
import Markets from './Markets';
import Balance from './Balance';
import Order from './Order';
import PriceChart from './PriceChart';
import Transactions from './Transactions';
import Trades from './Trades';
import Orderbook from './Orderbook';
import Alert from './Alert';

function App() {
  const dispatch = useDispatch();

  const loadBlockchainData = async () => {
    // Connect ethers to blockchain
    const provider = loadProvider(dispatch);

    // Fetch current netrworks chain ID (hardhat: 31337, kovan: 42)
    const chainId = await loadNetwork(provider, dispatch);

    // Reload page when network changes
    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });

    // Fetch current account & balance from Metamask when changed
    window.ethereum.on('accountsChanged', () => {
      loadAccount(provider, dispatch);
    });

    // load token smart contracts
    const Nox = config[chainId].Nox;
    const Spud = config[chainId].Spud;
    const NFL = config[chainId].NFL;
    await loadTokens(
      provider,
      [Nox.address, Spud.address, NFL.address],
      dispatch
    );

    // Load exchange contract
    const exchangeConfig = config[chainId].exchange;
    const exchange = await loadExchange(
      provider,
      exchangeConfig.address,
      dispatch
    );

    // Fetch all orders, open, filled, cancelled
    loadAllOrders(provider, exchange, dispatch);

    // Listen to events
    subscribeToEvents(exchange, dispatch);
  };

  useEffect(() => {
    loadBlockchainData();
    // Do more stuff here...
  });

  return (
    <div>
      <Navbar />

      <main className="exchange grid">
        <section className="exchange__section--left grid">
          <Markets />

          <Balance />

          <Order />
        </section>
        <section className="exchange__section--right grid">
          <PriceChart />
          <Transactions />
          <Trades />
          <Orderbook />
        </section>
      </main>

      <Alert />
    </div>
  );
}

export default App;
