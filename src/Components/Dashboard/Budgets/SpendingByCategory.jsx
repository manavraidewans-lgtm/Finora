import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

function SpendingByCategory({ data, pieColors, formatMoney }) {
    return (
        <div className="min-w-0 rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">

            {/* HEADER */}
            <div className="mb-2">
                <h2 className="text-lg font-semibold text-[#111827]">
                    Spending by Category
                </h2>

                <p className="text-sm text-[#8b95a5]">
                    Where your money is being spent
                </p>
            </div>

            {/* CHART */}
            <div className="h-75 w-full">
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="45%"
                                innerRadius={65}
                                outerRadius={95}
                                paddingAngle={3}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            pieColors[
                                                index % pieColors.length
                                            ]
                                        }
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                formatter={(value) => formatMoney(value)}
                            />

                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    
                    <div className="flex h-full items-center justify-center text-center">
                        <div>
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f3eee9] text-[#896b57]">
                                <i className="ri-pie-chart-2-line text-xl"></i>
                            </div>

                            <p className="mt-3 text-sm text-[#8b95a5]">
                                Add expense transactions to see your spending
                                breakdown.
                            </p>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default SpendingByCategory;