import Card from "../Card";
import DashboardGoals from "./DashboardGoals";
import DashboardRecentTransactions from "./DashboardRecentTransactions";
import IncomeExpenseChart from "./IncomeExpenseChart";
import QuickAction from "./QuickAction";
import SpendingOverview from "./SpendingOverview";

export default function Second() {
    return (
        <div className="
            flex
            min-h-screen
            w-full
            flex-col
            gap-2
            p-4
            pl-8
            items-center

            md:grid
            md:grid-cols-1
            md:gap-4
            md:items-start

            lg:grid-cols-[7fr_3fr]
            lg:gap-4
        ">

            {/* ================= CARDS ================= */}

            <div className="
                grid
                h-[55vh]
                w-full
                grid-cols-2
                items-center
                justify-items-center
                gap-2
                p-2

                md:flex
                md:h-[25vh]
                md:w-full
                md:flex-row
                md:items-center
                md:justify-evenly

                lg:col-span-1
                lg:h-[25vh]
                lg:self-center
            ">

                <Card
                    Icon="ri-wallet-3-line"
                    Tittle="Total Balance"
                    Amount="₹42,360"
                    value="+16%"
                    Description="from last month"
                />

                <Card
                    Icon="ri-arrow-up-line"
                    Tittle="Total Income"
                    Amount="₹70,000"
                    value="+8%"
                    Description="from last month"
                />

                <Card
                    Icon="ri-arrow-down-line"
                    Tittle="Total Expenses"
                    Amount="₹32,450"
                    value="-5%"
                    Description="from last month"
                />

                <Card
                    Icon="ri-piggy-bank-line"
                    Tittle="Savings"
                    Amount="₹37,550"
                    value="+15%"
                    Description="from last month"
                />

            </div>


            {/* ================= QUICK ACTION ================= */}

            <div className="
                w-full

                lg:col-span-1
            ">
                <QuickAction />
            </div>


            {/* ================= CHARTS ================= */}

            <div className="
                flex
                w-full
                min-w-0
                flex-col
                gap-4

                md:flex-col

                lg:col-span-2
                lg:flex-row
            ">

                {/* PIE CHART */}

                <div className="
                    min-w-0
                    w-full
                    overflow-hidden

                    lg:w-1/2
                ">
                    <SpendingOverview />
                </div>


                {/* INCOME & EXPENSE */}

                <div className="
                    min-w-0
                    w-full
                    overflow-hidden

                    lg:w-1/2
                ">
                    <IncomeExpenseChart />
                </div>

            </div>


            {/* ================= RECENT + GOALS ================= */}

            <div className="
                grid
                w-full
                grid-cols-1
                gap-4

                lg:col-span-2
                lg:grid-cols-2
                lg:items-stretch
            ">

                <div className="
                    flex
                    h-full
                    min-w-0
                    w-full
                ">
                    <DashboardRecentTransactions />
                </div>


                <div className="
                    flex
                    h-full
                    min-w-0
                    w-full
                ">
                    <DashboardGoals />
                </div>

            </div>

        </div>
    );
}