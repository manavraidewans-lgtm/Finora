import { useEffect, useMemo, useState } from "react";

import Navbar from "../../Components/Dashboard/Navbar.jsx";
import Top from "../../Components/Dashboard/Top.jsx";

function Recurring() {

    // =====================================================
    // RECURRING TRANSACTIONS
    // =====================================================

    const [recurring, setRecurring] = useState(() => {

        const savedRecurring =
            localStorage.getItem("finoraRecurring");

        if (!savedRecurring) {
            return [];
        }

        try {
            return JSON.parse(savedRecurring);
        } catch (error) {
            console.error(
                "Recurring loading error:",
                error
            );

            return [];
        }

    });


    // =====================================================
    // FORM
    // =====================================================

    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        category: "Bills & Utilities",
        amount: "",
        frequency: "Monthly",
        nextPayment: "",
        type: "expense",
        status: "Active",
    });


    // =====================================================
    // SYNC RECURRING DATA
    // =====================================================

    useEffect(() => {

        const syncRecurring = () => {

            const savedRecurring =
                localStorage.getItem("finoraRecurring");

            if (!savedRecurring) {

                setRecurring([]);

                return;

            }

            try {

                setRecurring(
                    JSON.parse(savedRecurring)
                );

            } catch (error) {

                console.error(
                    "Recurring sync error:",
                    error
                );

            }

        };


        window.addEventListener(
            "recurringUpdated",
            syncRecurring
        );

        window.addEventListener(
            "storage",
            syncRecurring
        );


        return () => {

            window.removeEventListener(
                "recurringUpdated",
                syncRecurring
            );

            window.removeEventListener(
                "storage",
                syncRecurring
            );

        };

    }, []);


    // =====================================================
    // SAVE DATA
    // =====================================================

    const saveRecurring = (data) => {

        localStorage.setItem(
            "finoraRecurring",
            JSON.stringify(data)
        );

        window.dispatchEvent(
            new Event("recurringUpdated")
        );

    };


    // =====================================================
    // MONEY FORMAT
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
    // DATE FORMAT
    // =====================================================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        const parsedDate =
            new Date(date);

        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {
            return date;
        }

        return parsedDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );

    };


    // =====================================================
    // MONTHLY AMOUNT
    // =====================================================

    const monthlyAmount = useMemo(() => {

        return recurring
            .filter(
                (item) =>
                    item.status !== "Paused"
            )
            .reduce(
                (total, item) => {

                    const amount =
                        Number(
                            item.amount || 0
                        );

                    if (
                        item.frequency ===
                        "Monthly"
                    ) {

                        return total + amount;

                    }

                    if (
                        item.frequency ===
                        "Weekly"
                    ) {

                        return total +
                            amount * 4;

                    }

                    if (
                        item.frequency ===
                        "Yearly"
                    ) {

                        return total +
                            amount / 12;

                    }

                    return total;

                },
                0
            );

    }, [recurring]);


    // =====================================================
    // THIS MONTH PAID
    // =====================================================

    const thisMonthPaid = useMemo(() => {

        const now =
            new Date();

        const currentMonth =
            now.getMonth();

        const currentYear =
            now.getFullYear();

        return recurring
            .filter(
                (item) =>
                    item.status !== "Paused"
            )
            .filter((item) => {

                if (!item.lastPaid) {
                    return false;
                }

                const date =
                    new Date(
                        item.lastPaid
                    );

                return (
                    date.getMonth() ===
                        currentMonth &&
                    date.getFullYear() ===
                        currentYear
                );

            })
            .reduce(
                (total, item) =>
                    total +
                    Number(
                        item.amount || 0
                    ),
                0
            );

    }, [recurring]);


    // =====================================================
    // UPCOMING PAYMENTS
    // =====================================================

    const upcomingPayments = useMemo(() => {

        const today =
            new Date();

        today.setHours(
            0,
            0,
            0,
            0
        );

        return recurring
            .filter(
                (item) =>
                    item.status !== "Paused"
            )
            .filter(
                (item) =>
                    item.nextPayment
            )
            .sort(
                (a, b) =>
                    new Date(
                        a.nextPayment
                    ) -
                    new Date(
                        b.nextPayment
                    )
            )
            .slice(0, 5);

    }, [recurring]);


    // =====================================================
    // ADD RECURRING
    // =====================================================

    const handleSubmit = (event) => {

        event.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.amount ||
            !formData.nextPayment
        ) {
            return;
        }

        const newRecurring = {

            id:
                Date.now(),

            name:
                formData.name.trim(),

            category:
                formData.category,

            amount:
                Number(
                    formData.amount
                ),

            frequency:
                formData.frequency,

            nextPayment:
                formData.nextPayment,

            type:
                formData.type,

            status:
                formData.status,

        };


        const updatedRecurring = [
            ...recurring,
            newRecurring,
        ];


        saveRecurring(
            updatedRecurring
        );


        setFormData({
            name: "",
            category: "Bills & Utilities",
            amount: "",
            frequency: "Monthly",
            nextPayment: "",
            type: "expense",
            status: "Active",
        });


        setShowForm(false);

    };


    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = (id) => {

        const updatedRecurring =
            recurring.filter(
                (item) =>
                    item.id !== id
            );

        saveRecurring(
            updatedRecurring
        );

    };


    // =====================================================
    // TOGGLE STATUS
    // =====================================================

    const toggleStatus = (id) => {

        const updatedRecurring =
            recurring.map(
                (item) => {

                    if (
                        item.id !== id
                    ) {
                        return item;
                    }

                    return {
                        ...item,
                        status:
                            item.status ===
                            "Active"
                                ? "Paused"
                                : "Active",
                    };

                }
            );

        saveRecurring(
            updatedRecurring
        );

    };


    // =====================================================
    // ICON
    // =====================================================

    const getIcon = (category) => {

        if (
            category ===
            "Entertainment"
        ) {
            return "ri-netflix-fill";
        }

        if (
            category ===
            "Bills & Utilities"
        ) {
            return "ri-flashlight-line";
        }

        if (
            category ===
            "Internet"
        ) {
            return "ri-wifi-line";
        }

        if (
            category ===
            "Health & Fitness"
        ) {
            return "ri-heart-pulse-line";
        }

        if (
            category ===
            "Insurance"
        ) {
            return "ri-shield-check-line";
        }

        if (
            category ===
            "Investments"
        ) {
            return "ri-bank-line";
        }

        if (
            category ===
            "Subscriptions"
        ) {
            return "ri-cloud-line";
        }

        return "ri-refresh-line";

    };


    // =====================================================
    // ICON BACKGROUND
    // =====================================================

    const getIconStyle = (category) => {

        if (
            category ===
            "Entertainment"
        ) {
            return "bg-red-50 text-red-500";
        }

        if (
            category ===
            "Bills & Utilities"
        ) {
            return "bg-orange-50 text-orange-500";
        }

        if (
            category ===
            "Internet"
        ) {
            return "bg-blue-50 text-blue-500";
        }

        if (
            category ===
            "Health & Fitness"
        ) {
            return "bg-pink-50 text-pink-500";
        }

        if (
            category ===
            "Insurance"
        ) {
            return "bg-cyan-50 text-cyan-500";
        }

        if (
            category ===
            "Investments"
        ) {
            return "bg-indigo-50 text-indigo-500";
        }

        return "bg-purple-50 text-purple-500";

    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="
            min-h-screen
            w-full
            bg-[#f7f4ef]
        ">

            {/* NAVBAR */}

            <Navbar />


            {/* MAIN */}

            <main
                className="
                    w-full
                    lg:ml-60
                    lg:w-[calc(100%-240px)]
                "
            >

                {/* TOP */}

                <Top
                    Icon="ri-calendar-2-line"
                    Tittle="Recurring Transactions"
                    Description="Manage your automatic payments and never miss a bill."
                />


                <div className="
                    px-3
                    pb-8
                    sm:px-5
                    lg:px-6
                ">


                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div className="
                        mb-4
                        flex
                        flex-col
                        gap-3
                        sm:flex-row
                        sm:items-center
                        sm:justify-end
                    ">

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
                                bg-[#0f8b78]
                                px-5
                                py-3
                                text-sm
                                font-medium
                                text-white
                                shadow-sm
                                transition
                                hover:bg-[#0b7767]
                                sm:w-auto
                            "
                        >

                            <i className="
                                ri-add-line
                                text-lg
                            "></i>

                            Add Recurring Transaction

                        </button>

                    </div>


                    {/* =================================================
                        MAIN GRID
                    ================================================= */}

                    <div className="
                        grid
                        grid-cols-1
                        gap-4
                        xl:grid-cols-[minmax(0,1fr)_325px]
                    ">


                        {/* =================================================
                            LEFT
                        ================================================= */}

                        <div className="
                            min-w-0
                        ">


                            {/* =================================================
                                SUMMARY CARDS
                            ================================================= */}

                            <div className="
                                grid
                                grid-cols-2
                                gap-3
                                xl:grid-cols-4
                            ">


                                {/* TOTAL RECURRING */}

                                <div className="
                                    rounded-xl
                                    border
                                    border-[#e5eaf0]
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
                                            bg-[#e1f7ef]
                                            text-[#16a67a]
                                        ">

                                            <i className="
                                                ri-calendar-check-line
                                                text-xl
                                            "></i>

                                        </div>

                                        <span className="
                                            text-xs
                                            text-[#607697]
                                        ">
                                            Total Recurring
                                        </span>

                                    </div>


                                    <h2 className="
                                        mt-4
                                        text-xl
                                        font-bold
                                        text-[#17233c]
                                        sm:text-2xl
                                    ">
                                        {recurring.length}
                                    </h2>


                                    <p className="
                                        mt-2
                                        text-[10px]
                                        text-[#7185a3]
                                        sm:text-xs
                                    ">
                                        active subscriptions
                                    </p>

                                </div>


                                {/* MONTHLY AMOUNT */}

                                <div className="
                                    rounded-xl
                                    border
                                    border-[#e5eaf0]
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
                                            bg-[#e5f1ff]
                                            text-[#3988f5]
                                        ">

                                            <i className="
                                                ri-money-rupee-circle-line
                                                text-xl
                                            "></i>

                                        </div>

                                        <span className="
                                            text-xs
                                            text-[#607697]
                                        ">
                                            Monthly Amount
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
                                        {formatMoney(
                                            monthlyAmount
                                        )}
                                    </h2>


                                    <p className="
                                        mt-2
                                        text-[10px]
                                        text-[#7185a3]
                                        sm:text-xs
                                    ">
                                        estimated total
                                    </p>

                                </div>


                                {/* THIS MONTH PAID */}

                                <div className="
                                    rounded-xl
                                    border
                                    border-[#e5eaf0]
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
                                            bg-[#eee8ff]
                                            text-[#7347df]
                                        ">

                                            <i className="
                                                ri-refresh-line
                                                text-xl
                                            "></i>

                                        </div>

                                        <span className="
                                            text-xs
                                            text-[#607697]
                                        ">
                                            This Month Paid
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
                                        {formatMoney(
                                            thisMonthPaid
                                        )}
                                    </h2>


                                    <p className="
                                        mt-2
                                        text-[10px]
                                        text-[#7185a3]
                                        sm:text-xs
                                    ">
                                        recurring payments
                                    </p>

                                </div>


                                {/* UPCOMING */}

                                <div className="
                                    rounded-xl
                                    border
                                    border-[#e5eaf0]
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
                                            bg-[#fff0df]
                                            text-[#ff9f43]
                                        ">

                                            <i className="
                                                ri-time-line
                                                text-xl
                                            "></i>

                                        </div>

                                        <span className="
                                            text-xs
                                            text-[#607697]
                                        ">
                                            Upcoming
                                        </span>

                                    </div>


                                    <h2 className="
                                        mt-4
                                        text-xl
                                        font-bold
                                        text-[#17233c]
                                        sm:text-2xl
                                    ">
                                        {upcomingPayments.length}
                                    </h2>


                                    <p className="
                                        mt-2
                                        text-[10px]
                                        text-[#7185a3]
                                        sm:text-xs
                                    ">
                                        upcoming payments
                                    </p>

                                </div>

                            </div>


                            {/* =================================================
                                ALL RECURRING
                            ================================================= */}

                            <div className="
                                mt-4
                                overflow-hidden
                                rounded-xl
                                border
                                border-[#e5eaf0]
                                bg-white
                                shadow-sm
                            ">

                                <div className="
                                    p-4
                                    sm:p-5
                                ">

                                    <h2 className="
                                        text-base
                                        font-bold
                                        text-[#17233c]
                                        sm:text-lg
                                    ">
                                        All Recurring Transactions
                                    </h2>


                                    <div className="
                                        mt-4
                                        flex
                                        gap-2
                                        overflow-x-auto
                                    ">

                                        <button className="
                                            shrink-0
                                            rounded-full
                                            bg-[#123d4a]
                                            px-4
                                            py-2
                                            text-xs
                                            font-medium
                                            text-white
                                        ">
                                            All
                                        </button>

                                        <button className="
                                            shrink-0
                                            rounded-full
                                            bg-[#f3f6f9]
                                            px-4
                                            py-2
                                            text-xs
                                            text-[#607697]
                                        ">
                                            Income
                                        </button>

                                        <button className="
                                            shrink-0
                                            rounded-full
                                            bg-[#f3f6f9]
                                            px-4
                                            py-2
                                            text-xs
                                            text-[#607697]
                                        ">
                                            Expenses
                                        </button>

                                    </div>

                                </div>


                                {/* DESKTOP TABLE */}

                                <div className="
                                    hidden
                                    overflow-x-auto
                                    lg:block
                                ">

                                    <table className="
                                        w-full
                                        min-w-[850px]
                                        border-collapse
                                    ">

                                        <thead>

                                            <tr className="
                                                border-y
                                                border-[#edf1f5]
                                                text-left
                                            ">

                                                <th className="
                                                    px-5
                                                    py-3
                                                    text-[11px]
                                                    font-medium
                                                    text-[#7185a3]
                                                ">
                                                    Name
                                                </th>

                                                <th className="
                                                    px-5
                                                    py-3
                                                    text-[11px]
                                                    font-medium
                                                    text-[#7185a3]
                                                ">
                                                    Category
                                                </th>

                                                <th className="
                                                    px-5
                                                    py-3
                                                    text-[11px]
                                                    font-medium
                                                    text-[#7185a3]
                                                ">
                                                    Amount
                                                </th>

                                                <th className="
                                                    px-5
                                                    py-3
                                                    text-[11px]
                                                    font-medium
                                                    text-[#7185a3]
                                                ">
                                                    Frequency
                                                </th>

                                                <th className="
                                                    px-5
                                                    py-3
                                                    text-[11px]
                                                    font-medium
                                                    text-[#7185a3]
                                                ">
                                                    Next Payment
                                                </th>

                                                <th className="
                                                    px-5
                                                    py-3
                                                    text-[11px]
                                                    font-medium
                                                    text-[#7185a3]
                                                ">
                                                    Status
                                                </th>

                                                <th className="
                                                    px-5
                                                    py-3
                                                    text-[11px]
                                                    font-medium
                                                    text-[#7185a3]
                                                ">
                                                    Actions
                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {recurring.length === 0 ? (

                                                <tr>

                                                    <td
                                                        colSpan="7"
                                                        className="
                                                            px-5
                                                            py-12
                                                            text-center
                                                            text-sm
                                                            text-[#7185a3]
                                                        "
                                                    >
                                                        No recurring transactions yet.
                                                    </td>

                                                </tr>

                                            ) : (

                                                recurring.map(
                                                    (item) => (

                                                        <tr
                                                            key={
                                                                item.id
                                                            }
                                                            className="
                                                                border-b
                                                                border-[#f0f2f5]
                                                                last:border-0
                                                            "
                                                        >

                                                            <td className="
                                                                px-5
                                                                py-4
                                                            ">

                                                                <div className="
                                                                    flex
                                                                    items-center
                                                                    gap-3
                                                                ">

                                                                    <div
                                                                        className={`
                                                                            flex
                                                                            h-9
                                                                            w-9
                                                                            shrink-0
                                                                            items-center
                                                                            justify-center
                                                                            rounded-full
                                                                            ${getIconStyle(
                                                                                item.category
                                                                            )}
                                                                        `}
                                                                    >

                                                                        <i className={`
                                                                            ${getIcon(
                                                                                item.category
                                                                            )}
                                                                            text-lg
                                                                        `}></i>

                                                                    </div>


                                                                    <div>

                                                                        <p className="
                                                                            text-xs
                                                                            font-medium
                                                                            text-[#243b5c]
                                                                        ">
                                                                            {item.name}
                                                                        </p>

                                                                        <p className="
                                                                            mt-0.5
                                                                            text-[10px]
                                                                            text-[#7185a3]
                                                                        ">
                                                                            {item.type === "income"
                                                                                ? "Income"
                                                                                : "Expense"}
                                                                        </p>

                                                                    </div>

                                                                </div>

                                                            </td>


                                                            <td className="
                                                                px-5
                                                                py-4
                                                            ">

                                                                <span className="
                                                                    rounded-full
                                                                    bg-[#f1edff]
                                                                    px-2.5
                                                                    py-1
                                                                    text-[10px]
                                                                    text-[#7347df]
                                                                ">
                                                                    {item.category}
                                                                </span>

                                                            </td>


                                                            <td className="
                                                                px-5
                                                                py-4
                                                                text-xs
                                                                font-semibold
                                                                text-[#243b5c]
                                                            ">
                                                                {formatMoney(
                                                                    item.amount
                                                                )}
                                                            </td>


                                                            <td className="
                                                                px-5
                                                                py-4
                                                                text-xs
                                                                text-[#607697]
                                                            ">
                                                                {item.frequency}
                                                            </td>


                                                            <td className="
                                                                px-5
                                                                py-4
                                                                text-xs
                                                                text-[#607697]
                                                            ">
                                                                {formatDate(
                                                                    item.nextPayment
                                                                )}
                                                            </td>


                                                            <td className="
                                                                px-5
                                                                py-4
                                                            ">

                                                                <button
                                                                    onClick={() =>
                                                                        toggleStatus(
                                                                            item.id
                                                                        )
                                                                    }
                                                                    className={`
                                                                        rounded-full
                                                                        px-3
                                                                        py-1
                                                                        text-[10px]
                                                                        font-medium
                                                                        ${
                                                                            item.status ===
                                                                            "Active"
                                                                                ? "bg-[#e2f7ef] text-[#15966d]"
                                                                                : "bg-[#edf1f5] text-[#607697]"
                                                                        }
                                                                    `}
                                                                >
                                                                    {item.status}
                                                                </button>

                                                            </td>


                                                            <td className="
                                                                px-5
                                                                py-4
                                                            ">

                                                                <button
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            item.id
                                                                        )
                                                                    }
                                                                    className="
                                                                        text-[#7185a3]
                                                                        transition
                                                                        hover:text-red-500
                                                                    "
                                                                >

                                                                    <i className="
                                                                        ri-more-2-fill
                                                                        text-lg
                                                                    "></i>

                                                                </button>

                                                            </td>

                                                        </tr>

                                                    )
                                                )

                                            )}

                                        </tbody>

                                    </table>

                                </div>


                                {/* MOBILE */}

                                <div className="
                                    divide-y
                                    divide-[#f0f2f5]
                                    lg:hidden
                                ">

                                    {recurring.length === 0 ? (

                                        <div className="
                                            px-4
                                            py-12
                                            text-center
                                            text-sm
                                            text-[#7185a3]
                                        ">
                                            No recurring transactions yet.
                                        </div>

                                    ) : (

                                        recurring.map(
                                            (item) => (

                                                <div
                                                    key={
                                                        item.id
                                                    }
                                                    className="
                                                        p-4
                                                    "
                                                >

                                                    <div className="
                                                        flex
                                                        items-start
                                                        justify-between
                                                        gap-3
                                                    ">

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
                                                                    ${getIconStyle(
                                                                        item.category
                                                                    )}
                                                                `}
                                                            >

                                                                <i className={`
                                                                    ${getIcon(
                                                                        item.category
                                                                    )}
                                                                    text-lg
                                                                `}></i>

                                                            </div>


                                                            <div className="
                                                                min-w-0
                                                            ">

                                                                <p className="
                                                                    truncate
                                                                    text-sm
                                                                    font-medium
                                                                    text-[#243b5c]
                                                                ">
                                                                    {item.name}
                                                                </p>

                                                                <p className="
                                                                    mt-1
                                                                    truncate
                                                                    text-[10px]
                                                                    text-[#7185a3]
                                                                ">
                                                                    {item.category}
                                                                </p>

                                                            </div>

                                                        </div>


                                                        <div className="
                                                            shrink-0
                                                            text-right
                                                        ">

                                                            <p className="
                                                                text-sm
                                                                font-semibold
                                                                text-[#243b5c]
                                                            ">
                                                                {formatMoney(
                                                                    item.amount
                                                                )}
                                                            </p>

                                                            <p className="
                                                                mt-1
                                                                text-[10px]
                                                                text-[#7185a3]
                                                            ">
                                                                {item.frequency}
                                                            </p>

                                                        </div>

                                                    </div>


                                                    <div className="
                                                        mt-4
                                                        flex
                                                        items-center
                                                        justify-between
                                                        gap-3
                                                    ">

                                                        <div>

                                                            <p className="
                                                                text-[10px]
                                                                text-[#7185a3]
                                                            ">
                                                                Next Payment
                                                            </p>

                                                            <p className="
                                                                mt-1
                                                                text-xs
                                                                font-medium
                                                                text-[#405578]
                                                            ">
                                                                {formatDate(
                                                                    item.nextPayment
                                                                )}
                                                            </p>

                                                        </div>


                                                        <div className="
                                                            flex
                                                            items-center
                                                            gap-2
                                                        ">

                                                            <button
                                                                onClick={() =>
                                                                    toggleStatus(
                                                                        item.id
                                                                    )
                                                                }
                                                                className={`
                                                                    rounded-full
                                                                    px-3
                                                                    py-1
                                                                    text-[10px]
                                                                    font-medium
                                                                    ${
                                                                        item.status ===
                                                                        "Active"
                                                                            ? "bg-[#e2f7ef] text-[#15966d]"
                                                                            : "bg-[#edf1f5] text-[#607697]"
                                                                    }
                                                                `}
                                                            >
                                                                {item.status}
                                                            </button>


                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="
                                                                    flex
                                                                    h-8
                                                                    w-8
                                                                    items-center
                                                                    justify-center
                                                                    rounded-full
                                                                    bg-red-50
                                                                    text-red-500
                                                                "
                                                            >

                                                                <i className="
                                                                    ri-delete-bin-line
                                                                "></i>

                                                            </button>

                                                        </div>

                                                    </div>

                                                </div>

                                            )
                                        )

                                    )}

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            RIGHT SIDEBAR
                        ================================================= */}

                        <aside className="
                            min-w-0
                        ">

                            {/* UPCOMING PAYMENTS */}

                            <div className="
                                rounded-xl
                                border
                                border-[#e5eaf0]
                                bg-white
                                p-4
                                shadow-sm
                                sm:p-5
                            ">

                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                ">

                                    <h2 className="
                                        text-base
                                        font-bold
                                        text-[#17233c]
                                    ">
                                        Upcoming Payments
                                    </h2>

                                </div>


                                <div className="
                                    mt-4
                                    divide-y
                                    divide-[#edf1f5]
                                ">

                                    {upcomingPayments.length === 0 ? (

                                        <p className="
                                            py-8
                                            text-center
                                            text-xs
                                            text-[#7185a3]
                                        ">
                                            No upcoming payments.
                                        </p>

                                    ) : (

                                        upcomingPayments.map(
                                            (item) => (

                                                <div
                                                    key={
                                                        item.id
                                                    }
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-3
                                                        py-3
                                                    "
                                                >

                                                    <div
                                                        className={`
                                                            flex
                                                            h-10
                                                            w-10
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-full
                                                            ${getIconStyle(
                                                                item.category
                                                            )}
                                                        `}
                                                    >

                                                        <i className={`
                                                            ${getIcon(
                                                                item.category
                                                            )}
                                                            text-lg
                                                        `}></i>

                                                    </div>


                                                    <div className="
                                                        min-w-0
                                                        flex-1
                                                    ">

                                                        <p className="
                                                            truncate
                                                            text-xs
                                                            font-medium
                                                            text-[#243b5c]
                                                        ">
                                                            {item.name}
                                                        </p>

                                                        <p className="
                                                            mt-1
                                                            text-[10px]
                                                            text-[#7185a3]
                                                        ">
                                                            {formatDate(
                                                                item.nextPayment
                                                            )}
                                                        </p>

                                                    </div>


                                                    <div className="
                                                        shrink-0
                                                        text-right
                                                    ">

                                                        <p className="
                                                            text-xs
                                                            font-semibold
                                                            text-[#243b5c]
                                                        ">
                                                            {formatMoney(
                                                                item.amount
                                                            )}
                                                        </p>

                                                    </div>

                                                </div>

                                            )
                                        )

                                    )}

                                </div>

                            </div>

                        </aside>

                    </div>

                </div>


                {/* =================================================
                    ADD FORM MODAL
                ================================================= */}

                {showForm && (

                    <div className="
                        fixed
                        inset-0
                        z-[100]
                        flex
                        items-center
                        justify-center
                        bg-black/40
                        p-4
                    ">

                        <div className="
                            max-h-[90vh]
                            w-full
                            max-w-lg
                            overflow-y-auto
                            rounded-2xl
                            bg-white
                            p-5
                            shadow-xl
                            sm:p-6
                        ">

                            <div className="
                                flex
                                items-center
                                justify-between
                                gap-3
                            ">

                                <div>

                                    <h2 className="
                                        text-lg
                                        font-bold
                                        text-[#17233c]
                                    ">
                                        Add Recurring Transaction
                                    </h2>

                                    <p className="
                                        mt-1
                                        text-xs
                                        text-[#7185a3]
                                    ">
                                        Add an automatic payment to Finora.
                                    </p>

                                </div>


                                <button
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
                                        bg-[#f3f5f7]
                                        text-[#607697]
                                    "
                                >

                                    <i className="
                                        ri-close-line
                                        text-lg
                                    "></i>

                                </button>

                            </div>


                            <form
                                onSubmit={
                                    handleSubmit
                                }
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
                                        text-[#405578]
                                    ">
                                        Name
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            formData.name
                                        }
                                        onChange={(event) =>
                                            setFormData({
                                                ...formData,
                                                name:
                                                    event.target
                                                        .value,
                                            })
                                        }
                                        placeholder="Netflix"
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-[#dfe5eb]
                                            bg-white
                                            px-4
                                            py-3
                                            text-sm
                                            text-[#17233c]
                                            outline-none
                                            focus:border-[#896b57]
                                        "
                                    />

                                </div>


                                {/* CATEGORY */}

                                <div>

                                    <label className="
                                        mb-1.5
                                        block
                                        text-xs
                                        font-medium
                                        text-[#405578]
                                    ">
                                        Category
                                    </label>

                                    <select
                                        value={
                                            formData.category
                                        }
                                        onChange={(event) =>
                                            setFormData({
                                                ...formData,
                                                category:
                                                    event.target
                                                        .value,
                                            })
                                        }
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-[#dfe5eb]
                                            bg-white
                                            px-4
                                            py-3
                                            text-sm
                                            text-[#17233c]
                                            outline-none
                                            focus:border-[#896b57]
                                        "
                                    >

                                        <option>
                                            Bills & Utilities
                                        </option>

                                        <option>
                                            Entertainment
                                        </option>

                                        <option>
                                            Health & Fitness
                                        </option>

                                        <option>
                                            Insurance
                                        </option>

                                        <option>
                                            Investments
                                        </option>

                                        <option>
                                            Subscriptions
                                        </option>

                                        <option>
                                            Internet
                                        </option>

                                        <option>
                                            Other
                                        </option>

                                    </select>

                                </div>


                                {/* AMOUNT */}

                                <div>

                                    <label className="
                                        mb-1.5
                                        block
                                        text-xs
                                        font-medium
                                        text-[#405578]
                                    ">
                                        Amount
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        value={
                                            formData.amount
                                        }
                                        onChange={(event) =>
                                            setFormData({
                                                ...formData,
                                                amount:
                                                    event.target
                                                        .value,
                                            })
                                        }
                                        placeholder="2499"
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-[#dfe5eb]
                                            bg-white
                                            px-4
                                            py-3
                                            text-sm
                                            text-[#17233c]
                                            outline-none
                                            focus:border-[#896b57]
                                        "
                                    />

                                </div>


                                {/* FREQUENCY */}

                                <div>

                                    <label className="
                                        mb-1.5
                                        block
                                        text-xs
                                        font-medium
                                        text-[#405578]
                                    ">
                                        Frequency
                                    </label>

                                    <select
                                        value={
                                            formData.frequency
                                        }
                                        onChange={(event) =>
                                            setFormData({
                                                ...formData,
                                                frequency:
                                                    event.target
                                                        .value,
                                            })
                                        }
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-[#dfe5eb]
                                            bg-white
                                            px-4
                                            py-3
                                            text-sm
                                            text-[#17233c]
                                            outline-none
                                            focus:border-[#896b57]
                                        "
                                    >

                                        <option>
                                            Monthly
                                        </option>

                                        <option>
                                            Weekly
                                        </option>

                                        <option>
                                            Yearly
                                        </option>

                                    </select>

                                </div>


                                {/* NEXT PAYMENT */}

                                <div>

                                    <label className="
                                        mb-1.5
                                        block
                                        text-xs
                                        font-medium
                                        text-[#405578]
                                    ">
                                        Next Payment
                                    </label>

                                    <input
                                        type="date"
                                        value={
                                            formData.nextPayment
                                        }
                                        onChange={(event) =>
                                            setFormData({
                                                ...formData,
                                                nextPayment:
                                                    event.target
                                                        .value,
                                            })
                                        }
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-[#dfe5eb]
                                            bg-white
                                            px-4
                                            py-3
                                            text-sm
                                            text-[#17233c]
                                            outline-none
                                            focus:border-[#896b57]
                                        "
                                    />

                                </div>


                                {/* TYPE */}

                                <div>

                                    <label className="
                                        mb-1.5
                                        block
                                        text-xs
                                        font-medium
                                        text-[#405578]
                                    ">
                                        Type
                                    </label>

                                    <select
                                        value={
                                            formData.type
                                        }
                                        onChange={(event) =>
                                            setFormData({
                                                ...formData,
                                                type:
                                                    event.target
                                                        .value,
                                            })
                                        }
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-[#dfe5eb]
                                            bg-white
                                            px-4
                                            py-3
                                            text-sm
                                            text-[#17233c]
                                            outline-none
                                            focus:border-[#896b57]
                                        "
                                    >

                                        <option value="expense">
                                            Expense
                                        </option>

                                        <option value="income">
                                            Income
                                        </option>

                                    </select>

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
                                            rounded-xl
                                            border
                                            border-[#dfe5eb]
                                            px-5
                                            py-3
                                            text-sm
                                            font-medium
                                            text-[#607697]
                                        "
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        type="submit"
                                        className="
                                            rounded-xl
                                            bg-[#0f8b78]
                                            px-5
                                            py-3
                                            text-sm
                                            font-medium
                                            text-white
                                        "
                                    >
                                        Add Recurring
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )}

            </main>

        </div>

    );

}

export default Recurring;