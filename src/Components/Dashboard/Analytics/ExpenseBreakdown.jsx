import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";


function ExpenseBreakdown({
    categoryData,
    categoryTotal,
    pieColors,
    formatMoney,
}) {
    return (
        <div className="min-w-0 rounded-xl border border-[#e5eaf0] bg-white p-4 shadow-sm sm:p-5">

            <h2 className="text-base font-bold text-[#17233c]">
                Expense Breakdown
            </h2>

            <p className="mt-1 text-xs text-[#7185a3]">
                Your spending by category
            </p>


            {/* DONUT */}
            <div className="relative mx-auto mt-3 h-[190px] w-full max-w-[230px]">

                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>

                        <Pie
                            data={categoryData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={60}
                            outerRadius={82}
                            paddingAngle={2}
                            stroke="none"
                        >
                            {categoryData.map((item, index) => (
                                <Cell
                                    key={item.name}
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

                    </PieChart>
                </ResponsiveContainer>


                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

                    <span className="text-lg font-bold text-[#17233c]">
                        {formatMoney(categoryTotal)}
                    </span>

                    <span className="text-[10px] text-[#7185a3]">
                        Total Spent
                    </span>

                </div>

            </div>


            {/* CATEGORY LIST */}
            <div className="mt-2 flex flex-col gap-2">

                {categoryData.slice(0, 6).map((item, index) => {

                    const percentage =
                        categoryTotal > 0
                            ? Math.round(
                                (item.value / categoryTotal) * 100
                            )
                            : 0;

                    const color =
                        pieColors[index % pieColors.length];

                    return (
                        <div
                            key={item.name}
                            className="flex items-center gap-2"
                        >

                            <span
                                className="h-2.5 w-2.5 shrink-0 rounded-full"
                                style={{ backgroundColor: color }}
                            />

                            <span className="min-w-0 flex-1 truncate text-[10px] text-[#607697]">
                                {item.name}
                            </span>

                            <span className="shrink-0 text-[10px] text-[#607697]">
                                {percentage}%
                            </span>

                            <span className="shrink-0 text-[10px] font-medium text-[#607697]">
                                {formatMoney(item.value)}
                            </span>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}

export default ExpenseBreakdown;