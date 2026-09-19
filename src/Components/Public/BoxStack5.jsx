import Boxes from "./Boxes";

function BoxesStack5() {
    return (
        <div className="w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">

            <Boxes
                Icon="ri-survey-line"
                Tittle={
                    <>
                        Track Every Expense
                        <i className="ri-arrow-right-long-line ml-2"></i>
                    </>
                }
                Description="See where your money goes with automatic tracking and clean categorization"
            />

            <Boxes
                Icon="ri-target-line"
                Tittle={
                    <>
                        Smarter Budget
                        <i className="ri-arrow-right-long-line ml-2"></i>
                    </>
                }
                Description="Set realistic budgets and stay on track without any stress"
            />

            <Boxes
                Icon="ri-arrow-up-double-line"
                Tittle={
                    <>
                        Visualize Your Progress
                        <i className="ri-arrow-right-long-line ml-2"></i>
                    </>
                }
                Description="Beautiful charts and insights that help you understand your money better"
            />

            <Boxes
                Icon="ri-target-line"
                Tittle={
                    <>
                        Reach Your Goals
                        <i className="ri-arrow-right-long-line ml-2"></i>
                    </>
                }
                Description="From emergency funds to dream trips turn your goals into real progress"
            />

        </div>
    );
}

export default BoxesStack5;