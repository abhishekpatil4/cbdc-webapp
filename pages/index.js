import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useState } from "react"
import { useSession, getSession } from "next-auth/react"
import Link from 'next/link'
import { signIn, signOut } from "next-auth/react";

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signOut({ redirect: false }); // clear the session data
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    console.log('handling submit')
    console.log(result);
    // Redirect the user to the appropriate page based on the result of the authentication process
  };

  let { data: session, loading } = useSession()

  //for transferring
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const transferAmount = async () => {
    setFrom(session.user.accountAddress);
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
        {/* if user is not logged in */}
        {!loading && !session && (
          <div className="flex justify-center pt-10">
          <div className="xl:w-3/12 lg:w-3/12 md:w-8/12 md:mb-0 bg-white px-12 py-16 rounded-lg drop-shadow-md">
              <div className="text-center py-9">
                  <p className="font-bold text-3xl pb-3">Login</p>
                  <p className="font-thin">Enter your Credentials</p>
              </div>
              <form onSubmit={handleSubmit}>
                  {/* <!-- username or account address input --> */}
                  <div class="mb-6">
                      <input
                          type="text"
                          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleFormControlInput2"
                          placeholder="Account address"
                          value={username} onChange={(e) => setUsername(e.target.value)}
                      />
                  </div>

                  {/* <!-- Password input --> */}
                  <div class="mb-6">
                      <input
                          type="password"
                          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleFormControlInput2"
                          placeholder="Pass phrase"
                          value={password} onChange={(e) => setPassword(e.target.value)}
                      />
                  </div>

                  <div class="text-center">
                      <button
                          type="submit"
                          class="inline-block px-10 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                          Login
                      </button>
                      {/* <div class="text-center mb-6 pt-6 ">
                          <Link href="/create-account" class="text-gray-800 font-normal">New user? Create account!</Link>
                      </div> */}
                      <Link href="/api/auth/signin">
                        Login
                      </Link>
                  </div>
              </form>
          </div>
      </div>
        )}

        {/* If user is logged in  */}
        {session && (
          <div className="flex justify-center pt-10">
          <div className="w-2/6 bg-white px-12 py-5 rounded-lg drop-shadow-md">
            <form className="my-6">
              {/* <!-- Transfer amount --> */}
              <div className="text-center py-9">
                <p className="flex justify-center font-bold text-3xl pb-3">Transfer Money</p>
                {session && session.user && (
                  <p className="font-thin">account address - {session.user.account_address}</p>
                )}
              </div>
              {/* <div class="mb-3">
                <input
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  type="text"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Sender address"
                />
              </div> */}
              <div class="mb-3">
                <input
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  type="text"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="To address"
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
        )}
      </main>
    </>
  )
}
