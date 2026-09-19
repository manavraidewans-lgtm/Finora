import BoxesStack3 from "../../Components/Public/BoxStack3";
import Chain1 from "../../Components/Public/Chain1";
import Description from "../../Components/Public/Description";
import Heading from "../../Components/Public/Heading";
import Navbar from "../../Components/Public/Navbar";
import Tittle from "../../Components/Public/Tittle";
import BoxesStack4 from "../../Components/Public/BoxStack4";

import AboutImage from "../../assets/Public About.png";

function About() {
    return (
        <div className="min-h-screen pt-20 bg-[#f7f4ef]">

            <Navbar />

            {/* 1st Part */}
            <section className="w-full flex flex-col lg:flex-row justify-center items-center gap-2 md:gap-4 p-3 md:p-5">

                {/* Left Side */}
                <div className="w-full lg:w-[50%] flex flex-col justify-start items-start gap-4 md:gap-6 lg:gap-12 p-4 md:p-6 lg:p-6">

                    <Heading
                        Tittle={"About Finora"}
                        className="pl-3 pr-3"
                    />

                    <Tittle
                        Heading={"Money should feel simple"}
                        className="text-3xl md:text-5xl lg:text-6xl"
                    />

                    <Description
                        Des={
                            "Finora helps you understand where your money goes, plan with confidence, and make progress toward the things that matter to you."
                        }
                    />

                </div>

                {/* Right Side */}
                <div className="w-full lg:w-[50%] flex justify-center items-center p-2 md:p-4">

                    <img
                        src={AboutImage}
                        alt="Finora finance dashboard"
                        className="w-full object-cover"
                    />

                </div>

            </section>


            {/* 2nd Part */}
            <section className="w-full bg-[#f7f6f1] flex flex-col lg:flex-row p-3 md:p-4 gap-4 lg:gap-2">

                {/* Left Part */}
                <div className="w-full lg:w-[50%] flex flex-col justify-start items-start gap-4 md:gap-6 lg:gap-12 p-4 md:p-6 lg:p-6">

                    <Heading
                        Tittle={"Why Finora Exists ?"}
                        className="pl-3 pr-3"
                    />

                    <Tittle
                        Heading={"Your finances shouldn't be complicated"}
                        className="text-2xl md:text-4xl lg:text-5xl"
                    />

                </div>

                {/* Right Part */}
                <div className="w-full lg:w-[50%] flex justify-center items-center p-2 md:p-3 lg:p-5">

                    <div className="w-full flex flex-col justify-center items-center gap-4 p-2">

                    <Description
                            Des={
                                "Managing money often means jumping between bank statements, spreadsheets, budgeting apps, and scattered notes. Finora brings those pieces      together into one clear experience."
                            }
                        />

                        <Chain1
                            Text={["Track", "Understand", "Plan", "Grow"]}
                            className="text-[#b79987] font-bold"
                        />

                    </div>

                </div>

            </section>




            {/* 3rd Part */}
            <section className="min-h-[60vh] w-full flex flex-col p-3 gap-3 md:min-h-[40vh] lg:flex-row lg:min-h-[35vh]">

                {/* Left */}
                <div className="w-full lg:w-[40%] flex flex-col justify-start items-start gap-4 md:gap-6 lg:gap-12 p-4 md:p-6 lg:p-6">

                    <Heading
                        Tittle={"Our Philosophy"}
                        className="pl-3 pr-3"
                    />

                    <Tittle
                        Heading={"Built on simple principles"}
                        className="text-2xl md:text-4xl lg:text-5xl"
                    />                    

                </div>

                {/* Right */}
                <div className="w-full lg:w-[60%] flex flex-col justify-center items-center gap-4 p-2">

                    <BoxesStack3 />

            </div>

            </section>







            {/* 4th Part */}
            <section className="min-h-[60vh] w-full flex flex-col p-3 gap-3 md:min-h-[40vh] lg:flex-row lg:min-h-[35vh]">

                {/* Left */}
                <div className="w-full lg:w-[50%] flex flex-col justify-start items-start gap-4 md:gap-6 lg:gap-12 p-4 md:p-6 lg:p-6">

                    <Heading
                        Tittle={"Our Values"}
                        className="pl-3 pr-3"
                    />

                    <Tittle
                        Heading={
                            "Finora is built around one simple idea: Your money should help you make decisions, not create more confusion."
                        }
                        className="text-2xl md:text-3xl"
                    />

                </div>

                {/* Right */}
                <div className="w-full lg:w-[50%] flex justify-center items-center p-2 md:p-3 lg:p-5">

                    <BoxesStack4 />

                </div>

            </section>







        </div>
    );
}

export default About;