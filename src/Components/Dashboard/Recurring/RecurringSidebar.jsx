function RecurringSidebar({
    upcomingPayments,
    formatMoney,
    formatDate,
    getIcon,
    getIconStyle,
}) {
    return (
        <aside className="min-w-0">

            <div className="rounded-xl border border-[#e5eaf0] bg-white p-4 shadow-sm sm:p-5">

                <h2 className="text-base font-bold text-[#17233c]">
                    Upcoming Payments
                </h2>

                <div className="mt-4 divide-y divide-[#edf1f5]">

                    {upcomingPayments.length === 0 ? (
                        <p className="py-8 text-center text-xs text-[#7185a3]">
                            No upcoming payments.
                        </p>
                    ) : (
                        upcomingPayments.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-3 py-3"
                            >

                                <div
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getIconStyle(item.category)}`}
                                >
                                    <i
                                        className={`${getIcon(item.category)} text-lg`}
                                    ></i>
                                </div>

                                <div className="min-w-0 flex-1">

                                    <p className="truncate text-xs font-medium text-[#243b5c]">
                                        {item.name}
                                    </p>

                                    <p className="mt-1 text-[10px] text-[#7185a3]">
                                        {formatDate(item.nextPayment)}
                                    </p>

                                </div>

                                <p className="shrink-0 text-xs font-semibold text-[#243b5c]">
                                    {formatMoney(item.amount)}
                                </p>

                            </div>
                        ))
                    )}

                </div>

            </div>

        </aside>
    );
}

export default RecurringSidebar;