import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
// import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/sidebar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import Managetoken from "./Components/manageToken.jsx";
import { Navigate } from "react-router-dom";
import NewHome from "./Components/newHome.jsx";

// const { chains, provider } = configureChains(
//   [chain.polygonMumbai, chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
//   [  publicProvider(), alchemyProvider({ alchemyId: "IItFVmzc5gWClV0ba3hDDdqtppKw-9OP" })]
// );

// const { connectors } = getDefaultWallets({
//   appName: "SecureDApp_Launchpad",
//   chains
// });
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  zora,
  polygonMumbai,
} from "wagmi/chains";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, zora, polygonMumbai],
  [
    alchemyProvider({ apiKey: "IItFVmzc5gWClV0ba3hDDdqtppKw-9OP" }),
    publicProvider(),
  ]
);

// const connectors = connectorsForWallets([
//   {
//     groupName: 'Recommended',
//     wallets: [
//       wallet.metaMask({ chains }),
//       wallet.rainbow({ chains }),
//       wallet.argent({ chains }),
//       wallet.ledger({ chains })
//     ],
//   },
// ]);

// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors,
//   provider
// });

const { connectors } = getDefaultWallets({
  appName: "Securedapp",
  projectId: "d88ca080d2576e2352a7cdd6969453df",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/home" element={<NewHome />} />
            <Route exact path="/" element={<Sidebar page={"home"} />} />
            <Route exact path="/token" element={<Sidebar page={"token"} />} />
            <Route
              exact
              path="/contact"
              element={<Sidebar page={"contact"} />}
            />
            <Route
              exact
              path="/pricing"
              element={<Sidebar page={"pricing"} />}
            />
            <Route exact path="/wallet" element={<Sidebar page={"wallet"} />} />
            <Route
              exact
              path="/contract"
              element={<Sidebar page={"contract"} />}
            />
            {/* <Route exact path="/send" element={<Sidebar page={"send"}/>} /> */}
            <Route exact path="/search" element={<Sidebar page={"search"} />} />
            <Route exact path="/sale" element={<Sidebar page={"sale"} />} />
            <Route exact path="/lock" element={<Sidebar page={"lock"} />} />
            <Route exact path="/manage" element={<Sidebar page={"manage"} />} />
            <Route
              exact
              path="/managetoken/:TOKEN"
              element={<Managetoken page={"managetoken"} />}
            />
            <Route
              exact
              path="/locktoken/:TOKEN"
              element={<Sidebar page={"locktoken"} />}
            />
            <Route
              exact
              path="/managelock/:LOCK"
              element={<Sidebar page={"managelock"} />}
            />
            <Route
              exact
              path="/saletoken/:TOKEN"
              element={<Managetoken page={"saletoken"} />}
            />
            <Route
              exact
              path="/editsale/:SALE"
              element={<Managetoken page={"editsale"} />}
            />
            <Route
              exact
              path="/managesale/:SALE"
              element={<Managetoken page={"managesale"} />}
            />
            <Route
              exact
              path="/buysale/:SALE"
              element={<Sidebar page={"buysale"} />}
            />
            <Route
              exact
              path="/distributetoken"
              element={<Managetoken page={"distributetoken"} />}
            />
            <Route path="*" element={<Managetoken page={"error"} />} />
          </Routes>
        </BrowserRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
