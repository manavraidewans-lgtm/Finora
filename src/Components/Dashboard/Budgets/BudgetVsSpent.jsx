import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

function BudgetVsSpent({ data, formatMoney }) {
    return (
        <div className="min-w-0 rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5 lg:col-span-2">


            {/* HEADER */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-[#111827]">
                    Budget vs Spent
                </h2>

                <p className="text-sm text-[#8b95a5]">
                    Compare your budget limits with actual spending
                </p>
            </div>


            {/* CHART */}
            <div className="h-75 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
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
                            tickFormatter={(value) => `₹${value / 1000}k`}
                        />

                        <Tooltip
                            formatter={(value) => formatMoney(value)}
                        />

                        <Legend />

                        <Bar
                            dataKey="Budget"
                            fill="#a38671"
                            radius={[5, 5, 0, 0]}
                        />

                        <Bar
                            dataKey="Spent"
                            fill="#43a7a7"
                            radius={[5, 5, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}

export default BudgetVsSpent;