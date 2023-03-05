import Head from "next/head";
import { Inter } from "next/font/google";

import React, { useEffect, useState } from "react";
import styles from "../styles/main.module.scss";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
  configureChains,
  createClient,
  goerli,
  useAccount,
  WagmiConfig,
} from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Ecowallet__factory } from "components/contracts/typechain";


// import './App.css';

interface WalletInfo {
  walletAddress: string;
  walletSalt: number;
}

function App() {
  const CONTRACT_ADDRESS = "0x82b035B4405Dd60b449b054894004FeE80566655";

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey) {
    throw new Error("No API Key provided, seti n ENV");
  }

  const { chains, provider } = configureChains(
    [goerli],
    [alchemyProvider({ apiKey: apiKey }), publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  const [code, setCode] = useState<string>("");
  const [ethAmount, setEthAmount] = useState<string>("");

  const [availableWallets, setAvailableWallets] = useState<WalletInfo[]>([]);
  const [isLoadingAddresses, setLoadingAddresses] = useState<boolean>(false);

  const { address } = useAccount();

  const fetchAccounts = async () => {

    if (!address) {
      setAvailableWallets([]);
      return;
    }
    const ethersProvider = wagmiClient.getProvider();

    const ecoWallet = Ecowallet__factory.connect(
      CONTRACT_ADDRESS,
      ethersProvider
    );
    setLoadingAddresses(true);

    console.log('address', address);

    const [w0, w1, w2] = await Promise.all([
      ecoWallet.getWallet(address!, 0),
      ecoWallet.getWallet(address!, 1),
      ecoWallet.getWallet(address!, 2),
    ]);
    setAvailableWallets([
      { walletAddress: w0, walletSalt: 0 },
      { walletAddress: w1, walletSalt: 1 },
      { walletAddress: w2, walletSalt: 2 },
    ]);
    setLoadingAddresses(false);
  };
  useEffect(() => {
    fetchAccounts();
  }, [address]);
  //new EcoWallet wagmiClient.provider;

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div>
          <div className="flex flex-col justify-center min-h-screen mx-auto max-w-[50vw]">
            <div className="flex flex-col justify-center gap-5">
              <div className="flex justify-end">
                <ConnectButton />
              </div>
              <div className="flex flex-row space-x-4">
                <span className="text-2xl">👛</span>
                {isLoadingAddresses ? (
                  <p>Loading...</p>
                ) : (
                  availableWallets.length ? <select className="flex-grow rounded-md bg-blue-200 text-slate-700 font-mono p-2 font-bold">
                    {availableWallets.map((w) => {
                      return (
                        <option value={w.walletSalt}>{w.walletAddress}</option>
                      );
                    })}
                  </select> : <p>Sign in for wallets</p>
                )}
              </div>
              <textarea
                id="editor"
                className="bg-slate-700 text-slate-100 rounded-md p-4"
                v-model="code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              ></textarea>
              <div className="flex justify-between">
                <div className="no-outline flex space-x-2 focus:outline-none bg-green-200 rounded-md py-2 px-5 font-bold text-slate-700">
                  <input
                    type="number"
                    v-model="ethValue"
                    className="bg-transparent border-transparent"
                    value={ethAmount}
                    onChange={(e) => {
                      setEthAmount(e.target.value);
                    }}
                  />
                  <span>ETH</span>
                </div>
                <button className="bg-yellow-400 rounded-lg py-2 px-5 font-bold text-slate-700">
                  Execute!
                </button>
              </div>
            </div>
          </div>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
