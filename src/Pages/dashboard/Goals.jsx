import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../Components/Dashboard/Navbar";
import Top from "../../Components/Dashboard/Top";

function Goals() {

    const navigate = useNavigate();

    // =====================================================
    // GOALS
    // =====================================================

    const [goals, setGoals] = useState(() => {

        const savedGoals =
            localStorage.getItem("finoraGoals");

        if (!savedGoals) {
            return [];
        }

        try {
            return JSON.parse(savedGoals);
        } catch (error) {
            console.error("Goals loading error:", error);
            return [];
        }

    });


    // =====================================================
    // UI STATES
    // =====================================================

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


    // =====================================================
    // SAVE GOALS
    // =====================================================

    const saveGoals = (updatedGoals) => {

        setGoals(updatedGoals);

        localStorage.setItem(
            "finoraGoals",
            JSON.stringify(updatedGoals)
        );

        window.dispatchEvent(
            new Event("goalsUpdated")
        );

    };


    // =====================================================
    // SYNC WITH DASHBOARD
    // =====================================================

    useEffect(() => {

        const syncGoals = () => {

            const savedGoals =
                localStorage.getItem("finoraGoals");

            if (!savedGoals) {

                setGoals([]);

                return;

            }

            try {

                setGoals(
                    JSON.parse(savedGoals)
                );

            } catch (error) {

                console.error(
                    "Goal sync error:",
                    error
                );

            }

        };


        window.addEventListener(
            "goalsUpdated",
            syncGoals
        );

        window.addEventListener(
            "storage",
            syncGoals
        );


        return () => {

            window.removeEventListener(
                "goalsUpdated",
                syncGoals
            );

            window.removeEventListener(
                "storage",
                syncGoals
            );

        };

    }, []);


    // =====================================================
    // FORMAT MONEY
    // =====================================================

    const formatMoney = (amount) => {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
            }
        ).format(
            Number(amount) || 0
        );

    };


    // =====================================================
    // PROGRESS
    // =====================================================

    const getProgress = (goal) => {

        const target =
            Number(goal.target) || 0;

        const saved =
            Number(goal.saved) || 0;

        if (!target) {
            return 0;
        }

        return Math.min(
            (saved / target) * 100,
            100
        );

    };


    // =====================================================
    // STATUS
    // =====================================================

    const getStatus = (goal) => {

        const progress =
            getProgress(goal);

        if (progress >= 100) {
            return "Completed";
        }

        if (progress > 0) {
            return "In Progress";
        }

        return "Not Started";

    };


    // =====================================================
    // FILTER
    // =====================================================

    const filteredGoals = useMemo(() => {

        if (filter === "All") {
            return goals;
        }

        return goals.filter(
            (goal) =>
                getStatus(goal) === filter
        );

    }, [goals, filter]);


    // =====================================================
    // SUMMARY
    // =====================================================

    const totalGoals =
        goals.length;


    const totalSaved =
        goals.reduce(
            (total, goal) =>
                total + Number(goal.saved || 0),
            0
        );


    const totalTarget =
        goals.reduce(
            (total, goal) =>
                total + Number(goal.target || 0),
            0
        );


    const completedGoals =
        goals.filter(
            (goal) =>
                getStatus(goal) === "Completed"
        ).length;


    const inProgressGoals =
        goals.filter(
            (goal) =>
                getStatus(goal) === "In Progress"
        ).length;


    const overallProgress =
        totalTarget > 0
            ? Math.min(
                (totalSaved / totalTarget) * 100,
                100
            )
            : 0;


    // =====================================================
    // CREATE GOAL
    // =====================================================

    const handleSubmit = (e) => {

        e.preventDefault();


        if (
            !formData.name.trim() ||
            !formData.target
        ) {
            return;
        }


        const target =
            Number(formData.target);


        const saved =
            Math.min(
                Number(formData.saved) || 0,
                target
            );


        const newGoal = {

            id: Date.now(),

            name:
                formData.name.trim(),

            description:
                formData.description.trim() ||
                "Keep working towards your financial goal.",

            target,

            saved,

            targetDate:
                formData.targetDate,

        };


        saveGoals([
            ...goals,
            newGoal
        ]);


        setFormData({
            name: "",
            description: "",
            target: "",
            saved: "",
            targetDate: "",
        });


        setShowForm(false);

    };


    // =====================================================
    // DELETE GOAL
    // =====================================================

    const handleDelete = (id) => {

        const updatedGoals =
            goals.filter(
                (goal) =>
                    goal.id !== id
            );

        saveGoals(updatedGoals);

    };


    // =====================================================
    // ADD MONEY
    // =====================================================

    const handleAddMoney = (goalId) => {

        const amount =
            Number(moneyAmount);


        if (!amount || amount <= 0) {
            return;
        }


        const updatedGoals =
            goals.map((goal) => {

                if (goal.id !== goalId) {
                    return goal;
                }


                const currentSaved =
                    Number(goal.saved) || 0;


                const target =
                    Number(goal.target) || 0;


                return {

                    ...goal,

                    saved:
                        Math.min(
                            currentSaved + amount,
                            target
                        ),

                };

            });


        saveGoals(updatedGoals);


        setMoneyAmount("");

        setShowAddMoney(null);

    };


    // =====================================================
    // QUICK ACTIONS
    // =====================================================

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

        <div className="
            min-h-screen
            bg-[#f7f9fc]
        ">


            {/* =====================================================
                NAVBAR
            ===================================================== */}

            <Navbar />


            {/* =====================================================
                MAIN
            ===================================================== */}

            <div className="lg:ml-64">

                


                <main className="
                    w-full
                    px-3
                    py-4
                    sm:px-5
                    sm:py-5
                    lg:px-7
                    lg:py-6
                ">


                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div className="
                        flex
                        flex-col
                        gap-4
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                    ">


                        <div className="
                            flex
                            min-w-0
                            items-center
                            gap-3
                        ">

                            <div className="
                                flex
                                h-12
                                w-12
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-[#eef2ff]
                                text-[#31558f]
                                sm:h-14
                                sm:w-14
                            ">

                                <i className="
                                    ri-focus-3-line
                                    text-2xl
                                    sm:text-3xl
                                "></i>

                            </div>


                            <div className="min-w-0">

                                <h1 className="
                                    text-xl
                                    font-bold
                                    tracking-tight
                                    text-[#17233c]
                                    sm:text-2xl
                                    lg:text-3xl
                                ">
                                    Financial Goals
                                </h1>


                                <p className="
                                    mt-1
                                    text-xs
                                    text-[#647aa0]
                                    sm:text-sm
                                ">
                                    Set your goals, stay consistent,
                                    and build the future you want.
                                </p>

                            </div>

                        </div>


                        <button
                            onClick={() =>
                                setShowForm(true)
                            }
                            className="
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-[#138b7d]
                                px-5
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                shadow-sm
                                transition
                                hover:bg-[#10786d]
                                sm:w-fit
                            "
                        >

                            <i className="
                                ri-add-line
                                text-lg
                            "></i>

                            Create New Goal

                        </button>

                    </div>


                    {/* =================================================
                        SUMMARY CARDS
                    ================================================= */}

                    <div className="
                        mt-5
                        grid
                        grid-cols-2
                        gap-3
                        lg:grid-cols-4
                    ">


                        {/* TOTAL GOALS */}

                        <div className="
                            rounded-xl
                            border
                            border-[#e5ebf2]
                            bg-white
                            p-4
                            shadow-sm
                            sm:p-5
                        ">

                            <div className="
                                flex
                                items-center
                                gap-3
                            ">

                                <div className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-emerald-50
                                    text-emerald-500
                                ">

                                    <i className="
                                        ri-target-line
                                        text-xl
                                    "></i>

                                </div>


                                <span className="
                                    text-xs
                                    text-[#647aa0]
                                    sm:text-sm
                                ">
                                    Total Goals
                                </span>

                            </div>


                            <h2 className="
                                mt-4
                                text-xl
                                font-bold
                                text-[#17233c]
                                sm:text-2xl
                            ">
                                {totalGoals}
                            </h2>


                            <p className="
                                mt-1
                                text-[10px]
                                text-[#6d83a7]
                                sm:text-xs
                            ">
                                {completedGoals} completed,{" "}
                                {inProgressGoals} in progress
                            </p>

                        </div>


                        {/* TOTAL SAVED */}

                        <div className="
                            rounded-xl
                            border
                            border-[#e5ebf2]
                            bg-white
                            p-4
                            shadow-sm
                            sm:p-5
                        ">

                            <div className="
                                flex
                                items-center
                                gap-3
                            ">

                                <div className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-blue-50
                                    text-blue-500
                                ">

                                    <i className="
                                        ri-wallet-3-line
                                        text-xl
                                    "></i>

                                </div>


                                <span className="
                                    text-xs
                                    text-[#647aa0]
                                    sm:text-sm
                                ">
                                    Total Saved
                                </span>

                            </div>


                            <h2 className="
                                mt-4
                                truncate
                                text-xl
                                font-bold
                                text-[#17233c]
                                sm:text-2xl
                            ">
                                {formatMoney(totalSaved)}
                            </h2>


                            <p className="
                                mt-1
                                text-[10px]
                                text-[#6d83a7]
                                sm:text-xs
                            ">
                                of {formatMoney(totalTarget)}
                            </p>

                        </div>


                        {/* OVERALL PROGRESS */}

                        <div className="
                            rounded-xl
                            border
                            border-[#e5ebf2]
                            bg-white
                            p-4
                            shadow-sm
                            sm:p-5
                        ">

                            <div className="
                                flex
                                items-center
                                gap-3
                            ">

                                <div className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-purple-50
                                    text-purple-600
                                ">

                                    <i className="
                                        ri-bar-chart-grouped-line
                                        text-xl
                                    "></i>

                                </div>


                                <span className="
                                    text-xs
                                    text-[#647aa0]
                                    sm:text-sm
                                ">
                                    Overall Progress
                                </span>

                            </div>


                            <h2 className="
                                mt-4
                                text-xl
                                font-bold
                                text-[#17233c]
                                sm:text-2xl
                            ">
                                {Math.round(overallProgress)}%
                            </h2>


                            <p className="
                                mt-1
                                text-[10px]
                                text-[#6d83a7]
                                sm:text-xs
                            ">
                                across all goals
                            </p>

                        </div>


                        {/* EST COMPLETION */}

                        <div className="
                            rounded-xl
                            border
                            border-[#e5ebf2]
                            bg-white
                            p-4
                            shadow-sm
                            sm:p-5
                        ">

                            <div className="
                                flex
                                items-center
                                gap-3
                            ">

                                <div className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-pink-50
                                    text-pink-500
                                ">

                                    <i className="
                                        ri-calendar-check-line
                                        text-xl
                                    "></i>

                                </div>


                                <span className="
                                    text-xs
                                    text-[#647aa0]
                                    sm:text-sm
                                ">
                                    Est. Completion
                                </span>

                            </div>


                            <h2 className="
                                mt-4
                                text-xl
                                font-bold
                                text-[#17233c]
                                sm:text-2xl
                            ">
                                {completedGoals} goals
                            </h2>


                            <p className="
                                mt-1
                                text-[10px]
                                text-[#6d83a7]
                                sm:text-xs
                            ">
                                completed so far
                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        MAIN CONTENT
                    ================================================= */}

                    <div className="
                        mt-5
                        grid
                        grid-cols-1
                        gap-5
                        xl:grid-cols-[minmax(0,1fr)_320px]
                    ">


                        {/* =================================================
                            MY GOALS
                        ================================================= */}

                        <div className="
                            min-w-0
                            rounded-xl
                            border
                            border-[#e5ebf2]
                            bg-white
                            shadow-sm
                        ">


                            {/* HEADER */}

                            <div className="
                                flex
                                flex-col
                                gap-4
                                border-b
                                border-[#edf1f5]
                                p-4
                                sm:p-5
                                lg:flex-row
                                lg:items-center
                                lg:justify-between
                            ">

                                <div>

                                    <h2 className="
                                        text-lg
                                        font-bold
                                        text-[#17233c]
                                    ">
                                        My Goals
                                    </h2>


                                    <p className="
                                        mt-1
                                        text-xs
                                        text-[#6d83a7]
                                        sm:text-sm
                                    ">
                                        Track your progress and stay motivated.
                                    </p>

                                </div>


                                {/* FILTER */}

                                <div className="
                                    flex
                                    w-full
                                    overflow-hidden
                                    rounded-full
                                    bg-[#f1f5f9]
                                    p-1
                                    sm:w-fit
                                ">

                                    {[
                                        "All",
                                        "In Progress",
                                        "Completed",
                                    ].map((item) => (

                                        <button
                                            key={item}
                                            onClick={() =>
                                                setFilter(item)
                                            }
                                            className={`
                                                flex-1
                                                rounded-full
                                                px-3
                                                py-2
                                                text-[11px]
                                                font-medium
                                                transition
                                                sm:flex-none
                                                sm:px-4
                                                sm:text-xs
                                                ${
                                                    filter === item
                                                        ? "bg-[#148c7e] text-white shadow-sm"
                                                        : "text-[#647aa0] hover:text-[#17233c]"
                                                }
                                            `}
                                        >
                                            {item}
                                        </button>

                                    ))}

                                </div>

                            </div>


                            {/* GOAL LIST */}

                            <div className="
                                flex
                                flex-col
                                gap-3
                                p-3
                                sm:p-4
                            ">

                                {filteredGoals.length === 0 ? (

                                    <div className="
                                        flex
                                        min-h-[300px]
                                        flex-col
                                        items-center
                                        justify-center
                                        px-5
                                        text-center
                                    ">

                                        <div className="
                                            flex
                                            h-14
                                            w-14
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-[#eef5f4]
                                            text-[#148c7e]
                                        ">

                                            <i className="
                                                ri-flag-line
                                                text-2xl
                                            "></i>

                                        </div>


                                        <h3 className="
                                            mt-4
                                            text-base
                                            font-semibold
                                            text-[#17233c]
                                        ">
                                            No goals yet
                                        </h3>


                                        <p className="
                                            mt-1
                                            max-w-sm
                                            text-xs
                                            text-[#7183a0]
                                        ">
                                            Create your first financial
                                            goal and start building
                                            towards it.
                                        </p>


                                        <button
                                            onClick={() =>
                                                setShowForm(true)
                                            }
                                            className="
                                                mt-4
                                                rounded-lg
                                                bg-[#148c7e]
                                                px-4
                                                py-2
                                                text-xs
                                                font-semibold
                                                text-white
                                            "
                                        >
                                            Create Goal
                                        </button>

                                    </div>

                                ) : (

                                    filteredGoals.map((goal) => {

                                        const progress =
                                            getProgress(goal);

                                        const status =
                                            getStatus(goal);


                                        return (

                                            <div
                                                key={goal.id}
                                                className="
                                                    rounded-xl
                                                    border
                                                    border-[#e8edf3]
                                                    bg-white
                                                    p-4
                                                    transition
                                                    hover:border-[#dce5ee]
                                                    hover:shadow-sm
                                                    sm:p-5
                                                "
                                            >

                                                <div className="
                                                    flex
                                                    flex-col
                                                    gap-4
                                                    lg:flex-row
                                                    lg:items-center
                                                ">


                                                    {/* GOAL INFO */}

                                                    <div className="
                                                        flex
                                                        min-w-0
                                                        flex-1
                                                        gap-3
                                                    ">

                                                        <div className="
                                                            flex
                                                            h-12
                                                            w-12
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-2xl
                                                            bg-[#eef5f4]
                                                            text-[#148c7e]
                                                        ">

                                                            <i className="
                                                                ri-flag-2-line
                                                                text-xl
                                                            "></i>

                                                        </div>


                                                        <div className="
                                                            min-w-0
                                                        ">

                                                            <div className="
                                                                flex
                                                                flex-wrap
                                                                items-center
                                                                gap-2
                                                            ">

                                                                <h3 className="
                                                                    truncate
                                                                    text-sm
                                                                    font-semibold
                                                                    text-[#17233c]
                                                                    sm:text-base
                                                                ">
                                                                    {goal.name}
                                                                </h3>


                                                                <span className={`
                                                                    rounded-md
                                                                    px-2
                                                                    py-1
                                                                    text-[10px]
                                                                    font-medium
                                                                    ${
                                                                        status === "Completed"
                                                                            ? "bg-emerald-50 text-emerald-600"
                                                                            : status === "In Progress"
                                                                                ? "bg-[#e7f5f1] text-[#138b7d]"
                                                                                : "bg-slate-100 text-slate-600"
                                                                    }
                                                                `}>
                                                                    {status}
                                                                </span>

                                                            </div>


                                                            <p className="
                                                                mt-1
                                                                line-clamp-2
                                                                text-xs
                                                                text-[#7183a0]
                                                            ">
                                                                {goal.description}
                                                            </p>


                                                            <div className="
                                                                mt-3
                                                                flex
                                                                flex-wrap
                                                                items-center
                                                                gap-2
                                                                text-xs
                                                            ">

                                                                <span className="
                                                                    font-semibold
                                                                    text-[#17233c]
                                                                ">
                                                                    {formatMoney(
                                                                        goal.saved
                                                                    )}
                                                                </span>


                                                                <span className="
                                                                    text-[#91a0b6]
                                                                ">
                                                                    /
                                                                </span>


                                                                <span className="
                                                                    text-[#7183a0]
                                                                ">
                                                                    {formatMoney(
                                                                        goal.target
                                                                    )}
                                                                </span>

                                                            </div>

                                                        </div>

                                                    </div>


                                                    {/* PROGRESS */}

                                                    <div className="
                                                        w-full
                                                        lg:w-[38%]
                                                        lg:max-w-[300px]
                                                    ">

                                                        <div className="
                                                            flex
                                                            items-center
                                                            justify-between
                                                        ">

                                                            <span className="
                                                                text-[11px]
                                                                text-[#7183a0]
                                                            ">
                                                                Progress
                                                            </span>


                                                            <span className="
                                                                text-xs
                                                                font-semibold
                                                                text-[#38557c]
                                                            ">
                                                                {Math.round(progress)}%
                                                            </span>

                                                        </div>


                                                        <div className="
                                                            mt-2
                                                            h-2.5
                                                            w-full
                                                            overflow-hidden
                                                            rounded-full
                                                            bg-[#edf1f5]
                                                        ">

                                                            <div
                                                                className={`
                                                                    h-full
                                                                    rounded-full
                                                                    transition-all
                                                                    duration-500
                                                                    ${
                                                                        status === "Completed"
                                                                            ? "bg-emerald-500"
                                                                            : "bg-[#4b9df8]"
                                                                    }
                                                                `}
                                                                style={{
                                                                    width:
                                                                        `${progress}%`,
                                                                }}
                                                            />

                                                        </div>


                                                        <div className="
                                                            mt-2
                                                            flex
                                                            items-center
                                                            justify-between
                                                            gap-2
                                                        ">

                                                            <span className="
                                                                text-[10px]
                                                                text-[#7890b0]
                                                            ">

                                                                <i className="
                                                                    ri-calendar-line
                                                                    mr-1
                                                                "></i>

                                                                {goal.targetDate
                                                                    ? new Date(
                                                                        goal.targetDate
                                                                    ).toLocaleDateString(
                                                                        "en-IN",
                                                                        {
                                                                            month: "short",
                                                                            year: "numeric",
                                                                        }
                                                                    )
                                                                    : "No target date"
                                                                }

                                                            </span>


                                                            <button
                                                                onClick={() =>
                                                                    setShowAddMoney(
                                                                        goal.id
                                                                    )
                                                                }
                                                                className="
                                                                    text-[10px]
                                                                    font-semibold
                                                                    text-[#148c7e]
                                                                    hover:underline
                                                                "
                                                            >
                                                                Add Money
                                                            </button>

                                                        </div>

                                                    </div>


                                                    {/* DELETE */}

                                                    <div className="
                                                        flex
                                                        items-center
                                                        justify-end
                                                        lg:self-start
                                                    ">

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    goal.id
                                                                )
                                                            }
                                                            className="
                                                                flex
                                                                h-8
                                                                w-8
                                                                items-center
                                                                justify-center
                                                                rounded-full
                                                                text-[#7183a0]
                                                                hover:bg-red-50
                                                                hover:text-red-500
                                                            "
                                                        >

                                                            <i className="
                                                                ri-more-2-fill
                                                            "></i>

                                                        </button>

                                                    </div>

                                                </div>


                                                {/* ADD MONEY */}

                                                {showAddMoney === goal.id && (

                                                    <div className="
                                                        mt-4
                                                        flex
                                                        flex-col
                                                        gap-2
                                                        rounded-xl
                                                        bg-[#f7f9fc]
                                                        p-3
                                                        sm:flex-row
                                                    ">

                                                        <input
                                                            type="number"
                                                            min="1"
                                                            value={moneyAmount}
                                                            onChange={(e) =>
                                                                setMoneyAmount(
                                                                    e.target.value
                                                                )
                                                            }
                                                            placeholder="Enter amount"
                                                            className="
                                                                min-w-0
                                                                flex-1
                                                                rounded-lg
                                                                border
                                                                border-[#dce4ed]
                                                                bg-white
                                                                px-3
                                                                py-2
                                                                text-sm
                                                                outline-none
                                                                focus:border-[#148c7e]
                                                            "
                                                        />


                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleAddMoney(
                                                                    goal.id
                                                                )
                                                            }
                                                            className="
                                                                rounded-lg
                                                                bg-[#148c7e]
                                                                px-4
                                                                py-2
                                                                text-xs
                                                                font-semibold
                                                                text-white
                                                            "
                                                        >
                                                            Add
                                                        </button>


                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setShowAddMoney(null);
                                                                setMoneyAmount("");
                                                            }}
                                                            className="
                                                                rounded-lg
                                                                border
                                                                border-[#dce4ed]
                                                                bg-white
                                                                px-4
                                                                py-2
                                                                text-xs
                                                                font-medium
                                                                text-[#64748b]
                                                            "
                                                        >
                                                            Cancel
                                                        </button>

                                                    </div>

                                                )}

                                            </div>

                                        );

                                    })

                                )}

                            </div>

                        </div>


                        {/* =================================================
                            RIGHT SIDEBAR
                        ================================================= */}

                        <div className="
                            flex
                            flex-col
                            gap-5
                        ">


                            {/* MOTIVATION */}

                            <div className="
                                overflow-hidden
                                rounded-xl
                                border
                                border-[#e5ebf2]
                                bg-white
                                p-4
                                shadow-sm
                                sm:p-5
                            ">

                                <div className="
                                    rounded-lg
                                    bg-[#f1faf9]
                                    p-5
                                ">

                                    <div className="
                                        flex
                                        items-center
                                        gap-4
                                    ">

                                        <div className="
                                            flex
                                            h-16
                                            w-16
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-[#e0f4ef]
                                            text-[#15977e]
                                        ">

                                            <i className="
                                                ri-plant-line
                                                text-4xl
                                            "></i>

                                        </div>


                                        <div>

                                            <h3 className="
                                                text-sm
                                                font-bold
                                                leading-5
                                                text-[#17233c]
                                            ">
                                                Big goals require
                                                <br />
                                                small steps.
                                            </h3>


                                            <p className="
                                                mt-2
                                                text-[11px]
                                                leading-5
                                                text-[#647aa0]
                                            ">
                                                Keep going, you're
                                                doing great!
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* QUICK ACTIONS */}

                            <div className="
                                rounded-xl
                                border
                                border-[#e5ebf2]
                                bg-white
                                p-4
                                shadow-sm
                                sm:p-5
                            ">

                                <h2 className="
                                    flex
                                    items-center
                                    gap-2
                                    text-base
                                    font-bold
                                    text-[#17233c]
                                ">
                                    <span>⚡</span>
                                    Quick Actions
                                </h2>


                                <div className="
                                    mt-4
                                    flex
                                    flex-col
                                    gap-2
                                ">

                                    {quickActions.map(
                                        (action) => (

                                            <button
                                                key={action.title}
                                                type="button"
                                                onClick={() => {

                                                    if (action.action) {

                                                        action.action();

                                                        return;
                                                    }

                                                    navigate(
                                                        action.path
                                                    );

                                                }}
                                                className="
                                                    flex
                                                    w-full
                                                    items-center
                                                    justify-between
                                                    rounded-lg
                                                    border
                                                    border-[#edf1f5]
                                                    bg-white
                                                    p-2.5
                                                    text-left
                                                    transition
                                                    hover:bg-[#f8fafc]
                                                "
                                            >

                                                <div className="
                                                    flex
                                                    items-center
                                                    gap-3
                                                ">

                                                    <div className={`
                                                        flex
                                                        h-9
                                                        w-9
                                                        items-center
                                                        justify-center
                                                        rounded-lg
                                                        ${action.iconBg}
                                                        ${action.iconColor}
                                                    `}>

                                                        <i className={`
                                                            ${action.icon}
                                                            text-lg
                                                        `}></i>

                                                    </div>


                                                    <span className="
                                                        text-xs
                                                        font-medium
                                                        text-[#34445c]
                                                    ">
                                                        {action.title}
                                                    </span>

                                                </div>


                                                <i className="
                                                    ri-arrow-right-s-line
                                                    text-[#91a0b6]
                                                "></i>

                                            </button>

                                        )
                                    )}

                                </div>

                            </div>


                            {/* GOAL INSIGHTS */}

                            <div className="
                                rounded-xl
                                border
                                border-[#e5ebf2]
                                bg-white
                                p-4
                                shadow-sm
                                sm:p-5
                            ">

                                <h2 className="
                                    flex
                                    items-center
                                    gap-2
                                    text-base
                                    font-bold
                                    text-[#17233c]
                                ">
                                    <span>💡</span>
                                    Goal Insights
                                </h2>


                                <div className="
                                    mt-5
                                    flex
                                    flex-col
                                    items-center
                                    gap-5
                                    sm:flex-row
                                ">


                                    {/* DONUT */}

                                    <div className="
                                        relative
                                        h-28
                                        w-28
                                        shrink-0
                                    ">

                                        <div
                                            className="
                                                absolute
                                                inset-0
                                                rounded-full
                                            "
                                            style={{
                                                background:
                                                    `conic-gradient(
                                                        #1b9b57 ${overallProgress}%,
                                                        #e9eef4 ${overallProgress}% 100%
                                                    )`,
                                            }}
                                        />


                                        <div className="
                                            absolute
                                            inset-2
                                            flex
                                            flex-col
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-white
                                        ">

                                            <span className="
                                                text-lg
                                                font-bold
                                                text-[#17233c]
                                            ">
                                                {Math.round(
                                                    overallProgress
                                                )}%
                                            </span>


                                            <span className="
                                                text-[8px]
                                                text-[#9aa8ba]
                                            ">
                                                overall
                                            </span>

                                        </div>

                                    </div>


                                    <div>

                                        <h3 className="
                                            text-sm
                                            font-semibold
                                            text-[#17233c]
                                        ">
                                            You're on track!
                                        </h3>


                                        <p className="
                                            mt-1
                                            text-[11px]
                                            leading-5
                                            text-[#7183a0]
                                        ">
                                            Keep saving, you're
                                            getting closer to
                                            your goals.
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* QUOTE */}

                            <div className="
                                overflow-hidden
                                rounded-xl
                                border
                                border-[#e5ebf2]
                                bg-white
                                p-4
                                shadow-sm
                                sm:p-5
                            ">

                                <div className="
                                    rounded-lg
                                    bg-[#eef9f8]
                                    p-5
                                ">

                                    <div className="
                                        text-2xl
                                        font-bold
                                        text-[#54b9ae]
                                    ">
                                        “
                                    </div>


                                    <p className="
                                        text-sm
                                        leading-6
                                        text-[#36566b]
                                    ">
                                        A goal without a plan
                                        is just a wish.
                                    </p>


                                    <p className="
                                        mt-3
                                        text-[10px]
                                        font-medium
                                        text-[#7191a2]
                                    ">
                                        — Antoine de Saint-Exupéry
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </main>

            </div>


            {/* =====================================================
                CREATE GOAL MODAL
            ===================================================== */}

            {showForm && (

                <div className="
                    fixed
                    inset-0
                    z-[100]
                    flex
                    items-center
                    justify-center
                    bg-black/30
                    p-4
                    backdrop-blur-sm
                ">

                    <div className="
                        max-h-[90vh]
                        w-full
                        max-w-lg
                        overflow-y-auto
                        rounded-2xl
                        bg-white
                        p-5
                        shadow-2xl
                        sm:p-6
                    ">


                        <div className="
                            flex
                            items-center
                            justify-between
                        ">

                            <div>

                                <h2 className="
                                    text-xl
                                    font-bold
                                    text-[#17233c]
                                ">
                                    Create New Goal
                                </h2>


                                <p className="
                                    mt-1
                                    text-xs
                                    text-[#7183a0]
                                ">
                                    Set a target and start
                                    working towards it.
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    setShowForm(false)
                                }
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-[#f4f6f8]
                                    text-[#64748b]
                                "
                            >

                                <i className="
                                    ri-close-line
                                "></i>

                            </button>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                            className="
                                mt-6
                                flex
                                flex-col
                                gap-4
                            "
                        >


                            {/* NAME */}

                            <div>

                                <label className="
                                    mb-1.5
                                    block
                                    text-xs
                                    font-medium
                                    text-[#34445c]
                                ">
                                    Goal Name
                                </label>


                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name:
                                                e.target.value,
                                        })
                                    }
                                    placeholder="e.g. New Laptop"
                                    className="
                                        w-full
                                        rounded-lg
                                        border
                                        border-[#dce4ed]
                                        px-3
                                        py-2.5
                                        text-sm
                                        outline-none
                                        focus:border-[#148c7e]
                                    "
                                />

                            </div>


                            {/* DESCRIPTION */}

                            <div>

                                <label className="
                                    mb-1.5
                                    block
                                    text-xs
                                    font-medium
                                    text-[#34445c]
                                ">
                                    Description
                                </label>


                                <textarea
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description:
                                                e.target.value,
                                        })
                                    }
                                    placeholder="What are you saving for?"
                                    className="
                                        w-full
                                        resize-none
                                        rounded-lg
                                        border
                                        border-[#dce4ed]
                                        px-3
                                        py-2.5
                                        text-sm
                                        outline-none
                                        focus:border-[#148c7e]
                                    "
                                />

                            </div>


                            {/* AMOUNTS */}

                            <div className="
                                grid
                                grid-cols-1
                                gap-4
                                sm:grid-cols-2
                            ">


                                <div>

                                    <label className="
                                        mb-1.5
                                        block
                                        text-xs
                                        font-medium
                                        text-[#34445c]
                                    ">
                                        Target Amount
                                    </label>


                                    <input
                                        type="number"
                                        min="1"
                                        value={formData.target}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                target:
                                                    e.target.value,
                                            })
                                        }
                                        placeholder="100000"
                                        className="
                                            w-full
                                            rounded-lg
                                            border
                                            border-[#dce4ed]
                                            px-3
                                            py-2.5
                                            text-sm
                                            outline-none
                                            focus:border-[#148c7e]
                                        "
                                    />

                                </div>


                                <div>

                                    <label className="
                                        mb-1.5
                                        block
                                        text-xs
                                        font-medium
                                        text-[#34445c]
                                    ">
                                        Already Saved
                                    </label>


                                    <input
                                        type="number"
                                        min="0"
                                        value={formData.saved}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                saved:
                                                    e.target.value,
                                            })
                                        }
                                        placeholder="0"
                                        className="
                                            w-full
                                            rounded-lg
                                            border
                                            border-[#dce4ed]
                                            px-3
                                            py-2.5
                                            text-sm
                                            outline-none
                                            focus:border-[#148c7e]
                                        "
                                    />

                                </div>

                            </div>


                            {/* DATE */}

                            <div>

                                <label className="
                                    mb-1.5
                                    block
                                    text-xs
                                    font-medium
                                    text-[#34445c]
                                ">
                                    Target Date
                                </label>


                                <input
                                    type="date"
                                    value={formData.targetDate}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            targetDate:
                                                e.target.value,
                                        })
                                    }
                                    className="
                                        w-full
                                        rounded-lg
                                        border
                                        border-[#dce4ed]
                                        px-3
                                        py-2.5
                                        text-sm
                                        outline-none
                                        focus:border-[#148c7e]
                                    "
                                />

                            </div>


                            {/* BUTTONS */}

                            <div className="
                                mt-2
                                flex
                                flex-col-reverse
                                gap-2
                                sm:flex-row
                                sm:justify-end
                            ">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowForm(false)
                                    }
                                    className="
                                        rounded-lg
                                        border
                                        border-[#dce4ed]
                                        px-5
                                        py-2.5
                                        text-sm
                                        font-medium
                                        text-[#64748b]
                                    "
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="
                                        rounded-lg
                                        bg-[#148c7e]
                                        px-5
                                        py-2.5
                                        text-sm
                                        font-semibold
                                        text-white
                                        hover:bg-[#10786d]
                                    "
                                >
                                    Create Goal
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>

    );

}

export default Goals;