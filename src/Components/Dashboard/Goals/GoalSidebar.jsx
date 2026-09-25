function GoalSidebar({
    quickActions,
    navigate,
    setShowForm,
    overallProgress,
}) {
    return (
        <div className="flex flex-col gap-5">


            {/* MOTIVATION */}
            <div className="overflow-hidden rounded-xl border border-[#e5ebf2] bg-white p-4 shadow-sm sm:p-5">
                <div className="rounded-lg bg-[#f1faf9] p-5">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#e0f4ef] text-[#15977e]">
                            <i className="ri-plant-line text-4xl"></i>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold leading-5 text-[#17233c]">
                                Big goals require
                                <br />
                                small steps.
                            </h3>

                            <p className="mt-2 text-[11px] leading-5 text-[#647aa0]">
                                Keep going, you're doing great!
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            {/* QUICK ACTIONS */}
            <div className="rounded-xl border border-[#e5ebf2] bg-white p-4 shadow-sm sm:p-5">
                <h2 className="flex items-center gap-2 text-base font-bold text-[#17233c]">
                    <span>⚡</span>
                    Quick Actions
                </h2>

                <div className="mt-4 flex flex-col gap-2">
                    {quickActions.map((action) => (
                        <button
                            key={action.title}
                            type="button"
                            onClick={() =>
                                action.action
                                    ? action.action()
                                    : navigate(action.path)
                            }
                            className="flex w-full items-center justify-between rounded-lg border border-[#edf1f5] bg-white p-2.5 text-left transition hover:bg-[#f8fafc]"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${action.iconBg} ${action.iconColor}`}
                                >
                                    <i className={`${action.icon} text-lg`}></i>
                                </div>

                                <span className="text-xs font-medium text-[#34445c]">
                                    {action.title}
                                </span>
                            </div>

                            <i className="ri-arrow-right-s-line text-[#91a0b6]"></i>
                        </button>
                    ))}
                </div>
            </div>


            {/* GOAL INSIGHTS */}
            <div className="rounded-xl border border-[#e5ebf2] bg-white p-4 shadow-sm sm:p-5">
                <h2 className="flex items-center gap-2 text-base font-bold text-[#17233c]">
                    <span>💡</span>
                    Goal Insights
                </h2>

                <div className="mt-5 flex flex-col items-center gap-5 sm:flex-row">

                    {/* DONUT */}
                    <div className="relative h-28 w-28 shrink-0">
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: `conic-gradient(
                                    #1b9b57 ${overallProgress}%,
                                    #e9eef4 ${overallProgress}% 100%
                                )`,
                            }}
                        />

                        <div className="absolute inset-2 flex flex-col items-center justify-center rounded-full bg-white">
                            <span className="text-lg font-bold text-[#17233c]">
                                {Math.round(overallProgress)}%
                            </span>

                            <span className="text-[8px] text-[#9aa8ba]">
                                overall
                            </span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-[#17233c]">
                            You're on track!
                        </h3>

                        <p className="mt-1 text-[11px] leading-5 text-[#7183a0]">
                            Keep saving, you're getting closer to your goals.
                        </p>
                    </div>
                </div>
            </div>
            

            {/* QUOTE */}
            <div className="overflow-hidden rounded-xl border border-[#e5ebf2] bg-white p-4 shadow-sm sm:p-5">
                <div className="rounded-lg bg-[#eef9f8] p-5">
                    <div className="text-2xl font-bold text-[#54b9ae]">
                        “
                    </div>

                    <p className="text-sm leading-6 text-[#36566b]">
                        A goal without a plan is just a wish.
                    </p>

                    <p className="mt-3 text-[10px] font-medium text-[#7191a2]">
                        — Antoine de Saint-Exupéry
                    </p>
                </div>
            </div>

        </div>
    );
}

export default GoalSidebar;