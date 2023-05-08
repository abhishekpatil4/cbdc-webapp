import { useState, useEffect } from "react"
import { SessionProvider, useSession, getSession, signIn } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession()
      if (!session) {
        signIn()
      } else {
        setLoading(false)
      }
    }
    securePage()
  }, [])

  //for fetching balance
  const [balance, setBalance] = useState('');
  const [customAddress, setCustomAddress] = useState();
  const fetchBalance = async () => {
    if (session && session.user) {
      let address = session.user.account_address;
      if (session.user.username === "admin") {
        address = customAddress;
      }
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
  }

  return (
    <SessionProvider>
      {session && session.user && (
        <div className="flex justify-center pt-10">
          <div className="w-2/6 bg-white px-12 py-5 rounded-lg drop-shadow-md">
            <div className="text-center py-9">
              <p className="font-bold text-3xl pb-3">Current Balance - Rs {balance}</p>
              {
                session && session.user.username != "admin" && (<p className="font-thin">account address - {session.user.account_address}</p>)
              }
            </div>
            <form className="my-6">
              <div className="flex justify-center">
                {session && session.user.username === "admin" && (
                  <div class="mb-3 pr-3">
                  <input
                    value={customAddress}
                    onChange={(e) => setCustomAddress(e.target.value)}
                    type="text"
                    class="form-control block w-full px-4 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="acount address"
                  />
                </div>
                )}
                <div className="flex justify-center">
                  <button
                    onClick={fetchBalance}
                    type="button"
                    className="mb-3 px-10 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Fetch
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </SessionProvider>
  )
}
