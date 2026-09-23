import { useNavigate } from "react-router-dom";

function DashboardGoals() {

    const navigate = useNavigate();


    // ================= DEFAULT GOALS =================

    const goals = [
        {
            title: "Travel to Japan",
            saved: 45000,
            target: 100000,
            icon: "ri-flight-takeoff-line",
            iconBg: "bg-[#f3f5f8]",
            iconColor: "text-[#526277]",
        },
        {
            title: "New Laptop",
            saved: 60000,
            target: 120000,
            icon: "ri-computer-line",
            iconBg: "bg-[#eefaf5]",
            iconColor: "text-[#27343d]",
        },
        {
            title: "Emergency Fund",
            saved: 35000,
            target: 50000,
            icon: "ri-shield-check-line",
            iconBg: "bg-[#fff5e8]",
            iconColor: "text-[#d98516]",
        },
        {
            title: "New Car",
            saved: 180000,
            target: 500000,
            icon: "ri-car-line",
            iconBg: "bg-[#f0ebff]",
            iconColor: "text-[#7657e8]",
        },
    ];


    // ================= MONEY FORMAT =================

    const formatMoney = (amount) => {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
            }
        ).format(amount);

    };


    return (
        <div className="
            flex
            h-full
            w-full
            flex-col
            rounded-2xl
            border
            border-[#e8e8e8]
            bg-white
            p-4
            shadow-sm

            sm:p-5
            md:p-6
            lg:p-7
        ">

            {/* ================= HEADER ================= */}

            <div className="
                flex
                shrink-0
                items-center
                justify-between
            ">

                <h1 className="
                    text-xl
                    font-bold
                    text-[#111827]

                    md:text-2xl
                ">
                    Goals
                </h1>


                <button
                    onClick={() =>
                        navigate("/dashboard/goals")
                    }
                    className="
                        text-sm
                        font-medium
                        text-[#4b91c9]
                        transition
                        duration-200
                        hover:text-[#357bb1]
                    "
                >
                    View All
                </button>

            </div>


            {/* ================= GOALS ================= */}

            <div className="
                mt-6
                flex
                flex-1
                flex-col
                justify-between
                gap-6
            ">

                {goals.map((goal, index) => {

                    const percentage =
                        Math.min(
                            Math.round(
                                (goal.saved /
                                    goal.target) *
                                    100
                            ),
                            100
                        );


                    return (

                        <div
                            key={index}
                            className="
                                flex
                                min-w-0
                                items-start
                                gap-3
                            "
                        >

                            {/* ================= ICON ================= */}

                            <div
                                className={`
                                    flex
                                    h-12
                                    w-12
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    text-xl

                                    sm:h-14
                                    sm:w-14
                                    sm:text-2xl

                                    ${goal.iconBg}
                                    ${goal.iconColor}
                                `}
                            >
                                <i
                                    className={goal.icon}
                                ></i>
                            </div>


                            {/* ================= CONTENT ================= */}

                            <div className="
                                min-w-0
                                flex-1
                            ">

                                {/* TITLE */}

                                <h2 className="
                                    truncate
                                    text-sm
                                    font-semibold
                                    text-[#1f2937]

                                    sm:text-base
                                    md:text-lg
                                ">
                                    {goal.title}
                                </h2>


                                {/* AMOUNT */}

                                <p className="
                                    mt-1
                                    text-xs
                                    font-medium
                                    text-[#8b95a5]

                                    sm:text-sm
                                    md:text-base
                                ">
                                    {formatMoney(goal.saved)}
                                    {" / "}
                                    {formatMoney(goal.target)}
                                </p>


                                {/* PROGRESS */}

                                <div className="
                                    mt-3
                                    flex
                                    items-center
                                    gap-3
                                ">

                                    <div className="
                                        h-2.5
                                        min-w-0
                                        flex-1
                                        overflow-hidden
                                        rounded-full
                                        bg-[#e9eef3]
                                    ">

                                        <div
                                            className="
                                                h-full
                                                rounded-full
                                                bg-[#43a7a7]
                                                transition-all
                                                duration-500
                                            "
                                            style={{
                                                width:
                                                    `${percentage}%`,
                                            }}
                                        />

                                    </div>


                                    <span className="
                                        shrink-0
                                        text-xs
                                        font-medium
                                        text-[#374151]

                                        sm:text-sm
                                    ">
                                        {percentage}%
                                    </span>

                                </div>

                            </div>

                        </div>

                    );

                })}

            </div>

        </div>
    );
}

export default DashboardGoals;