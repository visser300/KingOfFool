import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Account from "../components/Account";
import useEagerConnect from "../hooks/useEagerConnect";
import { depositEther, depositUsdc } from "../hooks/useContract";
import React, { useState } from 'react'

function Home() {
  const { account, library, chainId } = useWeb3React();
  const [usdc, setUSDC] = useState<string>('0')
  const [eth, setEth] = useState<string>('0')

  const triedToEagerConnect = useEagerConnect();

  return (
    <div className="flex flex-col items-center content-center gap-4 h-96">
      <Head>
        <title>next-web3-boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          <Account triedToEagerConnect={triedToEagerConnect} />
        </nav>
      </header>

      <main className="flex flex-col items-center content-center gap-4 h-96">
          <section className="flex flex-col items-center content-center gap-8">
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                depositUsdc(library, chainId ?? 1, account ?? '', usdc, () => {
                  alert('deposit successfully')
                })
              }}
              className="flex flex-col items-center content-center gap-1 border-2 p-2"
            >
              <input
                className="border-2 text-center"
                type="text"
                placeholder="Deposit usdc"
                onChange={(e) => {
                  e.preventDefault();
                  setUSDC(e.target.value);
                }}
                required
              />
              <button className="border-2 rounded-xl px-4" type="submit">
                Deposit
              </button>
            </form>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                depositEther(library, chainId ?? 1, account ?? '', eth, () => {
                  alert('deposit successfully')
                })
              }}
              className="flex flex-col items-center content-center gap-1 border-2 p-2"
            >
              <input
                className="border-2 text-center"
                type="text"
                placeholder="Deposit eth"
                min={1}
                onChange={(e) => {
                  e.preventDefault();
                  setEth(e.target.value)
                }}
                required
              />
              <button className="border-2 rounded-xl px-4" type="submit">
                Deposit
              </button>
            </form>
          </section>
      </main>
    </div>
  );
}

export default Home;
