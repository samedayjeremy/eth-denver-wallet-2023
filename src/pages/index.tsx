import Head from "next/head";
import { Inter } from "next/font/google";

import React from "react";
import styles from "../styles/main.module.scss";

// import './App.css';

function App() {
  return (
    <div>
      <div className="container flex flex-col justify-center min-h-screen mx-auto">
        <div className="flex flex-col justify-center gap-y-5">
          <div className="flex flex-row space-x-4">
            <span className="text-2xl">👛</span>
            <select className="flex-grow rounded-md bg-blue-200 text-slate-700 font-mono p-2 font-bold">
              <option v-for="(a,i) in addresses value='a'">a</option>
            </select>
          </div>
          <textarea
            id="editor"
            className="bg-slate-700 text-slate-100 rounded-md p-4"
            v-model="code"
          ></textarea>
          <div className="flex justify-between">
            <div className="no-outline flex space-x-2 focus:outline-none bg-green-200 rounded-md py-2 px-5 font-bold text-slate-700">
              <input
                type="number"
                v-model="ethValue"
                className="bg-transparent border-transparent"
              />
              <span>ETH</span>
            </div>
            <button className="bg-yellow-400 rounded-full py-2 px-5 font-bold text-slate-700">
              Execute
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
