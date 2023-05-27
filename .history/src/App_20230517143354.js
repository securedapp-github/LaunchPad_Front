
import '@rainbow-me/rainbowkit/dist/index.css';
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import React, { Component }  from 'react';

import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css'
import Sidebar from './Components/sidebar.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const { chains, provider } = configureChains(
  [chain.polygonMumbai, chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [alchemyProvider({ alchemyId: "IItFVmzc5gWClV0ba3hDDdqtppKw-9OP" }), publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "SecureDApp_Launchpad",
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});



function App() {
  return (
    <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
    <BrowserRouter>
    <Routes>
      <Route exact path="/token" element={<Sidebar page={"token"}/>} />
      <Route exact path="/contact" element={<Sidebar page={"contact"}/>} />
      <Route exact path="/pricing" element={<Sidebar page={"pricing"}/>} />
      <Route exact path="/" element={<Sidebar page={"wallet"}/>} />
      <Route exact path="/contract" element={<Sidebar page={"contract"}/>} />
      <Route exact path="/send" element={<Sidebar page={"send"}/>} />
      <Route exact path="/sale" element={<Sidebar page={"sale"}/>} />
    </Routes>
    </BrowserRouter>
    </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
