export default function create_account() {
    return (
        <>
            <div className="flex justify-center pt-10">
                <div className="w-2/6 bg-white px-12 py-5 rounded-lg drop-shadow-md">
                    <div className="text-center py-9">
                        <p className="font-bold text-3xl pb-3">Current Balance - Rs 500</p>
                        <p className="font-thin">account address - 0x4658ef8sbfbFG78</p>
                    </div>
                    <form className="my-6">
                        {/* <!-- Resquest amount input --> */}
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
                    </form>
                    <form className="my-6">

                        {/* <!-- Transfer amount --> */}
                        <p className="flex justify-center font-bold text-2xl pb-3">Transfer Money</p>
                        <div class="mb-3">
                            <input
                                type="text"
                                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="exampleFormControlInput2"
                                placeholder="Receiver address"
                            />
                        </div>
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
                            class="mb-3 inline-block px-10 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                            Transfer
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}