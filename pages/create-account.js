import Link from "next/link";

export default function create_account() {
    return (
        <>
            <div className="flex justify-center pt-10">
                <div className="xl:w-3/12 lg:w-3/12 md:w-8/12 md:mb-0 bg-white px-12 py-16 rounded-lg drop-shadow-md">
                    <div className="text-center py-9">
                        <p className="font-bold text-3xl pb-3">Create new account</p>
                        <p className="font-thin">Enter your details</p>
                    </div>
                    <form>
                        {/* <!-- Name input --> */}
                        <div class="mb-6">
                            <input
                                type="text"
                                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="exampleFormControlInput2"
                                placeholder="Name"
                            />
                        </div>

                        {/* <!-- Adhaar card number --> */}
                        <div class="mb-6">
                            <input
                                type="text"
                                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="exampleFormControlInput2"
                                placeholder="PAN card number"
                            />
                        </div>

                        {/* <!-- Password input --> */}
                        <div class="mb-6">
                            <input
                                type="password"
                                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="exampleFormControlInput2"
                                placeholder="Pass phrase"
                            />
                        </div>

                        <div class="text-center">
                            <button
                                type="button"
                                class="inline-block px-10 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                Create Account
                            </button>
                            <div class="text-center mb-6 pt-6 ">
                                <Link href="/login" class="text-gray-800 font-normal">Already registered? Login</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}