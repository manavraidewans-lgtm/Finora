import Navbar from "../../Components/Dashboard/Navbar.jsx";
import Top from "../../Components/Dashboard/Top.jsx";

function Dashboard() {

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
                    Icon="ri-home-5-fill"
                    Tittle="Home"
                    Description="Overview of your account"
                />

                

            </main>

        </div>

    );
}

export default Dashboard;