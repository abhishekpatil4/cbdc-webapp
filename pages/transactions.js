import { useSession, getSession, signIn } from "next-auth/react"
import { useEffect, useState } from "react"

export default function settingss() {
    //for storing transactions 
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        async function fetchAccountTransactions() {
            if (session && session.user) {
                const response = await fetch(`/api/transactions?username=${session.user.username}`);
                const data = await response.json();
                setTransactions(data.transactions);
            }
        }
        fetchAccountTransactions();
    }, []);

    //to secure page
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


    return (
        <>

            {session && session.user && (
                <div class="max-w-[90rem] pl-[24em]">
                    <div className="text-center py-9">
                        <p className="font-bold text-3xl pb-3">Transaction History</p>
                    </div>
                    <table class="w-full text-sm text-center dark:text-gray-400">
                        <thead class="text-xl uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Txn Date
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Debit/Credit
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-lg font-normal">
                            {transactions.map((transaction) => (session.user.account_address === transaction.receiverAddress ? (
                                <tr class="bg-green-400">
                                    <th scope="row" class="px-6 py-2 font-normal">
                                        {new Date(transaction.date).toLocaleString('en-GB', {
                                            dateStyle: 'short',
                                            timeStyle: 'short'
                                        })}
                                    </th>
                                    <td class="px-6 py-2">
                                        Transfer from
                                        {' ' + transaction.senderAddress}
                                    </td>
                                    <td class="px-6 py-2">
                                        {transaction.amount}
                                    </td>
                                </tr>
                            ) : (<tr class="bg-red-400">
                                <th scope="row" class="px-6 py-2 font-normal">
                                    {new Date(transaction.date).toLocaleString('en-GB', {
                                        dateStyle: 'short',
                                        timeStyle: 'short'
                                    })}
                                </th>
                                <td class="px-6 py-2">
                                    Transfer to
                                    {' ' + transaction.receiverAddress}
                                </td>
                                <td class="px-6 py-2">
                                    {transaction.amount}
                                </td>
                            </tr>)
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </>
    )
}