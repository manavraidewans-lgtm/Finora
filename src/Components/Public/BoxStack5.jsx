import Boxes from "./Boxes";

function BoxesStack5() {
    const boxes = [
        {
            Icon: "ri-survey-line",
            Tittle: "Track Every Expense",
            Description: "See where your money goes with automatic tracking and clean categorization",
        },
        {
            Icon: "ri-target-line",
            Tittle: "Smarter Budget",
            Description: "Set realistic budgets and stay on track without any stress",
        },
        {
            Icon: "ri-arrow-up-double-line",
            Tittle: "Visualize Your Progress",
            Description: "Beautiful charts and insights that help you understand your money better",
        },
        {
            Icon: "ri-target-line",
            Tittle: "Reach Your Goals",
            Description: "From emergency funds to dream trips turn your goals into real progress",
        },
    ];

    return (
        <div className="grid w-full max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 md:gap-5 md:px-8 lg:grid-cols-4 lg:gap-6 lg:px-10">
            {boxes.map((box) => (
                <Boxes
                    key={box.Tittle}
                    Icon={box.Icon}
                    Tittle={
                        <>
                            {box.Tittle}
                            <i className="ri-arrow-right-long-line ml-2"></i>
                        </>
                    }
                    Description={box.Description}
                />
            ))}
        </div>
    );
}

export default BoxesStack5;