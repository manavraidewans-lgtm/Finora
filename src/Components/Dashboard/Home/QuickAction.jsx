import { useNavigate } from "react-router-dom";

function QuickAction() {
    const navigate = useNavigate();

    const actions = [
        {
            label: "Add Transaction",
            path: "/dashboard/transactions",
            icon: "ri-add-line",
            bg: "bg-[#f0fafb]",
            iconBg: "bg-[#e0f5f7]",
            iconColor: "text-[#24a7ad]",
        },
        {
            label: "Set Budget",
            path: "/dashboard/budgets",
            icon: "ri-focus-3-line",
            bg: "bg-[#f6f3ff]",
            iconBg: "bg-[#eee9ff]",
            iconColor: "text-[#6246d9]",
        },
        {
            label: "Set Goal",
            path: "/dashboard/goals",
            icon: "ri-flag-line",
            bg: "bg-[#fff9ef]",
            iconBg: "bg-[#fff0d8]",
            iconColor: "text-[#d88913]",
        },
        {
            label: "View Reports",
            path: "/dashboard/reports",
            icon: "ri-file-chart-line",
            bg: "bg-[#f1f7ff]",
            iconBg: "bg-[#e4f0ff]",
            iconColor: "text-[#2878d4]",
        },
    ];

    return (
        <div className="flex h-auto w-full flex-col gap-4 rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm md:p-5 lg:p-5">


            {/* HEADING */}
            <h1 className="text-xl font-bold text-[#111827] md:text-2xl">
                Quick Actions
            </h1>

 
            {/* ACTIONS */}
            <div className="flex flex-col gap-2 md:gap-3">
                {actions.map((action) => (
                    <div
                        key={action.label}
                        onClick={() => navigate(action.path)}
                        className={`flex h-14 w-full cursor-pointer items-center justify-between rounded-xl px-3 transition duration-200 hover:scale-[1.01] md:h-16 md:px-4 ${action.bg}`}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl md:h-12 md:w-12 md:text-2xl ${action.iconBg} ${action.iconColor}`}
                            >
                                <i className={action.icon}></i>
                            </div>

                            <h2 className="text-sm font-medium text-[#334155] md:text-base">
                                {action.label}
                            </h2>
                        </div>

                        <i className="ri-arrow-right-s-line text-xl text-[#334155] md:text-2xl"></i>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default QuickAction;