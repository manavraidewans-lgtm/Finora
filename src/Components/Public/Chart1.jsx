import ExpenseBox from "./ExpenseBox";
import SpendingOverview from "./SpendingOverview";

function Chart1() {
    return (
        <section className="w-full h-full bg-[#f9f8f4] rounded-2xl border-2 border-[#f0ede8] p-2 flex flex-col gap-2 overflow-hidden">

            {/* ========================= */}
            {/* SUMMARY BOXES */}
            {/* ========================= */}

            <div className="w-full h-[35%] lg:h-[30%] flex justify-center items-center gap-2 md:gap-3">

                {/* INCOME */}
                <ExpenseBox
                    Heading="Income"
                    Money="₹ 1,24,000"
                    Growth="8% Gross"
                    GrowthColor="text-green-600"
                />

                {/* EXPENSE */}
                <ExpenseBox
                    Heading="Expense"
                    Money="₹ 86,400"
                    Growth="3%"
                    GrowthColor="text-green-600"
                />

                {/* SAVINGS */}
                <ExpenseBox
                    Heading="Savings"
                    Money="₹ 52,320"
                    Growth="6%"
                    GrowthColor="text-red-500"
                />

                {/* BALANCE - LARGE SCREEN ONLY */}
                <ExpenseBox
                    Heading="Balance"
                    Money="₹ 42,360"
                    Growth="16%"
                    GrowthColor="text-green-600"
                    className="hidden md:flex"
                />

            </div>


            {/* ========================= */}
            {/* SPENDING OVERVIEW */}
            {/* ========================= */}

            <div className="w-full h-[65%] lg:h-[70%] min-h-0">

                <SpendingOverview />

            </div>

        </section>
    );
}

export default Chart1;