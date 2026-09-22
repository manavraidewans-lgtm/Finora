import Navbar from "../../Components/Dashboard/Navbar.jsx";
import Top from "../../Components/Dashboard/Top.jsx";

function Transactions() {

    return (

        <div className="min-h-screen w-full bg-[#f7f4ef]">

            <Navbar />

            <main
                className="
                    w-full
                    lg:ml-[240px]
                    lg:w-[calc(100%-240px)]
                "
            >
                <Top
                    Icon="ri-arrow-left-right-fill"
                    Tittle="Transactions"
                    Description="Track your income and expenses, stay in control of your money"
                />

                

            </main>

        </div>

    );
}

export default Transactions;