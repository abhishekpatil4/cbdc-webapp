import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { signIn, signOut } from "next-auth/react";

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const userData = {
    abhishek: "0xaf28babb597903f16a4ede2a08fc9393f451034b",
    athar: "0x57FEd45a14d5f8d456Dc4b4e188AeF5d67f08A0C",
    sangamesh: "0xBB6E059108aa690c98a9956C9341d4af374ccD9f",
    hrishikesh: "0xb4049f51c10b848987fDCb61F4d7440A20aEc997"
  }

  //for minting and getting total balance
  const [totalSupply, setTotalSupply] = useState(null);
  const mintTokens = async () => {
    const response = await fetch('/api/mint');
    const data = await response.json();
    setTotalSupply(data.totalSupply);
  }

  //for getting total balance
  const [totalSupply1, setTotalSupply1] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const response1 = await fetch('/api/totalSupply');
      const data1 = await response1.json();
      setTotalSupply(data1.totalSupply);
    }
    fetchData();
  }, []);

  // for signing in
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signOut({ redirect: false }); // clear the session data
    console.log('username-> ' + username + ' password-> ' + password);
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (result.status === 401) {
      console.log('invalid credentials')
      setError(10);
      // alert('Ivalid Credentials!\nPlease retry')
    }
    // Redirect the user to the appropriate page based on the result of the authentication process
  };

  let { data: session, loading } = useSession()

  //for transferring
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const transferAmount = async () => {
    if (session && session.user) {
      const from = session.user.account_address;
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
                {error && (<p className="font-normal bg-red-500 text-white mb-4 rounded-md py-1.5">Error: Invalid Credentials</p>)}
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
                    value={username} onChange={(e) => {
                      setUsername(e.target.value)
                      setError(null)
                    }}
                  />
                </div>

                {/* <!-- Password input --> */}
                <div class="mb-6">
                  <input
                    type="password"
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Pass phrase"
                    value={password} onChange={(e) => {
                      setPassword(e.target.value)
                      setError(null)
                    }}
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
                </div>
              </form>
            </div>
          </div>
        )}

        {/* If user is logged in  */}
        {session && (
          <div className="flex justify-center pt-10">
            <div className="w-2/6 bg-white px-12 py-5 rounded-lg drop-shadow-md">
              {/* total supply and mint */}
              {session && session.user.username === "admin" && (
                <div className="text-center py-2">
                  <p className="font-bold text-3xl pb-3">Total Supply - Rs {totalSupply1 || totalSupply}</p>
                  <p className="font-thin">account address - 0x717c913b027e831f82b8623be4550e2e92fb96b4</p>
                </div>
              )}
              {session && session.user.username === "admin" && (
                <form className="my-6">
                  <div className="flex justify-center">
                    <button
                      onClick={mintTokens}
                      type="button"
                      className="mb-3 px-10 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                      Mint
                    </button>
                  </div>
                </form>
              )}
              <form className="my-6">
                {/* <!-- Transfer amount --> */}
                <div className="text-center py-4">
                  <p className="flex justify-center font-bold text-3xl pb-3">Transfer Money</p>
                  {session && session.user && session.user.username != "admin" && (
                    <p className="font-thin">account address - {session.user.account_address}</p>
                  )}
                </div>
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
