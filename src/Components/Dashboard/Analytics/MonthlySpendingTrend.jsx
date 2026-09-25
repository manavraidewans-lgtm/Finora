import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";


function MonthlySpendingTrend({
    data,
    formatMoney,
    formatShortMoney,
}) {
    return (
        <div className="mt-4 rounded-xl border border-[#e5eaf0] bg-white p-4 shadow-sm sm:p-5">

            {/* HEADER */}
            <div className="flex items-start justify-between">

                <div>
                    <h2 className="text-base font-bold text-[#17233c] sm:text-lg">
                        Monthly Spending Trend
                    </h2>

                    <p className="mt-1 text-xs text-[#7185a3]">
                        Track your income and expenses over the last 6 months
                    </p>
                </div>

                {/* LEGEND */}
                <div className="hidden items-center gap-4 sm:flex">

                    <span className="flex items-center gap-1.5 text-[10px] text-[#7185a3]">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#49bda8]" />
                        Income
                    </span>

                    <span className="flex items-center gap-1.5 text-[10px] text-[#7185a3]">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#8a5cf6]" />
                        Expenses
                    </span>

                </div>
            </div>


            {/* CHART */}
            <div className="mt-4 h-[280px] w-full">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart
                        data={data}
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
                            tickFormatter={formatShortMoney}
                        />

                        <Tooltip
                            formatter={(value) => formatMoney(value)}
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
    );
}

export default MonthlySpendingTrend;