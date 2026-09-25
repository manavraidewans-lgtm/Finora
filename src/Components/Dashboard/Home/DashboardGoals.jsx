import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DashboardGoals() {
    const navigate = useNavigate();

    const [goals, setGoals] = useState(() => {
        const saved = localStorage.getItem("finoraGoals");
        if (!saved) return [];

        try {
            return JSON.parse(saved);
        } catch (error) {
            console.error("Goals loading error:", error);
            return [];
        }
    });


    //  SYNC 
    useEffect(() => {
        const syncGoals = () => {
            const saved = localStorage.getItem("finoraGoals");

            if (!saved) return setGoals([]);

            try {
                setGoals(JSON.parse(saved));
            } catch (error) {
                console.error("Dashboard goals sync error:", error);
            }
        };

        window.addEventListener("goalsUpdated", syncGoals);
        window.addEventListener("storage", syncGoals);

        return () => {
            window.removeEventListener("goalsUpdated", syncGoals);
            window.removeEventListener("storage", syncGoals);
        };
    }, []);



    //  HELPERS 
    const formatMoney = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(Number(amount) || 0);

    const getProgress = (goal) =>
        !goal.target
            ? 0
            : Math.min(
                  (Number(goal.saved || 0) / Number(goal.target)) * 100,
                  100
              );

    return (
        <div className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">


            {/* HEADER */}
            <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                    <h2 className="text-base font-semibold text-[#111827] sm:text-lg">
                        Goals
                    </h2>
                    <p className="mt-1 text-xs text-[#8b95a5] sm:text-sm">
                        Track your financial goals
                    </p>
                </div>

                <button
                    onClick={() => navigate("/dashboard/goals")}
                    className="shrink-0 text-xs font-medium text-[#896b57] hover:text-[#765844] sm:text-sm"
                >
                    View All
                </button>
            </div>


            {/* GOALS */}
            {goals.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3eee9] text-[#896b57]">
                        <i className="ri-flag-line text-xl"></i>
                    </div>

                    <h3 className="mt-3 text-sm font-semibold text-[#111827]">
                        No goals yet
                    </h3>

                    <p className="mt-1 text-xs text-[#8b95a5]">
                        Create a goal to start tracking your progress.
                    </p>

                    <button
                        onClick={() => navigate("/dashboard/goals")}
                        className="mt-4 rounded-lg bg-[#896b57] px-4 py-2 text-xs font-medium text-white hover:bg-[#765844]"
                    >
                        Create Goal
                    </button>
                </div>
            ) : (
                <div className="mt-5 flex flex-1 flex-col gap-5 overflow-y-auto pr-1">
                    {goals.slice(0, 4).map((goal) => {
                        const progress = getProgress(goal);

                        return (
                            <div key={goal.id} className="w-full">

                                {/* GOAL INFO */}
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex min-w-0 items-center gap-2">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f3eee9] text-[#896b57]">
                                            <i className="ri-flag-line text-sm"></i>
                                        </div>

                                        <span className="min-w-0 truncate text-sm font-medium text-[#4b4d4d]">
                                            {goal.name}
                                        </span>
                                    </div>

                                    <span className="shrink-0 text-xs font-semibold text-[#896b57]">
                                        {Math.round(progress)}%
                                    </span>
                                </div>



                                {/* PROGRESS */}
                                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#eee9e4]">
                                    <div
                                        className="h-full rounded-full bg-[#896b57] transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>



                                {/* AMOUNT */}
                                <div className="mt-1 flex justify-between text-[11px] text-[#8b95a5]">
                                    <span>{formatMoney(goal.saved)}</span>
                                    <span>{formatMoney(goal.target)}</span>
                                </div>

                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default DashboardGoals;