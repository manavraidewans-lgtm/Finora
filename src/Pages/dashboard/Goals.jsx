import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../Components/Dashboard/Navbar";
import GoalSummary from "../../Components/Dashboard/Goals/GoalSummary";
import GoalCard from "../../Components/Dashboard/Goals/GoalCard";
import GoalSidebar from "../../Components/Dashboard/Goals/GoalSidebar";
import GoalForm from "../../Components/Dashboard/Goals/GoalForm";

function Goals() {
    const navigate = useNavigate();

    
    // GOALS
    const [goals, setGoals] = useState(() => {
        const savedGoals = localStorage.getItem("finoraGoals");

        if (!savedGoals) return [];

        try {
            return JSON.parse(savedGoals);
        } catch (error) {
            console.error("Goals loading error:", error);
            return [];
        }
    });

    
    // UI STATES
    const [filter, setFilter] = useState("All");
    const [showForm, setShowForm] = useState(false);
    const [showAddMoney, setShowAddMoney] = useState(null);
    const [moneyAmount, setMoneyAmount] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        target: "",
        saved: "",
        targetDate: "",
    });

    

    // SAVE GOALS
    const saveGoals = (updatedGoals) => {
        setGoals(updatedGoals);
        localStorage.setItem("finoraGoals", JSON.stringify(updatedGoals));
        window.dispatchEvent(new Event("goalsUpdated"));
    };

    

    // SYNC
    useEffect(() => {
        const syncGoals = () => {
            const savedGoals = localStorage.getItem("finoraGoals");

            if (!savedGoals) {
                setGoals([]);
                return;
            }

            try {
                setGoals(JSON.parse(savedGoals));
            } catch (error) {
                console.error("Goal sync error:", error);
            }
        };

        window.addEventListener("goalsUpdated", syncGoals);
        window.addEventListener("storage", syncGoals);

        return () => {
            window.removeEventListener("goalsUpdated", syncGoals);
            window.removeEventListener("storage", syncGoals);
        };
    }, []);

    

    // HELPERS
    const formatMoney = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(Number(amount) || 0);

    const getProgress = (goal) => {
        const target = Number(goal.target) || 0;
        const saved = Number(goal.saved) || 0;

        return target ? Math.min((saved / target) * 100, 100) : 0;
    };

    const getStatus = (goal) => {
        const progress = getProgress(goal);

        if (progress >= 100) return "Completed";
        if (progress > 0) return "In Progress";
        return "Not Started";
    };


    
    // FILTER
    const filteredGoals = useMemo(
        () =>
            filter === "All"
                ? goals
                : goals.filter((goal) => getStatus(goal) === filter),
        [goals, filter]
    );

    

    // SUMMARY
    const totalGoals = goals.length;

    const totalSaved = goals.reduce(
        (total, goal) => total + Number(goal.saved || 0),
        0
    );

    const totalTarget = goals.reduce(
        (total, goal) => total + Number(goal.target || 0),
        0
    );

    const completedGoals = goals.filter(
        (goal) => getStatus(goal) === "Completed"
    ).length;

    const inProgressGoals = goals.filter(
        (goal) => getStatus(goal) === "In Progress"
    ).length;

    const overallProgress =
        totalTarget > 0
            ? Math.min((totalSaved / totalTarget) * 100, 100)
            : 0;

    


    // CREATE GOAL
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.target) return;

        const target = Number(formData.target);
        const saved = Math.min(Number(formData.saved) || 0, target);

        const newGoal = {
            id: Date.now(),
            name: formData.name.trim(),
            description:
                formData.description.trim() ||
                "Keep working towards your financial goal.",
            target,
            saved,
            targetDate: formData.targetDate,
        };

        saveGoals([...goals, newGoal]);

        setFormData({
            name: "",
            description: "",
            target: "",
            saved: "",
            targetDate: "",
        });

        setShowForm(false);
    };


    
    // DELETE GOAL
    const handleDelete = (id) => {
        saveGoals(goals.filter((goal) => goal.id !== id));
    };


    
    // ADD MONEY
    const handleAddMoney = (goalId) => {
        const amount = Number(moneyAmount);

        if (!amount || amount <= 0) return;

        const updatedGoals = goals.map((goal) => {
            if (goal.id !== goalId) return goal;

            const currentSaved = Number(goal.saved) || 0;
            const target = Number(goal.target) || 0;

            return {
                ...goal,
                saved: Math.min(currentSaved + amount, target),
            };
        });

        saveGoals(updatedGoals);
        setMoneyAmount("");
        setShowAddMoney(null);
    };

    

    // QUICK ACTIONS
    const quickActions = [
        {
            title: "Add Transaction",
            icon: "ri-add-circle-line",
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
            path: "/dashboard/transactions",
        },
        {
            title: "Set Budget",
            icon: "ri-focus-3-line",
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600",
            path: "/dashboard/budgets",
        },
        {
            title: "Add Goal",
            icon: "ri-flag-line",
            iconBg: "bg-orange-50",
            iconColor: "text-orange-500",
            action: () => setShowForm(true),
        },
        {
            title: "View Reports",
            icon: "ri-file-chart-line",
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500",
            path: "/dashboard/reports",
        },
    ];

    return (
        <div className="min-h-screen bg-[#f7f9fc]">

            {/* NAVBAR */}
            <Navbar />

            {/* MAIN */}
            <div className="lg:ml-64">
                <main className="w-full px-3 py-4 sm:px-5 sm:py-5 lg:px-7 lg:py-6">

                    {/* HEADER */}
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eef2ff] text-[#31558f] sm:h-14 sm:w-14">
                                <i className="ri-focus-3-line text-2xl sm:text-3xl"></i>
                            </div>

                            <div className="min-w-0">
                                <h1 className="text-xl font-bold tracking-tight text-[#17233c] sm:text-2xl lg:text-3xl">
                                    Financial Goals
                                </h1>

                                <p className="mt-1 text-xs text-[#647aa0] sm:text-sm">
                                    Set your goals, stay consistent, and build the future you want.
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowForm(true)}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#138b7d] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#10786d] sm:w-fit"
                        >
                            <i className="ri-add-line text-lg"></i>
                            Create New Goal
                        </button>
                    </div>

                    {/* SUMMARY */}
                    <GoalSummary
                        totalGoals={totalGoals}
                        totalSaved={totalSaved}
                        totalTarget={totalTarget}
                        completedGoals={completedGoals}
                        inProgressGoals={inProgressGoals}
                        overallProgress={overallProgress}
                        formatMoney={formatMoney}
                    />

                    {/* MAIN CONTENT */}
                    <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">

                        {/* MY GOALS */}
                        <div className="min-w-0 rounded-xl border border-[#e5ebf2] bg-white shadow-sm">

                            {/* HEADER */}
                            <div className="flex flex-col gap-4 border-b border-[#edf1f5] p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">

                                <div>
                                    <h2 className="text-lg font-bold text-[#17233c]">
                                        My Goals
                                    </h2>

                                    <p className="mt-1 text-xs text-[#6d83a7] sm:text-sm">
                                        Track your progress and stay motivated.
                                    </p>
                                </div>

                                {/* FILTER */}
                                <div className="flex w-full overflow-hidden rounded-full bg-[#f1f5f9] p-1 sm:w-fit">
                                    {["All", "In Progress", "Completed"].map((item) => (
                                        <button
                                            key={item}
                                            onClick={() => setFilter(item)}
                                            className={`flex-1 rounded-full px-3 py-2 text-[11px] font-medium transition sm:flex-none sm:px-4 sm:text-xs ${
                                                filter === item
                                                    ? "bg-[#148c7e] text-white shadow-sm"
                                                    : "text-[#647aa0] hover:text-[#17233c]"
                                            }`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* GOAL LIST */}
                            <div className="flex flex-col gap-3 p-3 sm:p-4">
                                {filteredGoals.length === 0 ? (
                                    <div className="flex min-h-75 flex-col items-center justify-center px-5 text-center">

                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#eef5f4] text-[#148c7e]">
                                            <i className="ri-flag-line text-2xl"></i>
                                        </div>

                                        <h3 className="mt-4 text-base font-semibold text-[#17233c]">
                                            No goals yet
                                        </h3>

                                        <p className="mt-1 max-w-sm text-xs text-[#7183a0]">
                                            Create your first financial goal and start building towards it.
                                        </p>

                                        <button
                                            onClick={() => setShowForm(true)}
                                            className="mt-4 rounded-lg bg-[#148c7e] px-4 py-2 text-xs font-semibold text-white"
                                        >
                                            Create Goal
                                        </button>
                                    </div>
                                ) : (
                                    filteredGoals.map((goal) => (
                                        <GoalCard
                                            key={goal.id}
                                            goal={goal}
                                            progress={getProgress(goal)}
                                            status={getStatus(goal)}
                                            formatMoney={formatMoney}
                                            showAddMoney={showAddMoney}
                                            setShowAddMoney={setShowAddMoney}
                                            moneyAmount={moneyAmount}
                                            setMoneyAmount={setMoneyAmount}
                                            handleAddMoney={handleAddMoney}
                                            handleDelete={handleDelete}
                                        />
                                    ))
                                )}
                            </div>
                        </div>

                        {/* RIGHT SIDEBAR */}
                        <GoalSidebar
                            quickActions={quickActions}
                            navigate={navigate}
                            setShowForm={setShowForm}
                            overallProgress={overallProgress}
                        />
                    </div>
                </main>
            </div>

            {/* CREATE GOAL MODAL */}
            <GoalForm
                showForm={showForm}
                setShowForm={setShowForm}
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

export default Goals;