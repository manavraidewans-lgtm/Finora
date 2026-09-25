function RecurringSummary({
    recurring,
    monthlyAmount,
    thisMonthPaid,
    upcomingPayments,
    formatMoney,
}) {
    const cards = [
        {
            label: "Total Recurring",
            value: recurring.length,
            sub: "active subscriptions",
            icon: "ri-calendar-check-line",
            bg: "bg-[#e1f7ef]",
            color: "text-[#16a67a]",
        },
        {
            label: "Monthly Amount",
            value: formatMoney(monthlyAmount),
            sub: "estimated total",
            icon: "ri-money-rupee-circle-line",
            bg: "bg-[#e5f1ff]",
            color: "text-[#3988f5]",
            truncate: true,
        },
        {
            label: "This Month Paid",
            value: formatMoney(thisMonthPaid),
            sub: "recurring payments",
            icon: "ri-refresh-line",
            bg: "bg-[#eee8ff]",
            color: "text-[#7347df]",
            truncate: true,
        },
        {
            label: "Upcoming",
            value: upcomingPayments.length,
            sub: "upcoming payments",
            icon: "ri-time-line",
            bg: "bg-[#fff0df]",
            color: "text-[#ff9f43]",
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
                        className={`mt-4 text-xl font-bold text-[#17233c] sm:text-2xl ${
                            card.truncate ? "truncate" : ""
                        }`}
                    >
                        {card.value}
                    </h2>

                    <p className="mt-2 text-[10px] text-[#7185a3] sm:text-xs">
                        {card.sub}
                    </p>
                </div>
            ))}

        </div>
    );
}

export default RecurringSummary;