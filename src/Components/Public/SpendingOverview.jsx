import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function SpendingOverview() {

    const data = [
        {
            category: "Necessities",
            amount: 18000,
        },
        {
            category: "Transport",
            amount: 10000,
        },
        {
            category: "Shopping",
            amount: 12000,
        },
        {
            category: "Bills",
            amount: 14000,
        },
        {
            category: "Luxury",
            amount: 14000,
        },
        {
            category: "Investment",
            amount: 18400,
        },
        
    ];

    const COLORS = [
        "#8B6F5A",
        "#A88F7A",
        "#C4A98C",
        "#6F7C72",
        "#9A9A9A",
    ];

    const total = data.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    return (
        <section className="w-full h-full bg-[#f0ede8] rounded-2xl p-3 md:p-4 flex flex-col overflow-hidden">

            {/* TITLE */}
            <div className="shrink-0">

                <h2 className="text-sm md:text-base lg:text-lg font-semibold text-[#4b4d4d]">
                    Spending Overview
                </h2>

                <p className="text-[10px] md:text-xs text-gray-500">
                    Where your money went this month
                </p>

            </div>


            {/* CHART + DETAILS */}
            <div className="w-full flex-1 min-h-0 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">

                {/* PIE CHART */}
                <div className="w-full sm:w-1/2 h-[180px] sm:h-full min-h-0 relative">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <PieChart>

                            <Pie
                                data={data}
                                dataKey="amount"
                                nameKey="category"
                                cx="50%"
                                cy="50%"
                                innerRadius="52%"
                                outerRadius="72%"
                                paddingAngle={3}
                                cornerRadius={5}
                                stroke="none"
                            >

                                {data.map((item, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            COLORS[
                                                index % COLORS.length
                                            ]
                                        }
                                    />
                                ))}

                            </Pie>

                            <Tooltip
                                formatter={(value) => [
                                    `₹${value.toLocaleString("en-IN")}`,
                                    "Spent",
                                ]}
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "1px solid #ded7d3",
                                    backgroundColor: "#ffffff",
                                    fontSize: "11px",
                                }}
                            />

                        </PieChart>

                    </ResponsiveContainer>


                    {/* CENTER TOTAL */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">

                        <span className="text-[9px] md:text-[10px] text-gray-500">
                            Total
                        </span>

                        <span className="text-base md:text-lg lg:text-xl font-semibold text-[#4b4d4d]">
                            ₹{total.toLocaleString("en-IN")}
                        </span>

                    </div>

                </div>


                {/* DETAILS */}
                <div className="w-full sm:w-1/2 flex flex-col gap-1.5 md:gap-2">

                    {data.map((item, index) => {

                        const percentage = (
                            (item.amount / total) *
                            100
                        ).toFixed(0);

                        return (
                            <div
                                key={item.category}
                                className="flex items-center justify-between"
                            >

                                <div className="flex items-center gap-2">

                                    <span
                                        className="w-2 h-2 rounded-full shrink-0"
                                        style={{
                                            backgroundColor:
                                                COLORS[
                                                    index %
                                                    COLORS.length
                                                ],
                                        }}
                                    />

                                    <span className="text-[10px] md:text-xs text-[#4b4d4d]">
                                        {item.category}
                                    </span>

                                </div>

                                <div className="flex items-center gap-2">

                                    <span className="text-[10px] md:text-xs font-medium text-[#4b4d4d]">
                                        ₹{item.amount.toLocaleString("en-IN")}
                                    </span>

                                    <span className="text-[9px] text-gray-400 w-7 text-right">
                                        {percentage}%
                                    </span>

                                </div>

                            </div>
                        );
                    })}

                </div>

            </div>

        </section>
    );
}

export default SpendingOverview;