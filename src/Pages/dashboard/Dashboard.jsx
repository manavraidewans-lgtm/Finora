import First from "../../Components/Dashboard/Home/First.jsx";
import Second from "../../Components/Dashboard/Home/Second.jsx";
import Navbar from "../../Components/Dashboard/Navbar.jsx";
import Top from "../../Components/Dashboard/Top.jsx";

function Dashboard() {

    return (

        <div className="min-h-screen w-full">

            <Navbar />

            <main className="w-full lg:ml-60 lg:w-[calc(100%-240px)]">

                <Top
                    Icon="ri-home-5-fill"
                    Tittle="Home"
                    Description="Overview of your account"
                />


                <First/>
                

                <Second/>

                

            </main>

        </div>

    );
}

export default Dashboard;