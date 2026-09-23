import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DashboardRecentTransactions() {

    const navigate = useNavigate();

    // ================= DEFAULT DEMO DATA =================

    const defaultTransactions = [
        {
            id: "demo-1",
            date: "2026-09-19",
            description: "Starbucks",
            category: "Food & Dining",
            amount: 450,
            type: "expense",
        },
        {
            id: "demo-2",
            date: "2026-09-18",
            description: "Uber",
            category: "Travel",
            amount: 320,
            type: "expense",
        },
        {
            id: "demo-3",
            date: "2026-09-16",
            description: "Amazon",
            category: "Shopping",
            amount: 2499,
            type: "expense",
        },
        {
            id: "demo-4",
            date: "2026-09-14",
            description: "Electricity Bill",
            category: "Bills & Utilities",
            amount: 1200,
            type: "expense",
        },
        {
            id: "demo-5",
            date: "2026-09-12",
            description: "Salary",
            category: "Income",
            amount: 70000,
            type: "income",
        },
    ];


    // ================= STATE =================

    const [transactions, setTransactions] =
        useState([]);


    // ================= LOAD TRANSACTIONS =================

    useEffect(() => {

        const loadTransactions = () => {

            const saved =
                localStorage.getItem(
                    "finoraTransactions"
                );


            if (!saved) {

                setTransactions([]);

                return;

            }


            try {

                const data =
                    JSON.parse(saved);


                setTransactions(
                    Array.isArray(data)
                        ? data
                        : []
                );

            } catch (error) {

                console.error(
                    "Transaction loading error:",
                    error
                );

                setTransactions([]);

            }

        };


        loadTransactions();


        window.addEventListener(
            "storage",
            loadTransactions
        );


        window.addEventListener(
            "transactionsUpdated",
            loadTransactions
        );


        return () => {

            window.removeEventListener(
                "storage",
                loadTransactions
            );

            window.removeEventListener(
                "transactionsUpdated",
                loadTransactions
            );

        };

    }, []);


    // ================= DISPLAY DATA =================

    const displayTransactions =
        transactions.length > 0
            ? transactions
            : defaultTransactions;


    // ================= SORT =================

    const sortedTransactions = [
        ...displayTransactions,
    ]
        .sort((a, b) => {

            const dateA = new Date(
                a.date ||
                a.createdAt ||
                a.timestamp ||
                0
            );

            const dateB = new Date(
                b.date ||
                b.createdAt ||
                b.timestamp ||
                0
            );

            return dateB - dateA;

        })
        .slice(0, 5);


    // ================= DATE FORMAT =================

    const formatDate = (dateValue) => {

        if (!dateValue) {
            return "--";
        }


        const date =
            new Date(dateValue);


        if (isNaN(date.getTime())) {
            return "--";
        }


        return new Intl.DateTimeFormat(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        ).format(date);

    };


    // ================= MONEY FORMAT =================

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


    // ================= ICON =================

    const getIcon = (category) => {

        const value =
            String(category || "")
                .toLowerCase();


        if (
            value.includes("food") ||
            value.includes("dining") ||
            value.includes("restaurant")
        ) {
            return "ri-restaurant-line";
        }


        if (
            value.includes("travel") ||
            value.includes("transport") ||
            value.includes("uber")
        ) {
            return "ri-car-line";
        }


        if (
            value.includes("shopping") ||
            value.includes("amazon")
        ) {
            return "ri-shopping-bag-line";
        }


        if (
            value.includes("bill") ||
            value.includes("utility") ||
            value.includes("electric")
        ) {
            return "ri-flashlight-line";
        }


        if (
            value.includes("income") ||
            value.includes("salary")
        ) {
            return "ri-money-rupee-circle-line";
        }


        if (
            value.includes("health") ||
            value.includes("medical")
        ) {
            return "ri-heart-pulse-line";
        }


        if (
            value.includes("entertainment")
        ) {
            return "ri-movie-line";
        }


        return "ri-wallet-3-line";

    };


    // ================= ICON STYLE =================

    const getIconStyle = (transaction) => {

        const type =
            String(
                transaction.type || ""
            ).toLowerCase();


        if (type === "income") {

            return {
                bg: "bg-[#e8f8f0]",
                color: "text-[#43a77b]",
            };

        }


        const category =
            String(
                transaction.category || ""
            ).toLowerCase();


        if (
            category.includes("food") ||
            category.includes("dining")
        ) {

            return {
                bg: "bg-[#fff2df]",
                color: "text-[#d98516]",
            };

        }


        if (
            category.includes("travel") ||
            category.includes("transport")
        ) {

            return {
                bg: "bg-[#eeeaff]",
                color: "text-[#7657e8]",
            };

        }


        if (
            category.includes("shopping")
        ) {

            return {
                bg: "bg-[#f0ebff]",
                color: "text-[#7657e8]",
            };

        }


        if (
            category.includes("bill") ||
            category.includes("utility")
        ) {

            return {
                bg: "bg-[#fff1df]",
                color: "text-[#e28a1c]",
            };

        }


        return {
            bg: "bg-[#f3eee9]",
            color: "text-[#896b57]",
        };

    };


    return (

        <div className="
            flex
            h-full
            w-full
            min-w-0
            flex-col
            overflow-hidden
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
                    min-w-0
                    truncate
                    text-lg
                    font-bold
                    text-[#111827]

                    sm:text-xl
                    md:text-2xl
                ">
                    Recent Transactions
                </h1>


                <button
                    onClick={() =>
                        navigate(
                            "/dashboard/transactions"
                        )
                    }
                    className="
                        ml-3
                        shrink-0
                        text-xs
                        font-medium
                        text-[#4b91c9]
                        transition
                        duration-200
                        hover:text-[#357bb1]

                        sm:text-sm
                    "
                >
                    View All
                </button>

            </div>


            {/* ================================================== */}
            {/*                  MOBILE LIST                       */}
            {/* ================================================== */}

            <div className="
                mt-5
                flex
                flex-col

                md:hidden
            ">

                {sortedTransactions.map(
                    (transaction, index) => {

                        const type =
                            String(
                                transaction.type || ""
                            ).toLowerCase();


                        const isIncome =
                            type === "income";


                        const iconStyle =
                            getIconStyle(
                                transaction
                            );


                        const icon =
                            getIcon(
                                transaction.category
                            );


                        const description =
                            transaction.description ||
                            transaction.title ||
                            transaction.name ||
                            "Transaction";


                        const category =
                            transaction.category ||
                            (
                                isIncome
                                    ? "Income"
                                    : "Others"
                            );


                        return (

                            <div
                                key={
                                    transaction.id ||
                                    transaction._id ||
                                    index
                                }
                                className="
                                    flex
                                    min-w-0
                                    items-center
                                    gap-3
                                    border-b
                                    border-[#eeeeee]
                                    py-3.5

                                    last:border-b-0
                                "
                            >

                                {/* ICON */}

                                <div
                                    className={`
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        text-lg

                                        ${iconStyle.bg}
                                        ${iconStyle.color}
                                    `}
                                >
                                    <i
                                        className={icon}
                                    ></i>
                                </div>


                                {/* MIDDLE CONTENT */}

                                <div className="
                                    min-w-0
                                    flex-1
                                ">

                                    <h2 className="
                                        truncate
                                        text-sm
                                        font-semibold
                                        text-[#344054]
                                    ">
                                        {description}
                                    </h2>


                                    <div className="
                                        mt-1
                                        flex
                                        min-w-0
                                        items-center
                                        gap-1.5
                                    ">

                                        <span className="
                                            max-w-[120px]
                                            truncate
                                            text-[11px]
                                            font-medium
                                            text-[#8b95a5]
                                        ">
                                            {category}
                                        </span>


                                        <span className="
                                            text-[#d0d5dd]
                                        ">
                                            •
                                        </span>


                                        <span className="
                                            shrink-0
                                            text-[11px]
                                            font-medium
                                            text-[#8b95a5]
                                        ">
                                            {formatDate(
                                                transaction.date ||
                                                transaction.createdAt ||
                                                transaction.timestamp
                                            )}
                                        </span>

                                    </div>

                                </div>


                                {/* AMOUNT */}

                                <div className="
                                    shrink-0
                                    text-right
                                ">

                                    <p className={`
                                        text-xs
                                        font-bold

                                        sm:text-sm

                                        ${
                                            isIncome
                                                ? "text-[#43a77b]"
                                                : "text-[#e85d68]"
                                        }
                                    `}>

                                        {isIncome
                                            ? "+"
                                            : "-"}

                                        {" "}

                                        {formatMoney(
                                            Math.abs(
                                                Number(
                                                    transaction.amount
                                                ) || 0
                                            )
                                        )}

                                    </p>

                                </div>

                            </div>

                        );

                    }
                )}

            </div>


            {/* ================================================== */}
            {/*                  DESKTOP TABLE                     */}
            {/* ================================================== */}

            <div className="
                mt-6
                hidden

                md:block
            ">

                {/* TABLE HEADER */}

                <div className="
                    grid
                    grid-cols-[1fr_2fr_1.5fr_1fr]
                    gap-4
                    border-b
                    border-[#eeeeee]
                    pb-3
                ">

                    <span className="
                        text-sm
                        font-medium
                        text-[#8b95a5]
                    ">
                        Date
                    </span>


                    <span className="
                        text-sm
                        font-medium
                        text-[#8b95a5]
                    ">
                        Description
                    </span>


                    <span className="
                        text-sm
                        font-medium
                        text-[#8b95a5]
                    ">
                        Category
                    </span>


                    <span className="
                        text-right
                        text-sm
                        font-medium
                        text-[#8b95a5]
                    ">
                        Amount
                    </span>

                </div>


                {/* TABLE ROWS */}

                <div className="
                    divide-y
                    divide-[#eeeeee]
                ">

                    {sortedTransactions.map(
                        (transaction, index) => {

                            const type =
                                String(
                                    transaction.type || ""
                                ).toLowerCase();


                            const isIncome =
                                type === "income";


                            const iconStyle =
                                getIconStyle(
                                    transaction
                                );


                            const icon =
                                getIcon(
                                    transaction.category
                                );


                            const description =
                                transaction.description ||
                                transaction.title ||
                                transaction.name ||
                                "Transaction";


                            const category =
                                transaction.category ||
                                (
                                    isIncome
                                        ? "Income"
                                        : "Others"
                                );


                            return (

                                <div
                                    key={
                                        transaction.id ||
                                        transaction._id ||
                                        index
                                    }
                                    className="
                                        grid
                                        grid-cols-[1fr_2fr_1.5fr_1fr]
                                        items-center
                                        gap-4
                                        py-4
                                    "
                                >

                                    {/* DATE */}

                                    <div className="
                                        text-xs
                                        font-medium
                                        text-[#667085]

                                        sm:text-sm
                                    ">
                                        {formatDate(
                                            transaction.date ||
                                            transaction.createdAt ||
                                            transaction.timestamp
                                        )}
                                    </div>


                                    {/* DESCRIPTION */}

                                    <div className="
                                        flex
                                        min-w-0
                                        items-center
                                        gap-3
                                    ">

                                        <div
                                            className={`
                                                flex
                                                h-10
                                                w-10
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-full
                                                text-lg

                                                ${iconStyle.bg}
                                                ${iconStyle.color}
                                            `}
                                        >
                                            <i
                                                className={icon}
                                            ></i>
                                        </div>


                                        <span className="
                                            min-w-0
                                            truncate
                                            text-sm
                                            font-medium
                                            text-[#344054]

                                            sm:text-base
                                        ">
                                            {description}
                                        </span>

                                    </div>


                                    {/* CATEGORY */}

                                    <div className="
                                        truncate
                                        text-sm
                                        font-medium
                                        text-[#667085]
                                    ">
                                        {category}
                                    </div>


                                    {/* AMOUNT */}

                                    <div className="
                                        text-right
                                        text-sm
                                        font-semibold
                                    ">

                                        <span
                                            className={
                                                isIncome
                                                    ? "text-[#43a77b]"
                                                    : "text-[#e85d68]"
                                            }
                                        >

                                            {isIncome
                                                ? "+ "
                                                : "- "}

                                            {formatMoney(
                                                Math.abs(
                                                    Number(
                                                        transaction.amount
                                                    ) || 0
                                                )
                                            )}

                                        </span>

                                    </div>

                                </div>

                            );

                        }
                    )}

                </div>

            </div>


            {/* ================= DEMO MESSAGE ================= */}

            {transactions.length === 0 && (

                <div className="
                    mt-4
                    shrink-0
                    rounded-xl
                    border
                    border-dashed
                    border-[#ddd7d2]
                    bg-[#faf9f7]
                    px-3
                    py-3
                    text-center

                    sm:px-4
                    sm:py-4
                ">

                    <p className="
                        text-xs
                        font-semibold
                        text-[#374151]

                        sm:text-sm
                    ">
                        These are demo transactions
                    </p>


                    <p className="
                        mt-1
                        text-[10px]
                        leading-4
                        text-[#8b95a5]

                        sm:text-xs
                    ">
                        Add your first transaction to see
                        your real activity here.
                    </p>


                    <button
                        onClick={() =>
                            navigate(
                                "/dashboard/transactions"
                            )
                        }
                        className="
                            mt-2
                            text-xs
                            font-semibold
                            text-[#896b57]
                            hover:underline

                            sm:text-sm
                        "
                    >
                        Add your first transaction
                    </button>

                </div>

            )}

        </div>
    );
}

export default DashboardRecentTransactions;