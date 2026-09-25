import ExpenseBox from "./ExpenseBox";
import SpendingOverview from "./SpendingOverview";

function Chart1() {
    return (
        <section className="flex h-full w-full flex-col gap-2 overflow-hidden rounded-2xl border-2 border-[#f0ede8] bg-[#f9f8f4] p-2">


            {/* SUMMARY BOXES */}
            <div className="flex h-[35%] w-full items-center justify-center gap-2 md:gap-3 lg:h-[30%]">

                <ExpenseBox
                    Heading="Income"
                    Money="₹ 1,24,000"
                    Growth="8% Gross"
                    GrowthColor="text-green-600"
                />

                <ExpenseBox
                    Heading="Expense"
                    Money="₹ 86,400"
                    Growth="3%"
                    GrowthColor="text-green-600"
                />

                <ExpenseBox
                    Heading="Savings"
                    Money="₹ 52,320"
                    Growth="6%"
                    GrowthColor="text-red-500"
                />

                <ExpenseBox
                    Heading="Balance"
                    Money="₹ 42,360"
                    Growth="16%"
                    GrowthColor="text-green-600"
                    className="hidden md:flex"
                />

            </div>


            {/* SPENDING OVERVIEW */}
            <div className="h-[65%] min-h-0 w-full lg:h-[70%]">
                <SpendingOverview />
            </div>

        </section>
    );
}

export default Chart1;