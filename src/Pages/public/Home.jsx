import Box2 from "../../Components/Public/Box2";
import BoxesStack from "../../Components/Public/BoxesStack";
import BoxStack2 from "../../Components/Public/boxStack2";
import ButtonStack from "../../Components/Public/ButtonStack";
import Chart1 from "../../Components/Public/Chart1";
import Description from "../../Components/Public/Description";
import Heading from "../../Components/Public/Heading";
import Heading2 from "../../Components/Public/Heading2";
import Navbar from "../../Components/Public/Navbar";
import Tittle from "../../Components/Public/Tittle";

function Home() {
    return (
        <div className="min-h-screen bg-[#f7f4ef]">

            <Navbar />

            {/* 1st Part */}
            <section className="w-full pt-[8vh]">

                <div className="w-full min-h-[92vh] p-3 lg:p-4 flex flex-col gap-4 lg:flex-row">

                    {/* LEFT CONTENT */}
                    <div className="w-full lg:w-[45%] lg:h-[92vh] p-3 md:p-5 lg:p-7 flex flex-col gap-4 md:gap-6 lg:gap-7 justify-center items-start">

                        <Heading
                            Tittle={"Personal Finance, Made simple"}
                            className="pl-4 pr-5"
                        />

                        <Tittle
                            Heading={"Take Control of Your Money"}
                            className="text-3xl md:text-5xl lg:text-7xl"
                        />

                        <Description
                            Des={
                                "Track your spending, manage your budgets, and build better financial habits all in one beautifully simple place."
                            }
                        />

                        <ButtonStack />

                    </div>

                    {/* RIGHT DASHBOARD */}
                    <div className="w-full lg:w-[55%] lg:h-[92vh] p-2 md:p-3 lg:p-4">

                        <Chart1 />

                    </div>

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

                <BoxesStack />

            </section>


            {/* 3rd Part */}
            <section className="min-h-[65vh] w-full flex flex-col lg:flex-row justify-center items-center gap-3 md:gap-6 p-4">

                {/* LEFT */}
                <div className="min-h-[30vh] w-full rounded-2xl lg:min-h-[55vh] lg:w-[50%] flex flex-col gap-5 md:gap-8 lg:gap-11 justify-center p-3">

                    <Heading
                        Tittle={"Simple By Design"}
                        className="pl-4 pr-4"
                    />

                    <Tittle
                        Heading={"Everything you need to feel in control"}
                        className="text-2xl md:text-5xl lg:text-6xl"
                    />

                    <Description
                        Des={
                            "Finora brings your spending, budgets, savings, and financial goals together in one simple place - so you can make better decisions without the complexity."
                        }
                    />

                </div>


                {/* RIGHT */}
                <div className="min-h-[30vh] w-full rounded-2xl p-3 lg:min-h-[55vh] lg:w-[50%] grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">

                    <Box2 
                    Icon={"ri-wallet-3-line"}
                    Tittle={"Track"}
                    Description={"Know where your money goes Keep track of every expense and understand your spending habbit"}
                    />

                    <Box2 
                    Icon={"ri-bubble-chart-fill"}
                    Tittle={"Plan"}
                    Description={"Create budgets that work for you Set realistic spending limits and stay on track"}
                    />

                    <Box2 
                    Icon={"ri-bank-line"}
                    Tittle={"Save"}
                    Description={"Turn small habits into progress Set savings goals and see your progress over time"}
                    />

                    <Box2 
                    Icon={"ri-arrow-up-double-line"}
                    Tittle={"Grow"}
                    Description={"Build better financial habits Make informed decisions and create a secure future"}
                    />

                </div>

            </section>


            {/* 2nd Part */}
            <section className="min-h-[65vh] w-full flex flex-col justify-center items-center gap-3 md:gap-6 lg:gap-8 bg-[#faf9f5] py-10 md:py-14 lg:py-16">

                <Heading2
                    Tittle={"Build Around You"}
                />

                <Tittle
                    Heading={"Your money. Your goals. Your progress."}
                    className="text-xl md:text-4xl lg:text-5xl"
                />

                <BoxStack2/>

            </section>




        </div>
    );
}

export default Home;