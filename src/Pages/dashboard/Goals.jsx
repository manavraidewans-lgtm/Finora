import Navbar from "../../Components/Dashboard/Navbar.jsx";
import Top from "../../Components/Dashboard/Top.jsx";

function Goals() {

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
                    Icon="ri-flag-line"
                    Tittle="Goals"
                    Description="Set your goals, stay consistent, and build the future you want"
                />

                

            </main>

        </div>

    );
}

export default Goals;