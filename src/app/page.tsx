"use client";
import Image from "next/image";
import {useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react'
import {BrowserProvider} from 'ethers'
import { useState } from "react";

export default function Home() {
  const { open } = useWeb3Modal();
  const [balance, setBalance] = useState("nothing");

  const {address, chainId, isConnected} = useWeb3ModalAccount();
  const {walletProvider} = useWeb3ModalProvider();
  const getBalance = async () => {
    const provider = new BrowserProvider(walletProvider!);
    const  mybalance = await provider.getBalance(address!);

    console.log(balance);
    setBalance(mybalance.toString());
  }
  
  return (
    <div className="flex flex-col w-full justify-center">
      <button className="inline-block" onClick={() => open()}>Connect</button>
      <button onClick={() => open({ view: 'Networks' })}>Open Network Modal</button>
      <button onClick={getBalance}>Get Balance</button>
      {isConnected? (<div>{address} on {chainId}</div>): "not connected"}
      {balance}
    </div>
  );
}
