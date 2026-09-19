import BoxesStack3 from "../../Components/Public/BoxStack3";
import BoxesStack4 from "../../Components/Public/BoxStack4";
import Chain1 from "../../Components/Public/Chain1";
import Description from "../../Components/Public/Description";
import Heading from "../../Components/Public/Heading";
import Heading2 from "../../Components/Public/Heading2";
import Navbar from "../../Components/Public/Navbar";
import Tittle from "../../Components/Public/Tittle";

import AboutImage from "../../assets/Public About.png";

function About() {
    return (
        <div className="min-h-screen pt-20 bg-[#f7f4ef]">

            <Navbar />

            {/* 1st Part */}
            <section className="w-full flex flex-col lg:flex-row justify-center items-center gap-4 md:gap-6 p-3 md:p-5">

                {/* Left Side */}
                <div className="w-full lg:w-[50%] flex flex-col justify-center items-start gap-4 md:gap-6 lg:gap-10 p-4 md:p-6 lg:p-8">

                    <Heading
                        Tittle={"About Finora"}
                        className="px-3"
                    />

                    <Tittle
                        Heading={"Money should feel simple"}
                        className="text-3xl md:text-5xl lg:text-6xl leading-tight"
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
                        className="w-full h-auto object-contain"
                    />

                </div>

            </section>


            {/* 2nd Part */}
            <section className="w-full bg-[#f7f6f1] flex flex-col lg:flex-row p-3 md:p-4 gap-4 lg:gap-2">

                {/* Left Part */}
                <div className="w-full lg:w-[50%] flex flex-col justify-center items-start gap-4 md:gap-6 lg:gap-10 p-4 md:p-6 lg:p-8">

                    <Heading
                        Tittle={"Why Finora Exists?"}
                        className="px-3"
                    />

                    <Tittle
                        Heading={"Your finances shouldn't be complicated"}
                        className="text-2xl md:text-4xl lg:text-5xl leading-tight"
                    />

                </div>

                {/* Right Part */}
                <div className="w-full lg:w-[50%] flex justify-center items-center p-2 md:p-4 lg:p-6">

                    <div className="w-full flex flex-col justify-center items-start gap-5 p-2 md:p-4">

                        <Description
                            Des={
                                "Managing money often means jumping between bank statements, spreadsheets, budgeting apps, and scattered notes. Finora brings those pieces together into one clear experience."
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
            <section className="min-h-[65vh] w-full flex flex-col justify-center items-center gap-3 md:gap-6 lg:gap-8 bg-[#faf9f5] py-10 md:py-14 lg:py-16">

                <Heading2
                    Tittle={"Why Finora?"}
                />

                <Tittle
                    Heading={"Your finances, finally made clear"}
                    className="text-xl md:text-4xl lg:text-5xl"
                />

                <BoxesStack3 />

            </section>


            {/* 4th Part */}
            <section className="min-h-[65vh] w-full bg-[#f7f6f1] flex flex-col lg:flex-row p-3 gap-3 md:p-5 lg:min-h-[40vh]">

                {/* Left */}
                <div className="w-full lg:w-[50%] flex flex-col justify-center items-start gap-4 md:gap-6 lg:gap-10 p-4 md:p-6 lg:p-8">

                    <Heading
                        Tittle={"Our Values"}
                        className="px-3"
                    />

                    <Tittle
                        Heading={
                            "Finora is built around one simple idea: Your money should help you make decisions, not create more confusion."
                        }
                        className="text-2xl md:text-3xl leading-tight"
                    />

                </div>

                {/* Right */}
                <div className="w-full lg:w-[50%] flex justify-center items-center p-2 md:p-4 lg:p-6">

                    <div className="w-full">
                        <BoxesStack4 />
                    </div>

                </div>

            </section>

        </div>
    );
}

export default About;