import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";


function SpendingOverview() {

    const [transactions, setTransactions] = useState([]);


    // ================= DEFAULT DATA =================

    const defaultData = [
        {
            name: "Food & Dining",
            value: 9450,
        },
        {
            name: "Travel",
            value: 7200,
        },
        {
            name: "Shopping",
            value: 5800,
        },
        {
            name: "Bills & Utilities",
            value: 4200,
        },
        {
            name: "Entertainment",
            value: 3600,
        },
        {
            name: "Others",
            value: 2200,
        },
    ];


    // ================= LOAD TRANSACTIONS =================

    useEffect(() => {

        const loadTransactions = () => {

            const savedTransactions =
                localStorage.getItem("finoraTransactions");


            if (savedTransactions) {

                try {

                    setTransactions(
                        JSON.parse(savedTransactions)
                    );

                } catch (error) {

                    console.error(
                        "Transaction loading error:",
                        error
                    );

                    setTransactions([]);

                }

            } else {

                setTransactions([]);

            }

        };


        loadTransactions();


        window.addEventListener(
            "storage",
            loadTransactions
        );


        return () => {

            window.removeEventListener(
                "storage",
                loadTransactions
            );

        };

    }, []);


    // ================= REAL EXPENSES =================

    const expenseTransactions = transactions.filter(
        (transaction) =>
            transaction.type?.toLowerCase() === "expense"
    );


    // ================= GROUP CATEGORIES =================

    const categoryTotals = {};


    expenseTransactions.forEach(
        (transaction) => {

            const category =
                transaction.category || "Others";

            const amount =
                Number(transaction.amount) || 0;


            if (!categoryTotals[category]) {
                categoryTotals[category] = 0;
            }


            categoryTotals[category] += amount;

        }
    );


    // ================= REAL DATA =================

    const realChartData = Object.entries(
        categoryTotals
    )
        .map(([name, value]) => ({
            name,
            value,
        }))
        .sort(
            (a, b) => b.value - a.value
        );


    // ================= USE DEFAULT IF EMPTY =================

    const chartData =
        realChartData.length > 0
            ? realChartData
            : defaultData;


    // ================= TOTAL =================

    const totalSpent = chartData.reduce(
        (total, item) =>
            total + item.value,
        0
    );


    // ================= COLORS =================

    const colors = [
        "#4F8DF7",
        "#7657E8",
        "#F59E0B",
        "#43B98C",
        "#E879A8",
        "#64748B",
        "#A38671",
    ];


    // ================= PERCENTAGE =================

    const getPercentage = (value) => {

        if (!totalSpent) {
            return 0;
        }

        return Math.round(
            (value / totalSpent) * 100
        );

    };


    // ================= FORMAT MONEY =================

    const formatMoney = (amount) => {

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);

    };


    return (
        <div className="
            flex
            min-h-[400px]
            w-full
            flex-col
            rounded-2xl
            border
            border-[#e8e8e8]
            bg-white
            p-4
            shadow-sm

            sm:p-5
            md:p-6
            lg:p-7
        ">

            {/* ================= HEADER ================= */}

            <div>

                <h1 className="
                    text-xl
                    font-bold
                    text-[#111827]

                    md:text-2xl
                ">
                    Spending Overview
                </h1>


                <p className="
                    mt-1
                    text-sm
                    font-medium
                    text-[#8b95a5]

                    md:text-base
                ">
                    Your expenses by category
                </p>

            </div>


            {/* ================= CHART CONTENT ================= */}

            <div className="
                mt-6
                flex
                flex-col
                gap-6

                md:flex-row
                md:items-center
                md:justify-between
            ">


                {/* ================= DONUT ================= */}

                <div className="
                    relative
                    mx-auto
                    h-[260px]
                    w-full
                    max-w-[300px]

                    sm:h-[280px]
                    sm:max-w-[320px]

                    md:h-[300px]
                    md:max-w-[350px]
                    md:flex-1
                ">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <PieChart>

                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius="58%"
                                outerRadius="82%"
                                paddingAngle={2}
                                stroke="#ffffff"
                                strokeWidth={2}
                            >

                                {chartData.map(
                                    (entry, index) => (

                                        <Cell
                                            key={`cell-${index}`}
                                            fill={
                                                colors[
                                                    index %
                                                    colors.length
                                                ]
                                            }
                                        />

                                    )
                                )}

                            </Pie>


                            <Tooltip
                                formatter={(value) =>
                                    formatMoney(value)
                                }
                                contentStyle={{
                                    borderRadius: "12px",
                                    border: "1px solid #e8e8e8",
                                    boxShadow:
                                        "0 4px 15px rgba(0,0,0,0.08)",
                                }}
                            />

                        </PieChart>

                    </ResponsiveContainer>


                    {/* ================= CENTER ================= */}

                    <div className="
                        pointer-events-none
                        absolute
                        inset-0
                        flex
                        flex-col
                        items-center
                        justify-center
                    ">

                        <p className="
                            text-xl
                            font-bold
                            text-[#111827]

                            sm:text-2xl
                        ">
                            {formatMoney(totalSpent)}
                        </p>


                        <p className="
                            mt-1
                            text-xs
                            font-medium
                            text-[#8b95a5]

                            sm:text-sm
                        ">
                            Total Spent
                        </p>

                    </div>

                </div>


                {/* ================= CATEGORY LIST ================= */}

                <div className="
                    flex
                    w-full
                    flex-col
                    gap-3

                    md:flex-1
                    md:gap-4
                ">

                    {chartData.map(
                        (item, index) => (

                            <div
                                key={item.name}
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-3
                                "
                            >

                                {/* ================= CATEGORY ================= */}

                                <div className="
                                    flex
                                    min-w-0
                                    items-center
                                    gap-3
                                ">

                                    <span
                                        className="
                                            h-3
                                            w-3
                                            shrink-0
                                            rounded-full
                                        "
                                        style={{
                                            backgroundColor:
                                                colors[
                                                    index %
                                                    colors.length
                                                ],
                                        }}
                                    />


                                    <span className="
                                        truncate
                                        text-sm
                                        font-medium
                                        text-[#667085]

                                        md:text-base
                                    ">
                                        {item.name}
                                    </span>

                                </div>


                                {/* ================= AMOUNT ================= */}

                                <div className="
                                    flex
                                    shrink-0
                                    items-center
                                    gap-3
                                ">

                                    <span className="
                                        text-sm
                                        font-semibold
                                        text-[#3c3f44]

                                        md:text-base
                                    ">
                                        {formatMoney(item.value)}
                                    </span>


                                    <span className="
                                        w-8
                                        text-right
                                        text-sm
                                        font-medium
                                        text-[#8b95a5]
                                    ">
                                        {getPercentage(
                                            item.value
                                        )}%
                                    </span>

                                </div>

                            </div>

                        )
                    )}

                </div>

            </div>

        </div>
    );
}

export default SpendingOverview;