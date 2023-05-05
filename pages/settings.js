import { SessionProvider, getProviders, signOut, useSession, getSession } from "next-auth/react"
import { useState, useEffect } from "react"



export default function settingss() {
    const { data: session, loading } = useSession()
    const [username, setUsername] = useState();
    //for fetching session details
    useEffect(() => {
        async function fetchData() {
            const session_ = await getSession();
            while (!session_ || !session_.user) {
                // wait for session.user to become available
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            setUsername(session_.user.username);
        }
        fetchData();
        console.log('Session username -> ' + username);
    }, []);

    return (
        <>

            <div class="max-w-7xl pl-[34em]">
                <div className="text-center py-9">
                    <p className="font-bold text-3xl pb-3">Account Info</p>
                </div>
                <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                    <thead class="text-2xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Value
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-xl">
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Name
                            </th>
                            <td class="px-6 py-4">
                                Abhishek Patil
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Username
                            </th>
                            <td class="px-6 py-4">
                                abhishekpatil4
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Adhaar number
                            </th>
                            <td class="px-6 py-4">
                                809 789 6789
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                PAN number
                            </th>
                            <td class="px-6 py-4">
                                900863579
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Account address
                            </th>
                            <td class="px-6 py-4">
                                0x5757695629567966
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    )
}