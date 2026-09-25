import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

function BudgetUsage({ data }) {
    return (
        <div className="min-w-0 rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">


            {/* HEADER */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-[#111827]">
                    Budget Usage
                </h2>

                <p className="text-sm text-[#8b95a5]">
                    Percentage of each budget already used
                </p>
            </div>


            {/* CHART */}
            <div className="h-75 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
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
                            domain={[0, "dataMax + 10"]}
                            tick={{
                                fontSize: 11,
                                fill: "#667085",
                            }}
                            tickFormatter={(value) => `${value}%`}
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
                            formatter={(value) => `${value}%`}
                        />

                        <Bar
                            dataKey="Usage"
                            fill="#896b57"
                            radius={[0, 6, 6, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}

export default BudgetUsage;