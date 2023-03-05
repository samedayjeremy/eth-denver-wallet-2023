import Head from "next/head";
import { Inter } from "next/font/google";

import React, { useState } from "react";
import styles from "../styles/main.module.scss";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { ConnectButton } from "@rainbow-me/rainbowkit";

// import './App.css';

function App() {
  // require('dotenv').config();

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey) {
    throw new Error("No API Key provided, seti n ENV");
  }

  console.log({ apiKey });

  const { chains, provider } = configureChains(
    [mainnet, polygon, optimism, arbitrum],
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
                <select className="flex-grow rounded-md bg-blue-200 text-slate-700 font-mono p-2 font-bold">
                  <option>a</option>
                </select>
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
