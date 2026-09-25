import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function MonthlyBarChart() {

    const data = [
        { month: "Apr", spending: 38 },
        { month: "May", spending: 58 },
        { month: "Jun", spending: 52 },
        { month: "Jul", spending: 76 },
        { month: "Aug", spending: 92 },
        { month: "Sep", spending: 84 },
    ];

    return (
        <section className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-[#f0ede8] p-3 md:p-4">


            {/* TITLE */}
            <div className="shrink-0">
                <h2 className="text-sm font-semibold text-[#4b4d4d] md:text-base lg:text-lg">
                    Monthly Spending
                </h2>

                <p className="text-[10px] text-gray-500 md:text-xs">
                    Spending activity from April to September
                </p>
            </div>




            {/* CHART */}
            <div className="mt-2 min-h-0 w-full flex-1">

                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 5,
                            left: -25,
                            bottom: 5,
                        }}
                        barCategoryGap="25%"
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#ded7d3"
                        />

                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 10, fill: "#6b6b6b" }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            domain={[0, 100]}
                            ticks={[0, 20, 40, 60, 80, 100]}
                            tick={{ fontSize: 9, fill: "#6b6b6b" }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            formatter={(value) => [`${value}%`, "Spending"]}
                            contentStyle={{
                                borderRadius: "10px",
                                border: "1px solid #ded7d3",
                                backgroundColor: "#ffffff",
                                fontSize: "11px",
                            }}
                        />

                        <Bar
                            dataKey="spending"
                            name="Spending"
                            fill="#8B6F5A"
                            radius={[5, 5, 0, 0]}
                            barSize={18}
                        />

                    </BarChart>
                </ResponsiveContainer>

            </div>

        </section>
    );
}

export default MonthlyBarChart;