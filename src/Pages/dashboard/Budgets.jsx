import Navbar from "../../Components/Dashboard/Navbar.jsx";
import Top from "../../Components/Dashboard/Top.jsx";

function Budgets() {

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
                    Icon="ri-crosshair-2-line"
                    Tittle="Budget"
                    Description="Set limlis, stay on track and achieve your financial goals"
                />

                

            </main>

        </div>

    );
}

export default Budgets;