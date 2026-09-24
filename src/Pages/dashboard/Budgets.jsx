import { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
} from "recharts";

import Navbar from "../../Components/Dashboard/Navbar.jsx";
import Top from "../../Components/Dashboard/Top.jsx";


function Budgets() {

    // ================= BUDGETS =================

    const [budgets, setBudgets] = useState(() => {

        const saved =
            localStorage.getItem("finoraBudgets");

        if (saved) {

            try {

                return JSON.parse(saved);

            } catch (error) {

                console.error(
                    "Budget loading error:",
                    error
                );

            }

        }

        return [];

    });


    // ================= TRANSACTIONS =================

    const [transactions, setTransactions] = useState(() => {

        const saved =
            localStorage.getItem("finoraTransactions");

        if (saved) {

            try {

                return JSON.parse(saved);

            } catch (error) {

                console.error(
                    "Transaction loading error:",
                    error
                );

            }

        }

        return [];

    });


    // ================= FORM =================

    const [formData, setFormData] = useState({

        name: "",
        category: "Food & Dining",
        limit: "",

    });


    // ================= SAVE BUDGETS =================

    useEffect(() => {

        localStorage.setItem(
            "finoraBudgets",
            JSON.stringify(budgets)
        );

    }, [budgets]);


    // ================= SYNC TRANSACTIONS =================

    useEffect(() => {

        const loadTransactions = () => {

            const saved =
                localStorage.getItem(
                    "finoraTransactions"
                );

            if (saved) {

                try {

                    setTransactions(
                        JSON.parse(saved)
                    );

                } catch (error) {

                    console.error(
                        "Transaction sync error:",
                        error
                    );

                }

            } else {

                setTransactions([]);

            }

        };


        window.addEventListener(
            "transactionsUpdated",
            loadTransactions
        );

        window.addEventListener(
            "storage",
            loadTransactions
        );


        return () => {

            window.removeEventListener(
                "transactionsUpdated",
                loadTransactions
            );

            window.removeEventListener(
                "storage",
                loadTransactions
            );

        };

    }, []);


    // ================= SYNC BUDGETS =================

    useEffect(() => {

        const loadBudgets = () => {

            const saved =
                localStorage.getItem(
                    "finoraBudgets"
                );

            if (saved) {

                try {

                    setBudgets(
                        JSON.parse(saved)
                    );

                } catch (error) {

                    console.error(
                        "Budget sync error:",
                        error
                    );

                }

            } else {

                setBudgets([]);

            }

        };


        window.addEventListener(
            "budgetsUpdated",
            loadBudgets
        );

        window.addEventListener(
            "storage",
            loadBudgets
        );


        return () => {

            window.removeEventListener(
                "budgetsUpdated",
                loadBudgets
            );

            window.removeEventListener(
                "storage",
                loadBudgets
            );

        };

    }, []);


    // ================= INPUT =================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({

            ...prev,
            [name]: value,

        }));

    };


    // ================= ADD BUDGET =================

    const handleSubmit = (e) => {

        e.preventDefault();

        if (
            !formData.name ||
            !formData.limit
        ) {

            return;

        }


        const newBudget = {

            id: Date.now(),

            name: formData.name,

            category: formData.category,

            limit: Number(formData.limit),

        };


        const updatedBudgets = [

            newBudget,
            ...budgets,

        ];


        setBudgets(
            updatedBudgets
        );


        localStorage.setItem(
            "finoraBudgets",
            JSON.stringify(updatedBudgets)
        );


        window.dispatchEvent(
            new Event("budgetsUpdated")
        );


        // Reset

        setFormData({

            name: "",
            category: "Food & Dining",
            limit: "",

        });

    };


    // ================= DELETE =================

    const handleDelete = (id) => {

        const updatedBudgets =
            budgets.filter(
                (budget) =>
                    budget.id !== id
            );


        setBudgets(
            updatedBudgets
        );


        localStorage.setItem(
            "finoraBudgets",
            JSON.stringify(updatedBudgets)
        );


        window.dispatchEvent(
            new Event("budgetsUpdated")
        );

    };


    // ================= SPENT =================

    const getSpent = (category) => {

        return transactions

            .filter(
                (transaction) =>
                    transaction.type?.toLowerCase() ===
                        "expense" &&
                    transaction.category === category
            )

            .reduce(
                (total, transaction) =>
                    total +
                    Number(transaction.amount || 0),
                0
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


    // ================= CHART DATA =================

    const budgetChartData = budgets.map(
        (budget) => {

            const spent =
                getSpent(
                    budget.category
                );

            return {

                name:
                    budget.name.length > 12
                        ? budget.name.substring(0, 12) + "..."
                        : budget.name,

                Budget: Number(
                    budget.limit || 0
                ),

                Spent: Number(
                    spent || 0
                ),

            };

        }
    );


    // ================= CATEGORY CHART =================

    const categoryTotals = {};

    transactions

        .filter(
            (transaction) =>
                transaction.type?.toLowerCase() ===
                "expense"
        )

        .forEach(
            (transaction) => {

                const category =
                    transaction.category ||
                    "Others";

                categoryTotals[category] =
                    (categoryTotals[category] || 0) +
                    Number(transaction.amount || 0);

            }
        );


    const categoryChartData =
        Object.entries(categoryTotals)
            .map(
                ([name, value]) => ({

                    name,
                    value,

                })
            )
            .filter(
                (item) =>
                    item.value > 0
            );


    // ================= BUDGET USAGE =================

    const usageChartData =
        budgets.map(
            (budget) => {

                const spent =
                    getSpent(
                        budget.category
                    );

                const usage =
                    budget.limit > 0
                        ? Math.round(
                              (spent /
                                  budget.limit) *
                                  100
                          )
                        : 0;

                return {

                    name:
                        budget.name.length > 12
                            ? budget.name.substring(0, 12) + "..."
                            : budget.name,

                    Usage:
                        usage,

                };

            }
        );


    // ================= PIE COLORS =================

    const pieColors = [
        "#896b57",
        "#43a7a7",
        "#967056",
        "#7b8db8",
        "#a38671",
        "#6f8f72",
        "#b28b6c",
        "#9a7b9a",
    ];


    return (

        <div className="
            min-h-screen
            w-full
            bg-[#f7f4ef]
        ">

            <Navbar />


            <main
                className="
                    w-full
                    lg:ml-[240px]
                    lg:w-[calc(100%-240px)]
                "
            >

                <Top
                    Icon="ri-crosshair-2-line"
                    Tittle="Budget"
                    Description="Set limits, stay on track and achieve your financial goals"
                />


                <div className="
                    w-full
                    p-4
                    sm:p-5
                    md:p-6
                    lg:p-8
                ">


                    {/* ================= ADD BUDGET ================= */}

                    <div className="
                        w-full
                        rounded-2xl
                        border
                        border-[#e8e8e8]
                        bg-white
                        p-4
                        shadow-sm
                        sm:p-5
                        md:p-6
                    ">

                        <div className="
                            mb-5
                            flex
                            items-center
                            gap-3
                        ">

                            <div className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                bg-[#f3eee9]
                                text-[#896b57]
                            ">

                                <i className="
                                    ri-wallet-3-line
                                    text-xl
                                "></i>

                            </div>


                            <div>

                                <h2 className="
                                    text-lg
                                    font-semibold
                                    text-[#111827]
                                ">
                                    Create Budget
                                </h2>

                                <p className="
                                    text-sm
                                    text-[#8b95a5]
                                ">
                                    Set a spending limit for a category
                                </p>

                            </div>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                            className="
                                grid
                                grid-cols-1
                                gap-4
                                md:grid-cols-3
                            "
                        >

                            {/* NAME */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-[#4b4d4d]
                                ">
                                    Budget Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Monthly Food"
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        border
                                        border-[#ded7d3]
                                        bg-[#faf9f7]
                                        px-3
                                        text-sm
                                        outline-none
                                        focus:border-[#a38671]
                                    "
                                />

                            </div>


                            {/* CATEGORY */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-[#4b4d4d]
                                ">
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        border
                                        border-[#ded7d3]
                                        bg-[#faf9f7]
                                        px-3
                                        text-sm
                                        outline-none
                                        focus:border-[#a38671]
                                    "
                                >

                                    <option>
                                        Food & Dining
                                    </option>

                                    <option>
                                        Travel
                                    </option>

                                    <option>
                                        Shopping
                                    </option>

                                    <option>
                                        Bills & Utilities
                                    </option>

                                    <option>
                                        Entertainment
                                    </option>

                                    <option>
                                        Health
                                    </option>

                                    <option>
                                        Education
                                    </option>

                                    <option>
                                        Others
                                    </option>

                                </select>

                            </div>


                            {/* LIMIT */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-[#4b4d4d]
                                ">
                                    Budget Limit
                                </label>

                                <input
                                    type="number"
                                    name="limit"
                                    value={formData.limit}
                                    onChange={handleChange}
                                    placeholder="₹ 10,000"
                                    min="0"
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        border
                                        border-[#ded7d3]
                                        bg-[#faf9f7]
                                        px-3
                                        text-sm
                                        outline-none
                                        focus:border-[#a38671]
                                    "
                                />

                            </div>


                            {/* BUTTON */}

                            <div className="
                                md:col-span-3
                            ">

                                <button
                                    type="submit"
                                    className="
                                        flex
                                        h-11
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        bg-[#967056]
                                        px-5
                                        text-sm
                                        font-medium
                                        text-white
                                        transition
                                        duration-200
                                        hover:bg-[#89634d]
                                    "
                                >

                                    <i className="
                                        ri-add-line
                                    "></i>

                                    Create Budget

                                </button>

                            </div>

                        </form>

                    </div>


                    {/* ================= CHARTS ================= */}

                    {budgets.length > 0 && (

                        <div className="
                            mt-5
                            grid
                            w-full
                            grid-cols-1
                            gap-4
                            lg:grid-cols-2
                        ">


                            {/* ================= BUDGET VS SPENT ================= */}

                            <div className="
                                min-w-0
                                rounded-2xl
                                border
                                border-[#e8e8e8]
                                bg-white
                                p-4
                                shadow-sm
                                sm:p-5
                                lg:col-span-2
                            ">

                                <div className="
                                    mb-4
                                ">

                                    <h2 className="
                                        text-lg
                                        font-semibold
                                        text-[#111827]
                                    ">
                                        Budget vs Spent
                                    </h2>

                                    <p className="
                                        text-sm
                                        text-[#8b95a5]
                                    ">
                                        Compare your budget limits with actual spending
                                    </p>

                                </div>


                                <div className="
                                    h-[300px]
                                    w-full
                                ">

                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >

                                        <BarChart
                                            data={budgetChartData}
                                            margin={{
                                                top: 10,
                                                right: 10,
                                                left: 0,
                                                bottom: 5,
                                            }}
                                        >

                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                                stroke="#eeeeee"
                                            />

                                            <XAxis
                                                dataKey="name"
                                                tick={{
                                                    fontSize: 11,
                                                    fill: "#667085",
                                                }}
                                            />

                                            <YAxis
                                                tick={{
                                                    fontSize: 11,
                                                    fill: "#667085",
                                                }}
                                                tickFormatter={(value) =>
                                                    `₹${value / 1000}k`
                                                }
                                            />

                                            <Tooltip
                                                formatter={(value) =>
                                                    formatMoney(value)
                                                }
                                            />

                                            <Legend />

                                            <Bar
                                                dataKey="Budget"
                                                fill="#a38671"
                                                radius={[
                                                    5,
                                                    5,
                                                    0,
                                                    0,
                                                ]}
                                            />

                                            <Bar
                                                dataKey="Spent"
                                                fill="#43a7a7"
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

                            </div>


                            {/* ================= CATEGORY DONUT ================= */}

                            <div className="
                                min-w-0
                                rounded-2xl
                                border
                                border-[#e8e8e8]
                                bg-white
                                p-4
                                shadow-sm
                                sm:p-5
                            ">

                                <div className="
                                    mb-2
                                ">

                                    <h2 className="
                                        text-lg
                                        font-semibold
                                        text-[#111827]
                                    ">
                                        Spending by Category
                                    </h2>

                                    <p className="
                                        text-sm
                                        text-[#8b95a5]
                                    ">
                                        Where your money is being spent
                                    </p>

                                </div>


                                <div className="
                                    h-[300px]
                                    w-full
                                ">

                                    {categoryChartData.length > 0 ? (

                                        <ResponsiveContainer
                                            width="100%"
                                            height="100%"
                                        >

                                            <PieChart>

                                                <Pie
                                                    data={categoryChartData}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    cx="50%"
                                                    cy="45%"
                                                    innerRadius={65}
                                                    outerRadius={95}
                                                    paddingAngle={3}
                                                >

                                                    {categoryChartData.map(
                                                        (entry, index) => (

                                                            <Cell
                                                                key={`cell-${index}`}
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
                                                    formatter={(value) =>
                                                        formatMoney(value)
                                                    }
                                                />

                                                <Legend />

                                            </PieChart>

                                        </ResponsiveContainer>

                                    ) : (

                                        <div className="
                                            flex
                                            h-full
                                            items-center
                                            justify-center
                                            text-center
                                        ">

                                            <div>

                                                <div className="
                                                    mx-auto
                                                    flex
                                                    h-12
                                                    w-12
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    bg-[#f3eee9]
                                                    text-[#896b57]
                                                ">

                                                    <i className="
                                                        ri-pie-chart-2-line
                                                        text-xl
                                                    "></i>

                                                </div>

                                                <p className="
                                                    mt-3
                                                    text-sm
                                                    text-[#8b95a5]
                                                ">
                                                    Add expense transactions
                                                    to see your spending
                                                    breakdown.
                                                </p>

                                            </div>

                                        </div>

                                    )}

                                </div>

                            </div>


                            {/* ================= USAGE BAR ================= */}

                            <div className="
                                min-w-0
                                rounded-2xl
                                border
                                border-[#e8e8e8]
                                bg-white
                                p-4
                                shadow-sm
                                sm:p-5
                            ">

                                <div className="
                                    mb-4
                                ">

                                    <h2 className="
                                        text-lg
                                        font-semibold
                                        text-[#111827]
                                    ">
                                        Budget Usage
                                    </h2>

                                    <p className="
                                        text-sm
                                        text-[#8b95a5]
                                    ">
                                        Percentage of each budget already used
                                    </p>

                                </div>


                                <div className="
                                    h-[300px]
                                    w-full
                                ">

                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >

                                        <BarChart
                                            data={usageChartData}
                                            layout="vertical"
                                            margin={{
                                                top: 5,
                                                right: 15,
                                                left: 10,
                                                bottom: 5,
                                            }}
                                        >

                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                horizontal={false}
                                                stroke="#eeeeee"
                                            />

                                            <XAxis
                                                type="number"
                                                domain={[
                                                    0,
                                                    "dataMax + 10",
                                                ]}
                                                tick={{
                                                    fontSize: 11,
                                                    fill: "#667085",
                                                }}
                                                tickFormatter={(value) =>
                                                    `${value}%`
                                                }
                                            />

                                            <YAxis
                                                type="category"
                                                dataKey="name"
                                                width={85}
                                                tick={{
                                                    fontSize: 11,
                                                    fill: "#667085",
                                                }}
                                            />

                                            <Tooltip
                                                formatter={(value) =>
                                                    `${value}%`
                                                }
                                            />

                                            <Bar
                                                dataKey="Usage"
                                                fill="#896b57"
                                                radius={[
                                                    0,
                                                    6,
                                                    6,
                                                    0,
                                                ]}
                                            />

                                        </BarChart>

                                    </ResponsiveContainer>

                                </div>

                            </div>

                        </div>

                    )}


                    {/* ================= BUDGET CARDS ================= */}

                    <div className="
                        mt-5
                        grid
                        w-full
                        grid-cols-1
                        gap-4
                        md:grid-cols-2
                        lg:grid-cols-3
                    ">


                        {budgets.length === 0 ? (

                            <div className="
                                rounded-2xl
                                border
                                border-[#e8e8e8]
                                bg-white
                                p-8
                                text-center
                                md:col-span-2
                                lg:col-span-3
                            ">

                                <div className="
                                    mx-auto
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-[#f3eee9]
                                    text-[#896b57]
                                ">

                                    <i className="
                                        ri-pie-chart-2-line
                                        text-2xl
                                    "></i>

                                </div>


                                <h2 className="
                                    mt-4
                                    text-lg
                                    font-semibold
                                    text-[#111827]
                                ">
                                    No budgets yet
                                </h2>


                                <p className="
                                    mt-1
                                    text-sm
                                    text-[#8b95a5]
                                ">
                                    Create your first budget to start
                                    tracking your spending.
                                </p>

                            </div>

                        ) : (

                            budgets.map(
                                (budget) => {

                                    const spent =
                                        getSpent(
                                            budget.category
                                        );


                                    const percentage =
                                        budget.limit > 0
                                            ? Math.round(
                                                  (spent /
                                                      budget.limit) *
                                                      100
                                              )
                                            : 0;


                                    const progress =
                                        Math.min(
                                            percentage,
                                            100
                                        );


                                    const remaining =
                                        Math.max(
                                            budget.limit -
                                                spent,
                                            0
                                        );


                                    const isOver =
                                        spent >
                                        budget.limit;


                                    return (

                                        <div
                                            key={budget.id}
                                            className="
                                                rounded-2xl
                                                border
                                                border-[#e8e8e8]
                                                bg-white
                                                p-5
                                                shadow-sm
                                                transition
                                                duration-300
                                                hover:-translate-y-1
                                                hover:shadow-md
                                            "
                                        >


                                            {/* HEADER */}

                                            <div className="
                                                flex
                                                items-start
                                                justify-between
                                                gap-3
                                            ">

                                                <div className="
                                                    min-w-0
                                                ">

                                                    <h2 className="
                                                        truncate
                                                        text-lg
                                                        font-semibold
                                                        text-[#111827]
                                                    ">
                                                        {budget.name}
                                                    </h2>

                                                    <p className="
                                                        mt-1
                                                        text-sm
                                                        text-[#8b95a5]
                                                    ">
                                                        {budget.category}
                                                    </p>

                                                </div>


                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            budget.id
                                                        )
                                                    }
                                                    className="
                                                        shrink-0
                                                        text-[#9ca3af]
                                                        transition
                                                        hover:text-red-500
                                                    "
                                                >

                                                    <i className="
                                                        ri-delete-bin-line
                                                    "></i>

                                                </button>

                                            </div>


                                            {/* AMOUNTS */}

                                            <div className="
                                                mt-6
                                                flex
                                                items-end
                                                justify-between
                                            ">

                                                <div>

                                                    <p className="
                                                        text-xs
                                                        text-[#8b95a5]
                                                    ">
                                                        Spent
                                                    </p>

                                                    <h3 className="
                                                        mt-1
                                                        text-xl
                                                        font-bold
                                                        text-[#111827]
                                                    ">
                                                        {formatMoney(
                                                            spent
                                                        )}
                                                    </h3>

                                                </div>


                                                <div className="
                                                    text-right
                                                ">

                                                    <p className="
                                                        text-xs
                                                        text-[#8b95a5]
                                                    ">
                                                        Limit
                                                    </p>

                                                    <h3 className="
                                                        mt-1
                                                        text-base
                                                        font-semibold
                                                        text-[#667085]
                                                    ">
                                                        {formatMoney(
                                                            budget.limit
                                                        )}
                                                    </h3>

                                                </div>

                                            </div>


                                            {/* PROGRESS */}

                                            <div className="
                                                mt-5
                                            ">

                                                <div className="
                                                    h-2.5
                                                    w-full
                                                    overflow-hidden
                                                    rounded-full
                                                    bg-[#e9eef3]
                                                ">

                                                    <div
                                                        className={`
                                                            h-full
                                                            rounded-full
                                                            transition-all
                                                            duration-500
                                                            ${
                                                                isOver
                                                                    ? "bg-red-500"
                                                                    : "bg-[#43a7a7]"
                                                            }
                                                        `}
                                                        style={{
                                                            width:
                                                                `${progress}%`,
                                                        }}
                                                    />

                                                </div>


                                                <div className="
                                                    mt-2
                                                    flex
                                                    items-center
                                                    justify-between
                                                ">

                                                    <span
                                                        className={`
                                                            text-xs
                                                            font-medium
                                                            ${
                                                                isOver
                                                                    ? "text-red-500"
                                                                    : "text-[#667085]"
                                                            }
                                                        `}
                                                    >
                                                        {percentage}% used
                                                    </span>


                                                    <span className="
                                                        text-xs
                                                        text-[#8b95a5]
                                                    ">

                                                        {isOver
                                                            ? `${formatMoney(
                                                                  spent -
                                                                      budget.limit
                                                              )} over`
                                                            : `${formatMoney(
                                                                  remaining
                                                              )} left`
                                                        }

                                                    </span>

                                                </div>

                                            </div>

                                        </div>

                                    );

                                }
                            )

                        )}

                    </div>

                </div>

            </main>

        </div>

    );

}


export default Budgets;