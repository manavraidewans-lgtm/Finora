function GoalSummary({
    totalGoals,
    totalSaved,
    totalTarget,
    completedGoals,
    inProgressGoals,
    overallProgress,
    formatMoney,
}) {
    const cards = [
        {
            label: "Total Goals",
            icon: "ri-target-line",
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500",
            value: totalGoals,
            sub: `${completedGoals} completed, ${inProgressGoals} in progress`,
        },
        {
            label: "Total Saved",
            icon: "ri-wallet-3-line",
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500",
            value: formatMoney(totalSaved),
            sub: `of ${formatMoney(totalTarget)}`,
            truncate: true,
        },
        {
            label: "Overall Progress",
            icon: "ri-bar-chart-grouped-line",
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600",
            value: `${Math.round(overallProgress)}%`,
            sub: "across all goals",
        },
        {
            label: "Est. Completion",
            icon: "ri-calendar-check-line",
            iconBg: "bg-pink-50",
            iconColor: "text-pink-500",
            value: `${completedGoals} goals`,
            sub: "completed so far",
        },
    ];

    return (
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {cards.map((card) => (
                <div
                    key={card.label}
                    className="rounded-xl border border-[#e5ebf2] bg-white p-4 shadow-sm sm:p-5"
                >
                    <div className="flex items-center gap-3">
                        <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${card.iconBg} ${card.iconColor}`}
                        >
                            <i className={`${card.icon} text-xl`}></i>
                        </div>

                        <span className="text-xs text-[#647aa0] sm:text-sm">
                            {card.label}
                        </span>
                    </div>

                    <h2
                        className={`mt-4 text-xl font-bold text-[#17233c] sm:text-2xl ${
                            card.truncate ? "truncate" : ""
                        }`}
                    >
                        {card.value}
                    </h2>

                    <p className="mt-1 text-[10px] text-[#6d83a7] sm:text-xs">
                        {card.sub}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default GoalSummary;