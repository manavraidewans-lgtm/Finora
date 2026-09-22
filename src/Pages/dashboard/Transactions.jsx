import Navbar from "../../Components/Dashboard/Navbar.jsx";

function Transactions() {

    return (

        <div className="min-h-screen w-full bg-[#f7f4ef]">

            <Navbar />

            <main
                className="
                    w-full
                    md:ml-[240px]
                    md:w-[calc(100%-240px)]
                "
            >

                <div className="p-5 pt-6 md:p-8">

                    <h1 className="text-3xl font-bold text-[#172033]">
                        Transactions
                    </h1>

                    <p className="mt-2 text-[#6b7280]">
                        View and manage all your transactions.
                    </p>

                </div>

            </main>

        </div>

    );
}

export default Transactions;