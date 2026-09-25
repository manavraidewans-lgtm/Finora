function AnalyticsSummary({
    totalIncome,
    totalExpenses,
    savings,
    formatMoney,
}) {
    const cards = [
        {
            label: "Total Income",
            value: totalIncome,
            icon: "ri-arrow-up-line",
            bg: "bg-[#e2f7ef]",
            color: "text-[#17a673]",
        },
        {
            label: "Total Expenses",
            value: totalExpenses,
            icon: "ri-arrow-down-line",
            bg: "bg-[#ffe8ee]",
            color: "text-[#f14c73]",
        },
        {
            label: "Savings",
            value: savings,
            icon: "ri-safe-2-line",
            bg: "bg-[#eee8ff]",
            color: "text-[#7347df]",
        },
        {
            label: "Monthly Growth",
            value: "+12%",
            icon: "ri-bar-chart-grouped-line",
            bg: "bg-[#e5f1ff]",
            color: "text-[#428cf5]",
            raw: true,
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">

            {cards.map((card) => (
                <div
                    key={card.label}
                    className="rounded-xl border border-[#e5eaf0] bg-white p-4 shadow-sm sm:p-5"
                >
                    <div className="flex items-center gap-3">

                        <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${card.bg} ${card.color}`}
                        >
                            <i className={`${card.icon} text-xl`}></i>
                        </div>

                        <span className="text-xs text-[#607697]">
                            {card.label}
                        </span>

                    </div>

                    <h2
                        className={`mt-4 ${
                            !card.raw ? "truncate" : ""
                        } text-xl font-bold text-[#17233c] sm:text-2xl`}
                    >
                        {card.raw
                            ? card.value
                            : formatMoney(card.value)}
                    </h2>
                </div>
            ))}

        </div>
    );
}

export default AnalyticsSummary;