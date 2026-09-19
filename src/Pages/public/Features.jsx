import BoxesStack5 from "../../Components/Public/BoxStack5";
import Description from "../../Components/Public/Description";
import Heading from "../../Components/Public/Heading";
import Heading2 from "../../Components/Public/Heading2";
import Navbar from "../../Components/Public/Navbar";
import Tittle from "../../Components/Public/Tittle";

import Features1 from "../../assets/Features1.png";
import Features2 from "../../assets/Features2.png";

function Features() {
    return (
        <div className="min-h-screen pt-20 bg-[#f7f4ef]">

            <Navbar />

            {/* 1st Part */}
            <section className="min-h-[50vh] w-full flex flex-col lg:flex-row justify-center items-center gap-6 md:gap-10 p-4 md:p-6 lg:p-10">

                {/* Left Side */}
                <div className="w-full lg:w-[50%] flex flex-col justify-center items-start gap-5 md:gap-7 lg:gap-10 p-2 md:p-6 lg:p-10">

                    <Heading
                        Tittle={"Features"}
                        className="px-3"
                    />

                    <Tittle
                        Heading={"Everything you need to manage your money"}
                        className="text-3xl md:text-4xl lg:text-5xl leading-tight"
                    />

                    <Description
                        Des={
                            "Powerful features, simple design. Finora gives you the tools to track, plan and grow your finances all in one place."
                        }
                    />

                </div>

                {/* Right Side */}
                <div className="w-full h-full">

                    <img
                        src={Features1}
                        alt="Finora features"
                        className="w-full h-full object-cover"
                    />

                </div>

            </section>


            {/* 2nd Part */}
            <section className="min-h-[65vh] w-full flex flex-col justify-center items-center gap-3 md:gap-6 lg:gap-8 bg-[#faf9f5] py-10 md:py-14 lg:py-16">

                <Heading2
                    Tittle={"Why Finora?"}
                />

                <Tittle
                    Heading={"Your finances, finally made clear"}
                    className="text-xl md:text-4xl lg:text-5xl"
                />

                <BoxesStack5 />

            </section>


            {/* 3rd Part */}
            <section className="min-h-[50vh] w-full flex flex-col lg:flex-row justify-center items-center gap-6 md:gap-10 p-4 md:p-6 lg:p-10">

                {/* Left Side */}
                <div className="w-full lg:w-[50%] flex flex-col justify-center items-start gap-5 md:gap-7 lg:gap-10 p-2 md:p-6 lg:p-10">

                    <Heading
                        Tittle={"Features"}
                        className="px-3"
                    />

                    <Tittle
                        Heading={"Everything you need to manage your money"}
                        className="text-3xl md:text-5xl lg:text-6xl leading-tight"
                    />

                    <Description
                        Des={
                            "Powerful features, simple design. Finora gives you the tools to track, plan and grow your finances all in one place."
                        }
                    />

                </div>

                {/* Right Side */}
                <div className="w-full h-full">

                    <img
                        src={Features2}
                        alt="Finora features"
                        className="w-full h-full object-cover"
                    />

                </div>

            </section>

        </div>
    );
}

export default Features;