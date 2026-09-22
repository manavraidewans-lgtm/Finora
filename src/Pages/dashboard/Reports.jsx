import Navbar from "../../Components/Dashboard/Navbar.jsx";
import Top from "../../Components/Dashboard/Top.jsx";

function Reports() {

    return (

        <div className="min-h-screen w-full bg-[#f7f4ef]">

            <Navbar />

            <main className=" w-full lg:ml-60 lg:w-[calc(100%-240px)]">

                <Top
                    Icon="ri-file-chart-fill"
                    Tittle="Reports"
                    Description="Get detailed insights into your income, expenses and spending reports"
                />


                

                

            </main>

        </div>

    );
}

export default Reports;