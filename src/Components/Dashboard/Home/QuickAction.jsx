import { useNavigate } from "react-router-dom";

function QuickAction() {

    const navigate = useNavigate();

    return (
        <div className="
            flex
            h-auto
            w-full
            flex-col
            gap-4
            rounded-2xl
            border
            border-[#e5e7eb]
            bg-white
            p-4
            shadow-sm

            md:p-5
            lg:p-5
        ">

            {/* ================= HEADING ================= */}

            <h1 className="
                text-xl
                font-bold
                text-[#111827]

                md:text-2xl
                lg:text-2xl
            ">
                Quick Actions
            </h1>


            {/* ================= ACTIONS ================= */}

            <div className="
                flex
                flex-col
                gap-2

                md:gap-3
                lg:gap-3
            ">


                {/* ================= ADD TRANSACTION ================= */}

                <div
                    onClick={() => navigate("/dashboard/transactions")}
                    className="
                        flex
                        h-14
                        w-full
                        cursor-pointer
                        items-center
                        justify-between
                        rounded-xl
                        bg-[#f0fafb]
                        px-3
                        transition
                        duration-200
                        hover:scale-[1.01]

                        md:h-16
                        md:px-4

                        lg:h-16
                        lg:px-4
                    "
                >

                    <div className="flex items-center gap-3">

                        <div className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#e0f5f7]
                            text-xl
                            text-[#24a7ad]

                            md:h-12
                            md:w-12
                            md:text-2xl
                        ">
                            <i className="ri-add-line"></i>
                        </div>

                        <h2 className="
                            text-sm
                            font-medium
                            text-[#334155]

                            md:text-base
                            lg:text-base
                        ">
                            Add Transaction
                        </h2>

                    </div>

                    <i className="
                        ri-arrow-right-s-line
                        text-xl
                        text-[#334155]

                        md:text-2xl
                    "></i>

                </div>


                {/* ================= SET BUDGET ================= */}

                <div
                    onClick={() => navigate("/dashboard/budgets")}
                    className="
                        flex
                        h-14
                        w-full
                        cursor-pointer
                        items-center
                        justify-between
                        rounded-xl
                        bg-[#f6f3ff]
                        px-3
                        transition
                        duration-200
                        hover:scale-[1.01]

                        md:h-16
                        md:px-4

                        lg:h-16
                        lg:px-4
                    "
                >

                    <div className="flex items-center gap-3">

                        <div className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#eee9ff]
                            text-xl
                            text-[#6246d9]

                            md:h-12
                            md:w-12
                            md:text-2xl
                        ">
                            <i className="ri-focus-3-line"></i>
                        </div>

                        <h2 className="
                            text-sm
                            font-medium
                            text-[#334155]

                            md:text-base
                            lg:text-base
                        ">
                            Set Budget
                        </h2>

                    </div>

                    <i className="
                        ri-arrow-right-s-line
                        text-xl
                        text-[#334155]

                        md:text-2xl
                    "></i>

                </div>


                {/* ================= SET GOAL ================= */}

                <div
                    onClick={() => navigate("/dashboard/goals")}
                    className="
                        flex
                        h-14
                        w-full
                        cursor-pointer
                        items-center
                        justify-between
                        rounded-xl
                        bg-[#fff9ef]
                        px-3
                        transition
                        duration-200
                        hover:scale-[1.01]

                        md:h-16
                        md:px-4

                        lg:h-16
                        lg:px-4
                    "
                >

                    <div className="flex items-center gap-3">

                        <div className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#fff0d8]
                            text-xl
                            text-[#d88913]

                            md:h-12
                            md:w-12
                            md:text-2xl
                        ">
                            <i className="ri-flag-line"></i>
                        </div>

                        <h2 className="
                            text-sm
                            font-medium
                            text-[#334155]

                            md:text-base
                            lg:text-base
                        ">
                            Set Goal
                        </h2>

                    </div>

                    <i className="
                        ri-arrow-right-s-line
                        text-xl
                        text-[#334155]

                        md:text-2xl
                    "></i>

                </div>


                {/* ================= VIEW REPORTS ================= */}

                <div
                    onClick={() => navigate("/dashboard/reports")}
                    className="
                        flex
                        h-14
                        w-full
                        cursor-pointer
                        items-center
                        justify-between
                        rounded-xl
                        bg-[#f1f7ff]
                        px-3
                        transition
                        duration-200
                        hover:scale-[1.01]

                        md:h-16
                        md:px-4

                        lg:h-16
                        lg:px-4
                    "
                >

                    <div className="flex items-center gap-3">

                        <div className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#e4f0ff]
                            text-xl
                            text-[#2878d4]

                            md:h-12
                            md:w-12
                            md:text-2xl
                        ">
                            <i className="ri-file-chart-line"></i>
                        </div>

                        <h2 className="
                            text-sm
                            font-medium
                            text-[#334155]

                            md:text-base
                            lg:text-base
                        ">
                            View Reports
                        </h2>

                    </div>

                    <i className="
                        ri-arrow-right-s-line
                        text-xl
                        text-[#334155]

                        md:text-2xl
                    "></i>

                </div>

            </div>

        </div>
    );
}

export default QuickAction;