import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";


function SpendingOverview({
    data,
    formatMoney,
    formatShortMoney,
}) {
    const legend = [
        ["#49bda8", "Food & Dining"],
        ["#8a5cf6", "Travel"],
        ["#f06b9a", "Shopping"],
        ["#ff9f43", "Bills & Utilities"],
        ["#5b8def", "Entertainment"],
        ["#94a3b8", "Others"],
    ];

    const bars = [
        ["food", "Food & Dining", "#49bda8"],
        ["travel", "Travel", "#8a5cf6"],
        ["shopping", "Shopping", "#f06b9a"],
        ["bills", "Bills & Utilities", "#ff9f43"],
        ["entertainment", "Entertainment", "#5b8def"],
        ["others", "Others", "#94a3b8"],
    ];

    return (
        <div className="min-w-0 rounded-xl border border-[#e5eaf0] bg-white p-4 shadow-sm sm:p-5">

            <h2 className="text-base font-bold text-[#17233c] sm:text-lg">
                Spending Overview
            </h2>

            <p className="mt-1 text-xs text-[#7185a3]">
                Where your money goes
            </p>


            {/* CHART */}
            <div className="mt-5 h-[300px] w-full">

                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
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
                            tickFormatter={formatShortMoney}
                        />

                        <Tooltip
                            formatter={(value) => formatMoney(value)}
                        />

                        {bars.map(([key, name, fill]) => (
                            <Bar
                                key={key}
                                dataKey={key}
                                name={name}
                                fill={fill}
                                radius={[5, 5, 0, 0]}
                            />
                        ))}

                    </BarChart>
                </ResponsiveContainer>

            </div>


            {/* LEGEND */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-[#f0f2f5] pt-3">

                {legend.map(([color, name]) => (
                    <div
                        key={name}
                        className="flex items-center gap-1.5 text-[10px] text-[#607697]"
                    >
                        <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: color }}
                        />

                        {name}
                    </div>
                ))}

            </div>

        </div>
    );
}

export default SpendingOverview;