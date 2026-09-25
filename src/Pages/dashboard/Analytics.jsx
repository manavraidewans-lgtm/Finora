import { useEffect, useMemo, useState } from "react";

import Navbar from "../../Components/Dashboard/Navbar.jsx";
import Top from "../../Components/Dashboard/Top.jsx";

import AnalyticsSummary from "../../Components/Dashboard/Analytics/AnalyticsSummary.jsx";
import SpendingOverview from "../../Components/Dashboard/Analytics/SpendingOverview.jsx";
import ExpenseBreakdown from "../../Components/Dashboard/Analytics/ExpenseBreakdown.jsx";
import MonthlySpendingTrend from "../../Components/Dashboard/Analytics/MonthlySpendingTrend.jsx";


function Analytics() {


    //  TRANSACTIONS 
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem("finoraTransactions");

        if (!saved) return [];

        try {
            return JSON.parse(saved);
        } catch (error) {
            console.error("Analytics transaction loading error:", error);
            return [];
        }
    });



    //  SYNC 
    useEffect(() => {
        const syncTransactions = () => {
            const saved = localStorage.getItem("finoraTransactions");

            if (!saved) {
                setTransactions([]);
                return;
            }

            try {
                setTransactions(JSON.parse(saved));
            } catch (error) {
                console.error("Analytics transaction sync error:", error);
            }
        };

        window.addEventListener("transactionsUpdated", syncTransactions);
        window.addEventListener("storage", syncTransactions);

        return () => {
            window.removeEventListener("transactionsUpdated", syncTransactions);
            window.removeEventListener("storage", syncTransactions);
        };
    }, []);



    //  DEFAULT DATA 
    const defaultCategoryData = [
        { name: "Food & Dining", value: 9450 },
        { name: "Travel", value: 7200 },
        { name: "Shopping", value: 5800 },
        { name: "Bills & Utilities", value: 4200 },
        { name: "Entertainment", value: 3600 },
        { name: "Others", value: 2200 },
    ];

    const defaultMonthlyData = [
        { month: "Apr", income: 54000, expenses: 30000 },
        { month: "May", income: 64000, expenses: 38000 },
        { month: "Jun", income: 72000, expenses: 44000 },
        { month: "Jul", income: 68000, expenses: 42000 },
        { month: "Aug", income: 88000, expenses: 62000 },
        { month: "Sep", income: 86000, expenses: 67000 },
    ];



    //  MONEY FORMAT 
    const formatMoney = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(Number(amount) || 0);

    const formatShortMoney = (amount) => {
        const value = Number(amount) || 0;

        if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
        if (value >= 1000) return `₹${Math.round(value / 1000)}K`;

        return `₹${value}`;
    };



    //  TOTALS 
    const totalIncome = useMemo(() => {
        if (!transactions.length) return 70000;

        return transactions
            .filter((t) => t.type?.toLowerCase() === "income")
            .reduce((total, t) => total + Number(t.amount || 0), 0);
    }, [transactions]);

    const totalExpenses = useMemo(() => {
        if (!transactions.length) return 32450;

        return transactions
            .filter((t) => t.type?.toLowerCase() === "expense")
            .reduce((total, t) => total + Number(t.amount || 0), 0);
    }, [transactions]);

    const savings = totalIncome - totalExpenses;



    //  CATEGORY DATA 
    const categoryData = useMemo(() => {
        if (!transactions.length) return defaultCategoryData;

        const totals = {};

        transactions
            .filter((t) => t.type?.toLowerCase() === "expense")
            .forEach((t) => {
                const category = t.category || "Others";
                totals[category] =
                    (totals[category] || 0) + Number(t.amount || 0);
            });

        const result = Object.entries(totals)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);

        return result.length ? result : defaultCategoryData;
    }, [transactions]);



    //  MONTHLY DATA 
    const monthlyData = useMemo(() => {
        if (!transactions.length) return defaultMonthlyData;

        const now = new Date();
        const months = [];

        for (let i = 5; i >= 0; i--) {
            const date = new Date(
                now.getFullYear(),
                now.getMonth() - i,
                1
            );

            months.push({
                month: date.toLocaleString("en-US", {
                    month: "short",
                }),
                monthNumber: date.getMonth(),
                year: date.getFullYear(),
                income: 0,
                expenses: 0,
            });
        }

        transactions.forEach((transaction) => {
            if (!transaction.date) return;

            const date = new Date(transaction.date);

            if (Number.isNaN(date.getTime())) return;

            const monthData = months.find(
                (item) =>
                    item.monthNumber === date.getMonth() &&
                    item.year === date.getFullYear()
            );

            if (!monthData) return;

            const amount = Number(transaction.amount || 0);
            const type = transaction.type?.toLowerCase();

            if (type === "income") monthData.income += amount;
            if (type === "expense") monthData.expenses += amount;
        });

        return months;
    }, [transactions]);



    //  SPENDING OVERVIEW 
    const spendingOverviewData = useMemo(() => {
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

        const categories = [
            ["food", "Food & Dining"],
            ["travel", "Travel"],
            ["shopping", "Shopping"],
            ["bills", "Bills & Utilities"],
            ["entertainment", "Entertainment"],
        ];

        return monthlyData.map((month) => {
            const monthTransactions = transactions.filter((t) => {
                if (!t.date) return false;

                const date = new Date(t.date);

                return (
                    date.getMonth() === month.monthNumber &&
                    date.getFullYear() === month.year &&
                    t.type?.toLowerCase() === "expense"
                );
            });

            const getCategoryTotal = (category) =>
                monthTransactions
                    .filter((t) => t.category === category)
                    .reduce(
                        (total, t) => total + Number(t.amount || 0),
                        0
                    );

            const result = {
                month: month.month,
            };

            categories.forEach(([key, category]) => {
                result[key] = getCategoryTotal(category);
            });

            result.others = monthTransactions
                .filter(
                    (t) =>
                        !categories.some(
                            ([, category]) => t.category === category
                        )
                )
                .reduce(
                    (total, t) => total + Number(t.amount || 0),
                    0
                );

            return result;
        });
    }, [transactions, monthlyData]);



    //  COLORS 
    const pieColors = [
        "#49bda8",
        "#5b8def",
        "#f06b9a",
        "#ff9f43",
        "#ff6f9f",
        "#8fa0b7",
    ];




    //  TOTAL CATEGORY SPENDING 
    const categoryTotal = categoryData.reduce(
        (total, item) => total + item.value,
        0
    );



    //  RENDER 
    return (
        <div className="min-h-screen w-full bg-[#f7f4ef]">

            <Navbar />

            <main className="w-full lg:ml-60 lg:w-[calc(100%-240px)]">

                <Top
                    Icon="ri-bar-chart-fill"
                    Tittle="Analytics"
                    Description="Gain insights into your spending, savings and financial health"
                />

                <div className="px-3 pb-6 sm:px-5 lg:px-6">

                    <AnalyticsSummary
                        totalIncome={totalIncome}
                        totalExpenses={totalExpenses}
                        savings={savings}
                        formatMoney={formatMoney}
                    />

                    <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">

                        <SpendingOverview
                            data={spendingOverviewData}
                            formatMoney={formatMoney}
                            formatShortMoney={formatShortMoney}
                        />

                        <ExpenseBreakdown
                            categoryData={categoryData}
                            categoryTotal={categoryTotal}
                            pieColors={pieColors}
                            formatMoney={formatMoney}
                        />

                    </div>

                    <MonthlySpendingTrend
                        data={monthlyData}
                        formatMoney={formatMoney}
                        formatShortMoney={formatShortMoney}
                    />

                </div>

            </main>

        </div>
    );
}

export default Analytics;