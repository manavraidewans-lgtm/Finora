import { useEffect, useState } from "react";

function Card({
    Icon = "ri-wallet-3-line",
    Tittle = "Total Balance",
    Amount = "₹42,360",
    value = "+16%",
    Description = "from last month",
}) {

    // ================= DEFAULT VALUES =================

    const defaultValues = {
        "Total Balance": {
            amount: 42360,
            value: "+16%",
        },

        "Total Income": {
            amount: 70000,
            value: "+8%",
        },

        "Total Expenses": {
            amount: 32450,
            value: "-5%",
        },

        "Savings": {
            amount: 37550,
            value: "+15%",
        },
    };


    // ================= STATE =================

    const [cardData, setCardData] = useState({
        amount:
            defaultValues[Tittle]?.amount ??
            Number(String(Amount).replace(/[₹,]/g, "")),

        value:
            defaultValues[Tittle]?.value ??
            value,
    });


    // ================= LOAD TRANSACTIONS =================

    useEffect(() => {

        const loadTransactions = () => {

            const saved =
                localStorage.getItem("finoraTransactions");


            // ================= NO TRANSACTIONS =================

            if (!saved) {

                if (defaultValues[Tittle]) {

                    setCardData({
                        amount:
                            defaultValues[Tittle].amount,

                        value:
                            defaultValues[Tittle].value,
                    });

                }

                return;
            }


            try {

                const transactions =
                    JSON.parse(saved);


                if (
                    !Array.isArray(transactions) ||
                    transactions.length === 0
                ) {

                    if (defaultValues[Tittle]) {

                        setCardData({
                            amount:
                                defaultValues[Tittle].amount,

                            value:
                                defaultValues[Tittle].value,
                        });

                    }

                    return;
                }


                // ================= CALCULATE =================

                let totalIncome = 0;
                let totalExpenses = 0;


                transactions.forEach(
                    (transaction) => {

                        const amount =
                            Number(
                                transaction.amount
                            ) || 0;


                        const type =
                            String(
                                transaction.type || ""
                            ).toLowerCase();


                        if (type === "income") {

                            totalIncome += amount;

                        }


                        if (type === "expense") {

                            totalExpenses += amount;

                        }

                    }
                );


                // ================= VALUES =================

                const balance =
                    totalIncome - totalExpenses;


                const savings =
                    totalIncome - totalExpenses;


                // ================= SELECT CARD =================

                let amount = 0;
                let percentage = 0;


                if (Tittle === "Total Balance") {

                    amount = balance;

                    if (totalIncome > 0) {

                        percentage =
                            (
                                (
                                    balance /
                                    totalIncome
                                ) * 100
                            ).toFixed(0);

                    }

                }


                if (Tittle === "Total Income") {

                    amount = totalIncome;

                    percentage = 8;

                }


                if (Tittle === "Total Expenses") {

                    amount = totalExpenses;

                    if (totalIncome > 0) {

                        percentage =
                            (
                                (
                                    totalExpenses /
                                    totalIncome
                                ) * 100
                            ).toFixed(0);

                    }

                }


                if (Tittle === "Savings") {

                    amount = savings;

                    if (totalIncome > 0) {

                        percentage =
                            (
                                (
                                    savings /
                                    totalIncome
                                ) * 100
                            ).toFixed(0);

                    }

                }


                // ================= PROFIT / LOSS =================

                let formattedValue;


                if (
                    Tittle === "Total Expenses"
                ) {

                    formattedValue =
                        totalExpenses > 0
                            ? `-${percentage}%`
                            : "0%";

                } else {

                    formattedValue =
                        amount >= 0
                            ? `+${percentage}%`
                            : `${percentage}%`;

                }


                setCardData({
                    amount,
                    value: formattedValue,
                });

            } catch (error) {

                console.error(
                    "Transaction loading error:",
                    error
                );

            }

        };


        loadTransactions();


        // ================= LISTEN FOR CHANGES =================

        window.addEventListener(
            "storage",
            loadTransactions
        );


        return () => {

            window.removeEventListener(
                "storage",
                loadTransactions
            );

        };

    }, [Tittle]);


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


    // ================= PROFIT / LOSS =================

    const isProfit =
        String(cardData.value).startsWith("+");


    // ================= ICON STYLE =================

    let iconBg = "bg-[#f3eee9]";
    let iconColor = "text-[#896b57]";


    if (Tittle === "Total Income") {

        iconBg = "bg-green-50";
        iconColor = "text-green-500";

    }


    if (Tittle === "Total Expenses") {

        iconBg = "bg-red-50";
        iconColor = "text-red-500";

    }


    if (Tittle === "Savings") {

        iconBg = "bg-purple-50";
        iconColor = "text-purple-500";

    }


    return (

        <div className="
            flex
            min-w-0
            w-full
            flex-col
            rounded-2xl
            border
            border-[#e8e8e8]
            bg-white
            p-3
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-md

            sm:p-4
            md:p-4
            lg:p-5
        ">

            {/* ================= TOP ================= */}

            <div className="
                flex
                min-w-0
                items-center
                gap-2

                sm:gap-3
            ">

                {/* ICON */}

                <div className={`
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    text-lg

                    sm:h-10
                    sm:w-10
                    sm:text-xl

                    md:h-11
                    md:w-11

                    ${iconBg}
                    ${iconColor}
                `}>

                    <i className={Icon}></i>

                </div>


                {/* TITLE */}

                <h2 className="
                    min-w-0
                    truncate
                    text-xs
                    font-medium
                    text-[#667085]

                    sm:text-sm
                    md:text-base
                ">

                    {Tittle}

                </h2>

            </div>


            {/* ================= CONTENT ================= */}

            <div className="
                mt-4
                min-w-0

                sm:mt-5
            ">

                {/* ================= AMOUNT ================= */}

                <h1 className="
                    truncate
                    text-xl
                    font-bold
                    tracking-tight
                    text-[#111827]

                    sm:text-2xl
                    md:text-3xl
                ">

                    {formatMoney(cardData.amount)}

                </h1>


                {/* ================= PROFIT / LOSS ================= */}

                <div className={`
                    mt-2
                    flex
                    min-w-0
                    items-center
                    gap-1
                    whitespace-nowrap
                    text-[10px]
                    font-medium

                    sm:text-xs
                    md:text-sm

                    ${
                        isProfit
                            ? "text-emerald-500"
                            : "text-red-500"
                    }
                `}>

                    <i
                        className={
                            isProfit
                                ? "ri-arrow-up-line shrink-0 text-xs sm:text-sm"
                                : "ri-arrow-down-line shrink-0 text-xs sm:text-sm"
                        }
                    ></i>


                    <span className="shrink-0">

                        {cardData.value}

                    </span>


                    <span className="
                        truncate
                        text-[#8b95a5]
                    ">

                        {Description}

                    </span>

                </div>

            </div>

        </div>

    );

}

export default Card;