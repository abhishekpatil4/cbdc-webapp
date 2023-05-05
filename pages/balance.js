import { useState, useEffect } from "react"
import { SessionProvider, getProviders, signOut, useSession, getSession } from "next-auth/react"

export default function Home() {
  const { data: session, loading } = useSession()

  //for fetching acc address
  useEffect(() => {
    async function fetchData() {
      const session = await getSession();
      while (!session || !session.user) {
        // wait for session.user to become available
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      setAddress(session.user.accountAddress);
    }
    fetchData();
  }, []);
  
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

  return (
    <SessionProvider>
      <div className="flex justify-center pt-10">
        <div className="w-2/6 bg-white px-12 py-5 rounded-lg drop-shadow-md">
          <div className="text-center py-9">
          <p className="font-bold text-3xl pb-3">Current Balance - Rs {balance}</p>
            {
              session && session.user && (<p className="font-thin">account address - {session.user.accountAddress}</p>)
            }
          </div>
          <form className="my-6">
            <div className="flex justify-center">
              <button
              onClick={fetchBalance}
                type="button"
                className="mb-3 px-10 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Fetch
              </button>
            </div>
          </form>
        </div>
      </div>
    </SessionProvider>
  )
}
