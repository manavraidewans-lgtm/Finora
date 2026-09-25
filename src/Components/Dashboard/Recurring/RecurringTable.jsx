function RecurringTable({
    recurring,
    formatMoney,
    formatDate,
    getIcon,
    getIconStyle,
    toggleStatus,
    handleDelete,
}) {
    const columns = [
        "Name",
        "Category",
        "Amount",
        "Frequency",
        "Next Payment",
        "Status",
        "Actions",
    ];

    const statusClass = (status) =>
        status === "Active"
            ? "bg-[#e2f7ef] text-[#15966d]"
            : "bg-[#edf1f5] text-[#607697]";

    const emptyMessage = (
        <div className="px-4 py-12 text-center text-sm text-[#7185a3]">
            No recurring transactions yet.
        </div>
    );

    return (
        <div className="overflow-hidden rounded-xl border border-[#e5eaf0] bg-white shadow-sm">

            {/* HEADER */}
            <div className="p-4 sm:p-5">

                <h2 className="text-base font-bold text-[#17233c] sm:text-lg">
                    All Recurring Transactions
                </h2>

                <div className="mt-4 flex gap-2 overflow-x-auto">

                    {["All", "Income", "Expenses"].map((filter, index) => (
                        <button
                            key={filter}
                            className={`shrink-0 rounded-full px-4 py-2 text-xs ${
                                index === 0
                                    ? "bg-[#123d4a] font-medium text-white"
                                    : "bg-[#f3f6f9] text-[#607697]"
                            }`}
                        >
                            {filter}
                        </button>
                    ))}

                </div>

            </div>


            {/* DESKTOP TABLE */}
            <div className="hidden overflow-x-auto lg:block">

                <table className="w-full min-w-212.5 border-collapse">

                    <thead>
                        <tr className="border-y border-[#edf1f5] text-left">

                            {columns.map((column) => (
                                <th
                                    key={column}
                                    className="px-5 py-3 text-[11px] font-medium text-[#7185a3]"
                                >
                                    {column}
                                </th>
                            ))}

                        </tr>
                    </thead>

                    <tbody>

                        {recurring.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="px-5 py-12 text-center text-sm text-[#7185a3]"
                                >
                                    No recurring transactions yet.
                                </td>
                            </tr>
                        ) : (
                            recurring.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b border-[#f0f2f5] last:border-0"
                                >

                                    {/* NAME */}
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">

                                            <div
                                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${getIconStyle(item.category)}`}
                                            >
                                                <i
                                                    className={`${getIcon(item.category)} text-lg`}
                                                ></i>
                                            </div>

                                            <div>
                                                <p className="text-xs font-medium text-[#243b5c]">
                                                    {item.name}
                                                </p>

                                                <p className="mt-0.5 text-[10px] text-[#7185a3]">
                                                    {item.type === "income"
                                                        ? "Income"
                                                        : "Expense"}
                                                </p>
                                            </div>

                                        </div>
                                    </td>


                                    {/* CATEGORY */}
                                    <td className="px-5 py-4">
                                        <span className="rounded-full bg-[#f1edff] px-2.5 py-1 text-[10px] text-[#7347df]">
                                            {item.category}
                                        </span>
                                    </td>


                                    {/* AMOUNT */}
                                    <td className="px-5 py-4 text-xs font-semibold text-[#243b5c]">
                                        {formatMoney(item.amount)}
                                    </td>


                                    {/* FREQUENCY */}
                                    <td className="px-5 py-4 text-xs text-[#607697]">
                                        {item.frequency}
                                    </td>


                                    {/* NEXT PAYMENT */}
                                    <td className="px-5 py-4 text-xs text-[#607697]">
                                        {formatDate(item.nextPayment)}
                                    </td>


                                    {/* STATUS */}
                                    <td className="px-5 py-4">
                                        <button
                                            onClick={() => toggleStatus(item.id)}
                                            className={`rounded-full px-3 py-1 text-[10px] font-medium ${statusClass(item.status)}`}
                                        >
                                            {item.status}
                                        </button>
                                    </td>


                                    {/* ACTION */}
                                    <td className="px-5 py-4">
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-[#7185a3] transition hover:text-red-500"
                                        >
                                            <i className="ri-more-2-fill text-lg"></i>
                                        </button>
                                    </td>

                                </tr>
                            ))
                        )}

                    </tbody>

                </table>

            </div>


            {/* MOBILE */}
            <div className="divide-y divide-[#f0f2f5] lg:hidden">

                {recurring.length === 0
                    ? emptyMessage
                    : recurring.map((item) => (
                        <div key={item.id} className="p-4">

                            <div className="flex items-start justify-between gap-3">

                                <div className="flex min-w-0 items-center gap-3">

                                    <div
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getIconStyle(item.category)}`}
                                    >
                                        <i
                                            className={`${getIcon(item.category)} text-lg`}
                                        ></i>
                                    </div>

                                    <div className="min-w-0">

                                        <p className="truncate text-sm font-medium text-[#243b5c]">
                                            {item.name}
                                        </p>

                                        <p className="mt-1 truncate text-[10px] text-[#7185a3]">
                                            {item.category}
                                        </p>

                                    </div>

                                </div>


                                <div className="shrink-0 text-right">

                                    <p className="text-sm font-semibold text-[#243b5c]">
                                        {formatMoney(item.amount)}
                                    </p>

                                    <p className="mt-1 text-[10px] text-[#7185a3]">
                                        {item.frequency}
                                    </p>

                                </div>

                            </div>


                            <div className="mt-4 flex items-center justify-between gap-3">

                                <div>

                                    <p className="text-[10px] text-[#7185a3]">
                                        Next Payment
                                    </p>

                                    <p className="mt-1 text-xs font-medium text-[#405578]">
                                        {formatDate(item.nextPayment)}
                                    </p>

                                </div>


                                <div className="flex items-center gap-2">

                                    <button
                                        onClick={() => toggleStatus(item.id)}
                                        className={`rounded-full px-3 py-1 text-[10px] font-medium ${statusClass(item.status)}`}
                                    >
                                        {item.status}
                                    </button>

                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500"
                                    >
                                        <i className="ri-delete-bin-line"></i>
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))}

            </div>

        </div>
    );
}

export default RecurringTable;