import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function IncomeExpenseChart() {
    const [transactions, setTransactions] = useState([]);


    //  DEFAULT DATA 
    const defaultData = [
        { month: "Jun", income: 62000, expense: 28500 },
        { month: "Jul", income: 68000, expense: 31400 },
        { month: "Aug", income: 65000, expense: 29800 },
        { month: "Sep", income: 70000, expense: 32450 },
    ];


    //  LOAD DATA 
    useEffect(() => {
        const loadTransactions = () => {
            const saved = localStorage.getItem("finoraTransactions");

            if (!saved) {
                setTransactions([]);
                return;
            }

            try {
                const data = JSON.parse(saved);
                setTransactions(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Transaction loading error:", error);
                setTransactions([]);
            }
        };

        loadTransactions();
        window.addEventListener("storage", loadTransactions);

        return () => window.removeEventListener("storage", loadTransactions);
    }, []);


    //  CREATE CHART DATA 
    const months = [
        { name: "Jun", month: 5 },
        { name: "Jul", month: 6 },
        { name: "Aug", month: 7 },
        { name: "Sep", month: 8 },
    ];

    const realData = months.map(({ name, month }) => {
        let income = 0;
        let expense = 0;

        transactions.forEach((transaction) => {
            const dateValue =
                transaction.date ||
                transaction.createdAt ||
                transaction.timestamp;

            if (!dateValue) return;

            const date = new Date(dateValue);
            if (isNaN(date.getTime()) || date.getMonth() !== month) return;

            const amount = Number(transaction.amount) || 0;
            const type = String(transaction.type || "").toLowerCase();

            if (type === "income") income += amount;
            if (type === "expense") expense += amount;
        });

        return { month: name, income, expense };
    });

    const hasRealData = realData.some(
        (item) => item.income > 0 || item.expense > 0
    );

    const chartData = hasRealData ? realData : defaultData;

    //  MONEY FORMAT 

    const formatMoney = (value) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(value);

    //  RETURN 

    return (
        <div className="flex min-h-100 w-full flex-col overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5 md:p-6 lg:p-7">

            {/* HEADING */}
            <div>
                <h1 className="text-xl font-bold text-[#111827] md:text-2xl">
                    Income vs Expenses
                </h1>

                <p className="mt-1 text-sm font-medium text-[#8b95a5] md:text-base">
                    Last 4 months
                </p>
            </div>

            {/* LEGEND */}
            <div className="mt-4 flex items-center gap-5 text-xs font-medium text-[#667085] sm:text-sm">
                <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    <span>Income</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-purple-500" />
                    <span>Expenses</span>
                </div>
            </div>

            {/* CHART */}
            <div className="mt-5 h-65 w-full min-w-0 sm:h-70 md:h-75">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                        barGap={6}
                    >
                        <CartesianGrid
                            stroke="#eeeeee"
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#8b95a5", fontSize: 12 }}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#8b95a5", fontSize: 11 }}
                            tickFormatter={(value) => `₹${value / 1000}k`}
                        />

                        <Tooltip
                            cursor={{ fill: "#f8f7f5" }}
                            formatter={(value, name) => [
                                formatMoney(value),
                                name === "income" ? "Income" : "Expenses",
                            ]}
                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #e8e8e8",
                                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                            }}
                        />

                        <Bar
                            dataKey="income"
                            name="Income"
                            fill="#43B98C"
                            radius={[6, 6, 0, 0]}
                            maxBarSize={28}
                        />

                        <Bar
                            dataKey="expense"
                            name="Expenses"
                            fill="#7657E8"
                            radius={[6, 6, 0, 0]}
                            maxBarSize={28}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}

export default IncomeExpenseChart;