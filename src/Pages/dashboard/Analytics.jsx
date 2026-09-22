import Navbar from "../../Components/Dashboard/Navbar.jsx";
import Top from "../../Components/Dashboard/Top.jsx";

function Analytics() {

    return (

        <div className="min-h-screen w-full bg-[#f7f4ef]">

            <Navbar />

            <main
                className="
                    w-full
                    lg:ml-60
                    lg:w-[calc(100%-240px)]
                "
            >
                <Top
                    Icon="ri-bar-chart-fill"
                    Tittle="Analytics"
                    Description="Gain insights into your spending, savings and financial health"
                />

                

            </main>

        </div>

    );
}

export default Analytics;