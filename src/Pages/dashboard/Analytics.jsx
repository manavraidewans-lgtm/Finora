import { useEffect, useMemo, useState } from "react";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
} from "recharts";

import Navbar from "../../Components/Dashboard/Navbar.jsx";
import Top from "../../Components/Dashboard/Top.jsx";


function Analytics() {

    // =====================================================
    // TRANSACTIONS
    // =====================================================

    const [transactions, setTransactions] = useState(() => {

        const savedTransactions =
            localStorage.getItem("finoraTransactions");

        if (!savedTransactions) {
            return [];
        }

        try {
            return JSON.parse(savedTransactions);
        } catch (error) {
            console.error(
                "Analytics transaction loading error:",
                error
            );

            return [];
        }

    });


    // =====================================================
    // SYNC TRANSACTIONS
    // =====================================================

    useEffect(() => {

        const syncTransactions = () => {

            const savedTransactions =
                localStorage.getItem("finoraTransactions");

            if (!savedTransactions) {

                setTransactions([]);

                return;

            }

            try {

                setTransactions(
                    JSON.parse(savedTransactions)
                );

            } catch (error) {

                console.error(
                    "Analytics transaction sync error:",
                    error
                );

            }

        };


        window.addEventListener(
            "transactionsUpdated",
            syncTransactions
        );

        window.addEventListener(
            "storage",
            syncTransactions
        );


        return () => {

            window.removeEventListener(
                "transactionsUpdated",
                syncTransactions
            );

            window.removeEventListener(
                "storage",
                syncTransactions
            );

        };

    }, []);


    // =====================================================
    // DEMO CATEGORY DATA
    // =====================================================

    const defaultCategoryData = [
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


    // =====================================================
    // DEMO MONTHLY DATA
    // =====================================================

    const defaultMonthlyData = [
        {
            month: "Apr",
            income: 54000,
            expenses: 30000,
        },
        {
            month: "May",
            income: 64000,
            expenses: 38000,
        },
        {
            month: "Jun",
            income: 72000,
            expenses: 44000,
        },
        {
            month: "Jul",
            income: 68000,
            expenses: 42000,
        },
        {
            month: "Aug",
            income: 88000,
            expenses: 62000,
        },
        {
            month: "Sep",
            income: 86000,
            expenses: 67000,
        },
    ];


    // =====================================================
    // MONEY FORMAT
    // =====================================================

    const formatMoney = (amount) => {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
            }
        ).format(
            Number(amount) || 0
        );

    };


    const formatShortMoney = (amount) => {

        const value =
            Number(amount) || 0;


        if (value >= 100000) {

            return `₹${(
                value / 100000
            ).toFixed(1)}L`;

        }


        if (value >= 1000) {

            return `₹${Math.round(
                value / 1000
            )}K`;

        }


        return `₹${value}`;

    };


    // =====================================================
    // TOTAL INCOME
    // =====================================================

    const totalIncome = useMemo(() => {

        if (!transactions.length) {
            return 70000;
        }


        return transactions
            .filter(
                (transaction) =>
                    transaction.type?.toLowerCase() ===
                    "income"
            )
            .reduce(
                (total, transaction) =>
                    total +
                    Number(
                        transaction.amount || 0
                    ),
                0
            );

    }, [transactions]);


    // =====================================================
    // TOTAL EXPENSES
    // =====================================================

    const totalExpenses = useMemo(() => {

        if (!transactions.length) {
            return 32450;
        }


        return transactions
            .filter(
                (transaction) =>
                    transaction.type?.toLowerCase() ===
                    "expense"
            )
            .reduce(
                (total, transaction) =>
                    total +
                    Number(
                        transaction.amount || 0
                    ),
                0
            );

    }, [transactions]);


    // =====================================================
    // SAVINGS
    // =====================================================

    const savings =
        totalIncome - totalExpenses;


    // =====================================================
    // CATEGORY DATA
    // =====================================================

    const categoryData = useMemo(() => {

        if (!transactions.length) {
            return defaultCategoryData;
        }


        const categoryTotals = {};


        transactions
            .filter(
                (transaction) =>
                    transaction.type?.toLowerCase() ===
                    "expense"
            )
            .forEach((transaction) => {

                const category =
                    transaction.category ||
                    "Others";


                categoryTotals[category] =
                    (
                        categoryTotals[category] ||
                        0
                    ) +
                    Number(
                        transaction.amount || 0
                    );

            });


        const result =
            Object.entries(categoryTotals)
                .map(
                    ([name, value]) => ({
                        name,
                        value,
                    })
                )
                .sort(
                    (a, b) =>
                        b.value - a.value
                );


        return result.length
            ? result
            : defaultCategoryData;

    }, [transactions]);


    // =====================================================
    // MONTHLY DATA
    // =====================================================

    const monthlyData = useMemo(() => {

        if (!transactions.length) {
            return defaultMonthlyData;
        }


        const now =
            new Date();


        const months = [];


        for (
            let i = 5;
            i >= 0;
            i--
        ) {

            const date =
                new Date(
                    now.getFullYear(),
                    now.getMonth() - i,
                    1
                );


            months.push({

                month:
                    date.toLocaleString(
                        "en-US",
                        {
                            month: "short",
                        }
                    ),

                monthNumber:
                    date.getMonth(),

                year:
                    date.getFullYear(),

                income: 0,

                expenses: 0,

            });

        }


        transactions.forEach(
            (transaction) => {

                if (!transaction.date) {
                    return;
                }


                const date =
                    new Date(
                        transaction.date
                    );


                if (
                    Number.isNaN(
                        date.getTime()
                    )
                ) {
                    return;
                }


                const monthData =
                    months.find(
                        (item) =>
                            item.monthNumber ===
                                date.getMonth() &&
                            item.year ===
                                date.getFullYear()
                    );


                if (!monthData) {
                    return;
                }


                const amount =
                    Number(
                        transaction.amount || 0
                    );


                if (
                    transaction.type?.toLowerCase() ===
                    "income"
                ) {

                    monthData.income += amount;

                }


                if (
                    transaction.type?.toLowerCase() ===
                    "expense"
                ) {

                    monthData.expenses += amount;

                }

            }
        );


        return months;

    }, [transactions]);


    // =====================================================
    // SPENDING OVERVIEW DATA
    // =====================================================

    const spendingOverviewData =
        useMemo(() => {

            if (!transactions.length) {

                return [
                    {
                        month: "Apr",
                        food: 9000,
                        travel: 6500,
                        shopping: 5000,
                        bills: 4800,
                        entertainment: 4000,
                        others: 3500,
                    },
                    {
                        month: "May",
                        food: 8800,
                        travel: 6200,
                        shopping: 5200,
                        bills: 4700,
                        entertainment: 3600,
                        others: 3300,
                    },
                    {
                        month: "Jun",
                        food: 9200,
                        travel: 6500,
                        shopping: 5600,
                        bills: 5100,
                        entertainment: 3900,
                        others: 3600,
                    },
                    {
                        month: "Jul",
                        food: 10500,
                        travel: 7000,
                        shopping: 6200,
                        bills: 5400,
                        entertainment: 4200,
                        others: 3800,
                    },
                    {
                        month: "Aug",
                        food: 11200,
                        travel: 7200,
                        shopping: 5800,
                        bills: 6100,
                        entertainment: 5000,
                        others: 4300,
                    },
                    {
                        month: "Sep",
                        food: 11800,
                        travel: 7400,
                        shopping: 6200,
                        bills: 5800,
                        entertainment: 4600,
                        others: 4200,
                    },
                ];

            }


            return monthlyData.map(
                (month) => {

                    const monthTransactions =
                        transactions.filter(
                            (transaction) => {

                                if (!transaction.date) {
                                    return false;
                                }


                                const date =
                                    new Date(
                                        transaction.date
                                    );


                                return (
                                    date.getMonth() ===
                                        month.monthNumber &&
                                    date.getFullYear() ===
                                        month.year &&
                                    transaction.type?.toLowerCase() ===
                                        "expense"
                                );

                            }
                        );


                    const getCategoryTotal =
                        (category) => {

                            return monthTransactions
                                .filter(
                                    (transaction) =>
                                        transaction.category ===
                                        category
                                )
                                .reduce(
                                    (
                                        total,
                                        transaction
                                    ) =>
                                        total +
                                        Number(
                                            transaction.amount ||
                                            0
                                        ),
                                    0
                                );

                        };


                    return {

                        month:
                            month.month,

                        food:
                            getCategoryTotal(
                                "Food & Dining"
                            ),

                        travel:
                            getCategoryTotal(
                                "Travel"
                            ),

                        shopping:
                            getCategoryTotal(
                                "Shopping"
                            ),

                        bills:
                            getCategoryTotal(
                                "Bills & Utilities"
                            ),

                        entertainment:
                            getCategoryTotal(
                                "Entertainment"
                            ),

                        others:
                            monthTransactions
                                .filter(
                                    (transaction) =>
                                        ![
                                            "Food & Dining",
                                            "Travel",
                                            "Shopping",
                                            "Bills & Utilities",
                                            "Entertainment",
                                        ].includes(
                                            transaction.category
                                        )
                                )
                                .reduce(
                                    (
                                        total,
                                        transaction
                                    ) =>
                                        total +
                                        Number(
                                            transaction.amount ||
                                            0
                                        ),
                                    0
                                ),

                    };

                }
            );

        }, [
            transactions,
            monthlyData,
        ]);


    // =====================================================
    // COLORS
    // =====================================================

    const pieColors = [
        "#49bda8",
        "#5b8def",
        "#f06b9a",
        "#ff9f43",
        "#ff6f9f",
        "#8fa0b7",
    ];


    // =====================================================
    // TOTAL CATEGORY SPENDING
    // =====================================================

    const categoryTotal =
        categoryData.reduce(
            (total, item) =>
                total + item.value,
            0
        );


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div
            className="
                min-h-screen
                w-full
                bg-[#f7f4ef]
            "
        >

            <Navbar />


            <main
                className="
                    w-full
                    lg:ml-60
                    lg:w-[calc(100%-240px)]
                "
            >

                <Top
                    Icon="ri-bar-chart-fill"
                    Tittle="Analytics"
                    Description="Gain insights into your spending, savings and financial health"
                />


                <div
                    className="
                        px-3
                        pb-6
                        sm:px-5
                        lg:px-6
                    "
                >

                    {/* =================================================
                        SUMMARY CARDS
                    ================================================= */}

                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-3
                            xl:grid-cols-4
                        "
                    >

                        {/* TOTAL INCOME */}

                        <div
                            className="
                                rounded-xl
                                border
                                border-[#e5eaf0]
                                bg-white
                                p-4
                                shadow-sm
                                sm:p-5
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#e2f7ef]
                                        text-[#17a673]
                                    "
                                >
                                    <i className="ri-arrow-up-line text-xl"></i>
                                </div>


                                <span
                                    className="
                                        text-xs
                                        text-[#607697]
                                    "
                                >
                                    Total Income
                                </span>

                            </div>


                            <h2
                                className="
                                    mt-4
                                    truncate
                                    text-xl
                                    font-bold
                                    text-[#17233c]
                                    sm:text-2xl
                                "
                            >
                                {formatMoney(
                                    totalIncome
                                )}
                            </h2>

                        </div>


                        {/* TOTAL EXPENSES */}

                        <div
                            className="
                                rounded-xl
                                border
                                border-[#e5eaf0]
                                bg-white
                                p-4
                                shadow-sm
                                sm:p-5
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#ffe8ee]
                                        text-[#f14c73]
                                    "
                                >
                                    <i className="ri-arrow-down-line text-xl"></i>
                                </div>


                                <span
                                    className="
                                        text-xs
                                        text-[#607697]
                                    "
                                >
                                    Total Expenses
                                </span>

                            </div>


                            <h2
                                className="
                                    mt-4
                                    truncate
                                    text-xl
                                    font-bold
                                    text-[#17233c]
                                    sm:text-2xl
                                "
                            >
                                {formatMoney(
                                    totalExpenses
                                )}
                            </h2>

                        </div>


                        {/* SAVINGS */}

                        <div
                            className="
                                rounded-xl
                                border
                                border-[#e5eaf0]
                                bg-white
                                p-4
                                shadow-sm
                                sm:p-5
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#eee8ff]
                                        text-[#7347df]
                                    "
                                >
                                    <i className="ri-safe-2-line text-xl"></i>
                                </div>


                                <span
                                    className="
                                        text-xs
                                        text-[#607697]
                                    "
                                >
                                    Savings
                                </span>

                            </div>


                            <h2
                                className="
                                    mt-4
                                    truncate
                                    text-xl
                                    font-bold
                                    text-[#17233c]
                                    sm:text-2xl
                                "
                            >
                                {formatMoney(
                                    savings
                                )}
                            </h2>

                        </div>


                        {/* MONTHLY GROWTH */}

                        <div
                            className="
                                rounded-xl
                                border
                                border-[#e5eaf0]
                                bg-white
                                p-4
                                shadow-sm
                                sm:p-5
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#e5f1ff]
                                        text-[#428cf5]
                                    "
                                >
                                    <i className="ri-bar-chart-grouped-line text-xl"></i>
                                </div>


                                <span
                                    className="
                                        text-xs
                                        text-[#607697]
                                    "
                                >
                                    Monthly Growth
                                </span>

                            </div>


                            <h2
                                className="
                                    mt-4
                                    text-xl
                                    font-bold
                                    text-[#17233c]
                                    sm:text-2xl
                                "
                            >
                                +12%
                            </h2>

                        </div>

                    </div>


                    {/* =================================================
                        SPENDING OVERVIEW + EXPENSE BREAKDOWN
                    ================================================= */}

                    <div
                        className="
                            mt-4
                            grid
                            grid-cols-1
                            gap-4
                            lg:grid-cols-[minmax(0,1fr)_280px]
                        "
                    >

                        {/* SPENDING OVERVIEW */}

                        <div
                            className="
                                min-w-0
                                rounded-xl
                                border
                                border-[#e5eaf0]
                                bg-white
                                p-4
                                shadow-sm
                                sm:p-5
                            "
                        >

                            <div>

                                <h2
                                    className="
                                        text-base
                                        font-bold
                                        text-[#17233c]
                                        sm:text-lg
                                    "
                                >
                                    Spending Overview
                                </h2>


                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        text-[#7185a3]
                                    "
                                >
                                    Where your money goes
                                </p>

                            </div>


                            <div
                                className="
                                    mt-5
                                    h-[300px]
                                    w-full
                                "
                            >

                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >

                                    <BarChart
                                        data={
                                            spendingOverviewData
                                        }
                                        margin={{
                                            top: 10,
                                            right: 5,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                        barGap={2}
                                    >

                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            vertical={false}
                                            stroke="#edf1f5"
                                        />


                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{
                                                fill: "#7185a3",
                                                fontSize: 11,
                                            }}
                                        />


                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{
                                                fill: "#7185a3",
                                                fontSize: 10,
                                            }}
                                            tickFormatter={
                                                formatShortMoney
                                            }
                                        />


                                        <Tooltip
                                            formatter={(
                                                value
                                            ) =>
                                                formatMoney(
                                                    value
                                                )
                                            }
                                        />


                                        <Bar
                                            dataKey="food"
                                            name="Food & Dining"
                                            fill="#49bda8"
                                            radius={[
                                                5,
                                                5,
                                                0,
                                                0,
                                            ]}
                                        />


                                        <Bar
                                            dataKey="travel"
                                            name="Travel"
                                            fill="#8a5cf6"
                                            radius={[
                                                5,
                                                5,
                                                0,
                                                0,
                                            ]}
                                        />


                                        <Bar
                                            dataKey="shopping"
                                            name="Shopping"
                                            fill="#f06b9a"
                                            radius={[
                                                5,
                                                5,
                                                0,
                                                0,
                                            ]}
                                        />


                                        <Bar
                                            dataKey="bills"
                                            name="Bills & Utilities"
                                            fill="#ff9f43"
                                            radius={[
                                                5,
                                                5,
                                                0,
                                                0,
                                            ]}
                                        />


                                        <Bar
                                            dataKey="entertainment"
                                            name="Entertainment"
                                            fill="#5b8def"
                                            radius={[
                                                5,
                                                5,
                                                0,
                                                0,
                                            ]}
                                        />


                                        <Bar
                                            dataKey="others"
                                            name="Others"
                                            fill="#94a3b8"
                                            radius={[
                                                5,
                                                5,
                                                0,
                                                0,
                                            ]}
                                        />

                                    </BarChart>

                                </ResponsiveContainer>

                            </div>


                            {/* LEGEND */}

                            <div
                                className="
                                    flex
                                    flex-wrap
                                    gap-x-4
                                    gap-y-2
                                    border-t
                                    border-[#f0f2f5]
                                    pt-3
                                "
                            >

                                {[
                                    [
                                        "#49bda8",
                                        "Food & Dining",
                                    ],
                                    [
                                        "#8a5cf6",
                                        "Travel",
                                    ],
                                    [
                                        "#f06b9a",
                                        "Shopping",
                                    ],
                                    [
                                        "#ff9f43",
                                        "Bills & Utilities",
                                    ],
                                    [
                                        "#5b8def",
                                        "Entertainment",
                                    ],
                                    [
                                        "#94a3b8",
                                        "Others",
                                    ],
                                ].map(
                                    ([color, name]) => (

                                        <div
                                            key={name}
                                            className="
                                                flex
                                                items-center
                                                gap-1.5
                                                text-[10px]
                                                text-[#607697]
                                            "
                                        >

                                            <span
                                                className="
                                                    h-2.5
                                                    w-2.5
                                                    rounded-full
                                                "
                                                style={{
                                                    backgroundColor:
                                                        color,
                                                }}
                                            />

                                            {name}

                                        </div>

                                    )
                                )}

                            </div>

                        </div>


                        {/* EXPENSE BREAKDOWN */}

                        <div
                            className="
                                min-w-0
                                rounded-xl
                                border
                                border-[#e5eaf0]
                                bg-white
                                p-4
                                shadow-sm
                                sm:p-5
                            "
                        >

                            <h2
                                className="
                                    text-base
                                    font-bold
                                    text-[#17233c]
                                "
                            >
                                Expense Breakdown
                            </h2>


                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-[#7185a3]
                                "
                            >
                                Your spending by category
                            </p>


                            <div
                                className="
                                    relative
                                    mx-auto
                                    mt-3
                                    h-[190px]
                                    w-full
                                    max-w-[230px]
                                "
                            >

                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >

                                    <PieChart>

                                        <Pie
                                            data={
                                                categoryData
                                            }
                                            dataKey="value"
                                            nameKey="name"
                                            innerRadius={60}
                                            outerRadius={82}
                                            paddingAngle={2}
                                            stroke="none"
                                        >

                                            {categoryData.map(
                                                (
                                                    item,
                                                    index
                                                ) => (

                                                    <Cell
                                                        key={
                                                            item.name
                                                        }
                                                        fill={
                                                            pieColors[
                                                                index %
                                                                pieColors.length
                                                            ]
                                                        }
                                                    />

                                                )
                                            )}

                                        </Pie>


                                        <Tooltip
                                            formatter={(
                                                value
                                            ) =>
                                                formatMoney(
                                                    value
                                                )
                                            }
                                        />

                                    </PieChart>

                                </ResponsiveContainer>


                                <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        inset-0
                                        flex
                                        flex-col
                                        items-center
                                        justify-center
                                    "
                                >

                                    <span
                                        className="
                                            text-lg
                                            font-bold
                                            text-[#17233c]
                                        "
                                    >
                                        {formatMoney(
                                            categoryTotal
                                        )}
                                    </span>


                                    <span
                                        className="
                                            text-[10px]
                                            text-[#7185a3]
                                        "
                                    >
                                        Total Spent
                                    </span>

                                </div>

                            </div>


                            {/* CATEGORY LIST */}

                            <div
                                className="
                                    mt-2
                                    flex
                                    flex-col
                                    gap-2
                                "
                            >

                                {categoryData
                                    .slice(0, 6)
                                    .map(
                                        (
                                            item,
                                            index
                                        ) => {

                                            const percentage =
                                                categoryTotal >
                                                0
                                                    ? Math.round(
                                                        (
                                                            item.value /
                                                            categoryTotal
                                                        ) *
                                                        100
                                                    )
                                                    : 0;


                                            return (

                                                <div
                                                    key={
                                                        item.name
                                                    }
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                    "
                                                >

                                                    <span
                                                        className="
                                                            h-2.5
                                                            w-2.5
                                                            shrink-0
                                                            rounded-full
                                                        "
                                                        style={{
                                                            backgroundColor:
                                                                pieColors[
                                                                    index %
                                                                    pieColors.length
                                                                ],
                                                        }}
                                                    />


                                                    <span
                                                        className="
                                                            min-w-0
                                                            flex-1
                                                            truncate
                                                            text-[10px]
                                                            text-[#607697]
                                                        "
                                                    >
                                                        {item.name}
                                                    </span>


                                                    <span
                                                        className="
                                                            shrink-0
                                                            text-[10px]
                                                            text-[#607697]
                                                        "
                                                    >
                                                        {percentage}%
                                                    </span>


                                                    <span
                                                        className="
                                                            shrink-0
                                                            text-[10px]
                                                            font-medium
                                                            text-[#607697]
                                                        "
                                                    >
                                                        {formatMoney(
                                                            item.value
                                                        )}
                                                    </span>

                                                </div>

                                            );

                                        }
                                    )}

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        MONTHLY SPENDING TREND
                    ================================================= */}

                    <div
                        className="
                            mt-4
                            rounded-xl
                            border
                            border-[#e5eaf0]
                            bg-white
                            p-4
                            shadow-sm
                            sm:p-5
                        "
                    >

                        <div
                            className="
                                flex
                                items-start
                                justify-between
                            "
                        >

                            <div>

                                <h2
                                    className="
                                        text-base
                                        font-bold
                                        text-[#17233c]
                                        sm:text-lg
                                    "
                                >
                                    Monthly Spending Trend
                                </h2>


                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        text-[#7185a3]
                                    "
                                >
                                    Track your income and expenses
                                    over the last 6 months
                                </p>

                            </div>


                            {/* LEGEND */}

                            <div
                                className="
                                    hidden
                                    items-center
                                    gap-4
                                    sm:flex
                                "
                            >

                                <span
                                    className="
                                        flex
                                        items-center
                                        gap-1.5
                                        text-[10px]
                                        text-[#7185a3]
                                    "
                                >

                                    <span
                                        className="
                                            h-2.5
                                            w-2.5
                                            rounded-full
                                            bg-[#49bda8]
                                        "
                                    />

                                    Income

                                </span>


                                <span
                                    className="
                                        flex
                                        items-center
                                        gap-1.5
                                        text-[10px]
                                        text-[#7185a3]
                                    "
                                >

                                    <span
                                        className="
                                            h-2.5
                                            w-2.5
                                            rounded-full
                                            bg-[#8a5cf6]
                                        "
                                    />

                                    Expenses

                                </span>

                            </div>

                        </div>


                        <div
                            className="
                                mt-4
                                h-[280px]
                                w-full
                            "
                        >

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <LineChart
                                    data={monthlyData}
                                    margin={{
                                        top: 10,
                                        right: 5,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke="#edf1f5"
                                    />


                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fill: "#7185a3",
                                            fontSize: 11,
                                        }}
                                    />


                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fill: "#7185a3",
                                            fontSize: 10,
                                        }}
                                        tickFormatter={
                                            formatShortMoney
                                        }
                                    />


                                    <Tooltip
                                        formatter={(
                                            value
                                        ) =>
                                            formatMoney(
                                                value
                                            )
                                        }
                                    />


                                    <Line
                                        type="monotone"
                                        dataKey="income"
                                        name="Income"
                                        stroke="#49bda8"
                                        strokeWidth={2}
                                        dot={{
                                            r: 4,
                                            fill: "#49bda8",
                                        }}
                                    />


                                    <Line
                                        type="monotone"
                                        dataKey="expenses"
                                        name="Expenses"
                                        stroke="#8a5cf6"
                                        strokeWidth={2}
                                        dot={{
                                            r: 4,
                                            fill: "#8a5cf6",
                                        }}
                                    />

                                </LineChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>

            </main>

        </div>

    );

}

export default Analytics;