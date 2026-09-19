import Boxes from "./Boxes";

function BoxesStack3() {
    return (
        <div className="w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-5">

            <Boxes
                Icon="ri-phone-find-line"
                Tittle="Track Everything"
                Description="Keep your income and expenses organized in one place."
            />

            <Boxes
                Icon="ri-bar-chart-box-line"
                Tittle="Smart Insights"
                Description="Understand where your money goes with clear analytics."
            />

            <Boxes
                Icon="ri-wallet-3-line"
                Tittle="Manage Budgets"
                Description="Set budgets and stay in control of your spending."
            />

        </div>
    );
}

export default BoxesStack3;