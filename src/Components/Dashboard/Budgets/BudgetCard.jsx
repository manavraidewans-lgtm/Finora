function BudgetCard({ budget, spent, formatMoney, handleDelete }) {
    const percentage =
        budget.limit > 0
            ? Math.round((spent / budget.limit) * 100)
            : 0;

    const progress = Math.min(percentage, 100);
    const remaining = Math.max(budget.limit - spent, 0);
    const isOver = spent > budget.limit;

    return (
        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">


            {/* HEADER */}
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold text-[#111827]">
                        {budget.name}
                    </h2>

                    <p className="mt-1 text-sm text-[#8b95a5]">
                        {budget.category}
                    </p>
                </div>

                <button
                    onClick={() => handleDelete(budget.id)}
                    className="shrink-0 text-[#9ca3af] transition hover:text-red-500"
                >
                    <i className="ri-delete-bin-line"></i>
                </button>
            </div>


            {/* AMOUNTS */}
            <div className="mt-6 flex items-end justify-between">
                <div>
                    <p className="text-xs text-[#8b95a5]">Spent</p>

                    <h3 className="mt-1 text-xl font-bold text-[#111827]">
                        {formatMoney(spent)}
                    </h3>
                </div>

                <div className="text-right">
                    <p className="text-xs text-[#8b95a5]">Limit</p>

                    <h3 className="mt-1 text-base font-semibold text-[#667085]">
                        {formatMoney(budget.limit)}
                    </h3>
                </div>
            </div>
            

            {/* PROGRESS */}
            <div className="mt-5">
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#e9eef3]">
                    <div
                        className={`h-full rounded-full transition-all duration-500 ${
                            isOver ? "bg-red-500" : "bg-[#43a7a7]"
                        }`}
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="mt-2 flex items-center justify-between">
                    <span
                        className={`text-xs font-medium ${
                            isOver ? "text-red-500" : "text-[#667085]"
                        }`}
                    >
                        {percentage}% used
                    </span>

                    <span className="text-xs text-[#8b95a5]">
                        {isOver
                            ? `${formatMoney(spent - budget.limit)} over`
                            : `${formatMoney(remaining)} left`}
                    </span>
                </div>
            </div>

        </div>
    );
}

export default BudgetCard;