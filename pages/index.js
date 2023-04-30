import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from "react"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  //for fetching balance
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const fetchBalance = async () => {
    const response = await fetch('/api/balance', {
      method: 'POST',
      body: JSON.stringify({ address }),
      headers: {
        'content-Type': 'application/json',
      },
    })
    const data = await response.json()
    setBalance(data.balance);
    console.log(data);
  }
  //for transferring
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const transferAmount = async () => {
    const response = await fetch('/api/transfer', {
      method: 'POST',
      body: JSON.stringify({ from, to, amount }),
      headers: {
        'content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log(data);
  }

  return (
    <>
      <Head>
        <title>e-Rupee</title>
        <meta name="description" content="CBDC using Go-Ethereum" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex justify-center pt-10">
          <div className="w-2/6 bg-white px-12 py-5 rounded-lg drop-shadow-md">
            <div className="text-center py-9">
              <p className="font-bold text-3xl pb-3">Current Balance - Rs {balance}</p>
              <p className="font-thin">account address - {address}</p>
            </div>
            <form className="my-6">
              {/* <!-- Resquest amount input --> */}
              <p className="flex justify-center font-bold text-2xl pb-3">Fetch Balance</p>
              <div class="mb-3">
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  class="form-control block w-full px-4 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Account address"
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={fetchBalance}
                  type="button"
                  className="mb-3 px-10 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                  Fetch
                </button>
              </div>
            </form>
            {/* <form className="my-6">
                        <p className="flex justify-center font-bold text-2xl pb-3">Request Money</p>
                        <div class="mb-3">
                            <input
                                type="text"
                                class="form-control block w-full px-4 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="exampleFormControlInput2"
                                placeholder="Amount"
                            />
                        </div>
                        <div className="flex justify-center">
                        <button
                            type="button"
                            className="mb-3 px-10 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                            Get
                        </button>
                        </div>
                    </form> */}
            <form className="my-6">

              {/* <!-- Transfer amount --> */}
              <p className="flex justify-center font-bold text-2xl pb-3">Transfer Money</p>
              <div class="mb-3">
                <input
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  type="text"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Sender address"
                />
              </div>
              <div class="mb-3">
                <input
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  type="text"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Receiver address"
                />
              </div>
              <div class="mb-3">
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="text"
                  class="form-control block w-full px-4 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Amount"
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={transferAmount}
                  type="button"
                  class="mb-3 inline-block px-10 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                  Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
