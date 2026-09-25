import Box2 from "../../Components/Public/Box2";
import BoxesStack from "../../Components/Public/BoxesStack";
import BoxStack2 from "../../Components/Public/boxStack2";
import ButtonStack from "../../Components/Public/ButtonStack";
import Description from "../../Components/Public/Description";
import Heading from "../../Components/Public/Heading";
import Heading2 from "../../Components/Public/Heading2";
import Navbar from "../../Components/Public/Navbar";
import Tittle from "../../Components/Public/Tittle";
import FinoraDashboard from "../../assets/FinoraDashboard.png";

function Home() {
    return (
        <div className="min-h-screen bg-[#f7f4ef]">
            <Navbar />

            {/* 1st Part */}
            <section className="w-full pt-[8vh]">
                <div className="flex min-h-0 w-full flex-col gap-2 md:gap-4 lg:min-h-[92vh] lg:flex-row">

                    <div className="flex w-full flex-col items-start justify-center gap-4 p-3 md:gap-5 md:p-5 lg:h-[92vh] lg:w-[45%] lg:gap-7 lg:p-7">
                        <Heading
                            Tittle="Personal Finance, Made simple"
                            className="pl-4 pr-5"
                        />

                        <Tittle
                            Heading="Take Control of Your Money"
                            className="text-3xl md:text-5xl lg:text-7xl"
                        />

                        <Description
                            Des="Track your spending, manage your budgets, and build better financial habits all in one beautifully simple place."
                        />

                        <ButtonStack />
                    </div>

                    <div className="flex w-full items-center justify-center lg:h-[92vh] lg:w-[55%]">
                        <img
                            src={FinoraDashboard}
                            alt="Finora Dashboard"
                            className="h-full w-full object-contain"
                        />
                    </div>

                </div>
            </section>

            {/* 2nd Part */}
            <section className="flex min-h-[65vh] flex-col items-center justify-center gap-3 bg-[#faf9f5] py-10 md:gap-6 md:py-14 lg:gap-8 lg:py-16">
                <Heading2 Tittle="Why Finora?" />

                <Tittle
                    Heading="Your finances, finally made clear"
                    className="text-xl md:text-4xl lg:text-5xl"
                />

                <BoxesStack />
            </section>

            {/* 3rd Part */}
            <section className="flex min-h-[65vh] w-full flex-col items-center justify-center gap-3 p-4 md:gap-6 lg:flex-row">

                <div className="flex min-h-[30vh] w-full flex-col justify-center gap-5 rounded-2xl p-3 md:gap-8 lg:min-h-[55vh] lg:w-1/2 lg:gap-11">
                    <Heading Tittle="Simple By Design" className="pl-4 pr-4" />

                    <Tittle
                        Heading="Everything you need to feel in control"
                        className="text-2xl md:text-5xl lg:text-6xl"
                    />

                    <Description
                        Des="Finora brings your spending, budgets, savings, and financial goals together in one simple place - so you can make better decisions without the complexity."
                    />
                </div>

                <div className="grid min-h-[30vh] w-full grid-cols-1 gap-3 rounded-2xl p-3 md:grid-cols-2 md:gap-4 lg:min-h-[55vh] lg:w-1/2">
                    <Box2
                        Icon="ri-wallet-3-line"
                        Tittle="Track"
                        Description="Know where your money goes Keep track of every expense and understand your spending habbit"
                    />

                    <Box2
                        Icon="ri-bubble-chart-fill"
                        Tittle="Plan"
                        Description="Create budgets that work for you Set realistic spending limits and stay on track"
                    />

                    <Box2
                        Icon="ri-bank-line"
                        Tittle="Save"
                        Description="Turn small habits into progress Set savings goals and see your progress over time"
                    />

                    <Box2
                        Icon="ri-arrow-up-double-line"
                        Tittle="Grow"
                        Description="Build better financial habits Make informed decisions and create a secure future"
                    />
                </div>

            </section>

            {/* 4th Part */}
            <section className="flex min-h-[65vh] flex-col items-center justify-center gap-3 bg-[#faf9f5] py-10 md:gap-6 md:py-14 lg:gap-8 lg:py-16">
                <Heading2 Tittle="Build Around You" />

                <Tittle
                    Heading="Your money. Your goals. Your progress."
                    className="text-xl md:text-4xl lg:text-5xl"
                />

                <BoxStack2 />
            </section>
        </div>
    );
}

export default Home;