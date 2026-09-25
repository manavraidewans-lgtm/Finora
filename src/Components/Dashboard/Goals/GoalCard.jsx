function GoalCard({
    goal,
    progress,
    status,
    formatMoney,
    showAddMoney,
    setShowAddMoney,
    moneyAmount,
    setMoneyAmount,
    handleAddMoney,
    handleDelete,
}) {
    const statusStyle =
        status === "Completed"
            ? "bg-emerald-50 text-emerald-600"
            : status === "In Progress"
                ? "bg-[#e7f5f1] text-[#138b7d]"
                : "bg-slate-100 text-slate-600";

    return (
        <div className="rounded-xl border border-[#e8edf3] bg-white p-4 transition hover:border-[#dce5ee] hover:shadow-sm sm:p-5">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">


                {/* GOAL INFO */}
                <div className="flex min-w-0 flex-1 gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef5f4] text-[#148c7e]">
                        <i className="ri-flag-2-line text-xl"></i>
                    </div>

                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="truncate text-sm font-semibold text-[#17233c] sm:text-base">
                                {goal.name}
                            </h3>

                            <span
                                className={`rounded-md px-2 py-1 text-[10px] font-medium ${statusStyle}`}
                            >
                                {status}
                            </span>
                        </div>

                        <p className="mt-1 line-clamp-2 text-xs text-[#7183a0]">
                            {goal.description}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                            <span className="font-semibold text-[#17233c]">
                                {formatMoney(goal.saved)}
                            </span>

                            <span className="text-[#91a0b6]">/</span>

                            <span className="text-[#7183a0]">
                                {formatMoney(goal.target)}
                            </span>
                        </div>
                    </div>
                </div>


                {/* PROGRESS */}
                <div className="w-full lg:w-[38%] lg:max-w-75">
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] text-[#7183a0]">
                            Progress
                        </span>

                        <span className="text-xs font-semibold text-[#38557c]">
                            {Math.round(progress)}%
                        </span>
                    </div>

                    <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#edf1f5]">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${
                                status === "Completed"
                                    ? "bg-emerald-500"
                                    : "bg-[#4b9df8]"
                            }`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="mt-2 flex items-center justify-between gap-2">
                        <span className="text-[10px] text-[#7890b0]">
                            <i className="ri-calendar-line mr-1"></i>

                            {goal.targetDate
                                ? new Date(
                                      goal.targetDate
                                  ).toLocaleDateString("en-IN", {
                                      month: "short",
                                      year: "numeric",
                                  })
                                : "No target date"}
                        </span>

                        <button
                            onClick={() => setShowAddMoney(goal.id)}
                            className="text-[10px] font-semibold text-[#148c7e] hover:underline"
                        >
                            Add Money
                        </button>
                    </div>
                </div>


                {/* DELETE */}
                <div className="flex items-center justify-end lg:self-start">
                    <button
                        onClick={() => handleDelete(goal.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-[#7183a0] hover:bg-red-50 hover:text-red-500"
                    >
                        <i className="ri-more-2-fill"></i>
                    </button>
                </div>
            </div>


            {/* ADD MONEY */}
            {showAddMoney === goal.id && (
                <div className="mt-4 flex flex-col gap-2 rounded-xl bg-[#f7f9fc] p-3 sm:flex-row">
                    <input
                        type="number"
                        min="1"
                        value={moneyAmount}
                        onChange={(e) => setMoneyAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="min-w-0 flex-1 rounded-lg border border-[#dce4ed] bg-white px-3 py-2 text-sm outline-none focus:border-[#148c7e]"
                    />

                    <button
                        type="button"
                        onClick={() => handleAddMoney(goal.id)}
                        className="rounded-lg bg-[#148c7e] px-4 py-2 text-xs font-semibold text-white"
                    >
                        Add
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setShowAddMoney(null);
                            setMoneyAmount("");
                        }}
                        className="rounded-lg border border-[#dce4ed] bg-white px-4 py-2 text-xs font-medium text-[#64748b]"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}

export default GoalCard;