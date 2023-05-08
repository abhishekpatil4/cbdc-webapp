import { useSession, getSession, signIn } from "next-auth/react"
import { useEffect, useState } from "react"

export default function settingss() {
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
                                {session.user.username === "admin" ? (
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Branch Name
                                    </th>
                                ) :
                                    (
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Name
                                        </th>
                                    )}
                                <td class="px-6 py-4">
                                    {session.user.name}
                                </td>
                            </tr>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Username
                                </th>
                                <td class="px-6 py-4">
                                    {session.user.username}
                                </td>
                            </tr>
                            <tr class="bg-white border-b dark:bg-gray-800">
                                {session.user.username === "admin" ? (
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        IFSC Code
                                    </th>
                                ) :
                                    (
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Adhaar number
                                        </th>
                                    )}
                                <td class="px-6 py-4">
                                    {session.user.adhaar_number}
                                </td>
                            </tr>
                            <tr class="bg-white border-b dark:bg-gray-800">
                                {session.user.username === "admin" ? (
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Manager Name
                                    </th>
                                ) :
                                    (
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            PAN number
                                        </th>
                                    )}
                                <td class="px-6 py-4">
                                    {session.user.pan_number}
                                </td>
                            </tr>
                            <tr class="bg-white border-b dark:bg-gray-800">
                                {session.user.username === "admin" ? (
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Address
                                    </th>
                                ) :
                                    (
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Account address
                                        </th>
                                    )}
                                {session.user.username === "admin" ? (
                                    <td class="px-6 py-4">
                                        Karnataka University Campus, Dharwad, Karnataka 580003
                                    </td>
                                ) :
                                    (
                                        <td class="px-6 py-4">
                                            {session.user.account_address}
                                        </td>
                                    )}

                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

        </>
    )
}