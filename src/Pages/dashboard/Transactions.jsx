import { useEffect, useState } from "react";
import Navbar from "../../Components/Dashboard/Navbar.jsx";
import Top from "../../Components/Dashboard/Top.jsx";
import Card from "../../Components/Dashboard/Card.jsx";

function Transactions() {

    // ================= TRANSACTIONS =================

    const [transactions, setTransactions] = useState(() => {

        const saved =
            localStorage.getItem("finoraTransactions");

        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (error) {
                console.error(
                    "Transactions loading error:",
                    error
                );
            }
        }

        return [];
    });


    // ================= FORM =================

    const [formData, setFormData] = useState({
        type: "expense",
        description: "",
        category: "Food & Dining",
        amount: "",
        date: new Date()
            .toISOString()
            .split("T")[0],
    });


    // ================= CALCULATE CARDS =================

    const totalIncome = transactions
        .filter(
            (transaction) =>
                transaction.type?.toLowerCase() === "income"
        )
        .reduce(
            (total, transaction) =>
                total + Number(transaction.amount || 0),
            0
        );


    const totalExpenses = transactions
        .filter(
            (transaction) =>
                transaction.type?.toLowerCase() === "expense"
        )
        .reduce(
            (total, transaction) =>
                total + Number(transaction.amount || 0),
            0
        );


    const totalBalance =
        totalIncome - totalExpenses;


    const savings = totalBalance;


    // ================= FORMAT MONEY =================

    const formatMoney = (amount) => {

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);

    };


    // ================= SAVE TRANSACTIONS =================

    useEffect(() => {

        localStorage.setItem(
            "finoraTransactions",
            JSON.stringify(transactions)
        );

    }, [transactions]);


    // ================= SYNC =================

    useEffect(() => {

        const loadTransactions = () => {

            const saved =
                localStorage.getItem(
                    "finoraTransactions"
                );

            if (saved) {

                try {

                    setTransactions(
                        JSON.parse(saved)
                    );

                } catch (error) {

                    console.error(
                        "Transaction sync error:",
                        error
                    );

                }

            } else {

                setTransactions([]);

            }

        };


        window.addEventListener(
            "transactionsUpdated",
            loadTransactions
        );


        window.addEventListener(
            "storage",
            loadTransactions
        );


        return () => {

            window.removeEventListener(
                "transactionsUpdated",
                loadTransactions
            );

            window.removeEventListener(
                "storage",
                loadTransactions
            );

        };

    }, []);


    // ================= INPUT =================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    // ================= ADD TRANSACTION =================

    const handleSubmit = (e) => {

        e.preventDefault();

        if (
            !formData.description ||
            !formData.amount ||
            !formData.date
        ) {
            return;
        }


        const newTransaction = {
            id: Date.now(),
            type: formData.type,
            description: formData.description,
            category: formData.category,
            amount: Number(formData.amount),
            date: formData.date,
        };


        const updatedTransactions = [
            newTransaction,
            ...transactions,
        ];


        setTransactions(
            updatedTransactions
        );


        localStorage.setItem(
            "finoraTransactions",
            JSON.stringify(updatedTransactions)
        );


        window.dispatchEvent(
            new Event("transactionsUpdated")
        );


        setFormData({
            type: "expense",
            description: "",
            category: "Food & Dining",
            amount: "",
            date: new Date()
                .toISOString()
                .split("T")[0],
        });

    };


    // ================= DELETE =================

    const handleDelete = (id) => {

        const updatedTransactions =
            transactions.filter(
                (transaction) =>
                    transaction.id !== id
            );


        setTransactions(
            updatedTransactions
        );


        localStorage.setItem(
            "finoraTransactions",
            JSON.stringify(updatedTransactions)
        );


        window.dispatchEvent(
            new Event("transactionsUpdated")
        );

    };


    return (

        <div className="
            min-h-screen
            w-full
            bg-[#f7f4ef]
        ">

            <Navbar />


            <main
                className="
                    w-full
                    lg:ml-[240px]
                    lg:w-[calc(100%-240px)]
                "
            >

                <Top
                    Icon="ri-arrow-left-right-fill"
                    Tittle="Transactions"
                    Description="Track your income and expenses, stay in control of your money"
                />


                <div className="
                    w-full
                    p-4
                    sm:p-5
                    md:p-6
                    lg:p-8
                ">


                    {/* ================= 4 CARDS ================= */}

                    <div className="
                        grid
                        w-full
                        grid-cols-2
                        gap-3

                        md:grid-cols-4
                        md:gap-4
                    ">

                        <Card
                            Icon="ri-wallet-3-line"
                            Tittle="Total Balance"
                            Amount={formatMoney(
                                totalBalance
                            )}
                            value=""
                            Description="current balance"
                        />


                        <Card
                            Icon="ri-arrow-up-line"
                            Tittle="Total Income"
                            Amount={formatMoney(
                                totalIncome
                            )}
                            value=""
                            Description="total income"
                        />


                        <Card
                            Icon="ri-arrow-down-line"
                            Tittle="Total Expenses"
                            Amount={formatMoney(
                                totalExpenses
                            )}
                            value=""
                            Description="total expenses"
                        />


                        <Card
                            Icon="ri-piggy-bank-line"
                            Tittle="Savings"
                            Amount={formatMoney(
                                savings
                            )}
                            value=""
                            Description="available savings"
                        />

                    </div>


                    {/* ================= ADD TRANSACTION ================= */}

                    <div className="
                        mt-5
                        w-full
                        rounded-2xl
                        border
                        border-[#e8e8e8]
                        bg-white
                        p-4
                        shadow-sm
                        sm:p-5
                        md:p-6
                    ">

                        <div className="
                            mb-5
                            flex
                            items-center
                            gap-3
                        ">

                            <div className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                bg-[#f3eee9]
                                text-[#896b57]
                            ">
                                <i className="
                                    ri-add-line
                                    text-xl
                                "></i>
                            </div>


                            <div>

                                <h2 className="
                                    text-lg
                                    font-semibold
                                    text-[#111827]
                                ">
                                    Add Transaction
                                </h2>

                                <p className="
                                    text-sm
                                    text-[#8b95a5]
                                ">
                                    Record your income or expense
                                </p>

                            </div>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                            className="
                                grid
                                grid-cols-1
                                gap-4
                                md:grid-cols-2
                                lg:grid-cols-5
                            "
                        >

                            {/* TYPE */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-[#4b4d4d]
                                ">
                                    Type
                                </label>

                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        border
                                        border-[#ded7d3]
                                        bg-[#faf9f7]
                                        px-3
                                        text-sm
                                        outline-none
                                        focus:border-[#a38671]
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


                            {/* DESCRIPTION */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-[#4b4d4d]
                                ">
                                    Description
                                </label>

                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="e.g. Starbucks"
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        border
                                        border-[#ded7d3]
                                        bg-[#faf9f7]
                                        px-3
                                        text-sm
                                        outline-none
                                        focus:border-[#a38671]
                                    "
                                />

                            </div>


                            {/* CATEGORY */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-[#4b4d4d]
                                ">
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        border
                                        border-[#ded7d3]
                                        bg-[#faf9f7]
                                        px-3
                                        text-sm
                                        outline-none
                                        focus:border-[#a38671]
                                    "
                                >

                                    <option>
                                        Food & Dining
                                    </option>

                                    <option>
                                        Travel
                                    </option>

                                    <option>
                                        Shopping
                                    </option>

                                    <option>
                                        Bills & Utilities
                                    </option>

                                    <option>
                                        Entertainment
                                    </option>

                                    <option>
                                        Health
                                    </option>

                                    <option>
                                        Education
                                    </option>

                                    <option>
                                        Others
                                    </option>

                                </select>

                            </div>


                            {/* AMOUNT */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-[#4b4d4d]
                                ">
                                    Amount
                                </label>

                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    placeholder="₹ 0"
                                    min="0"
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        border
                                        border-[#ded7d3]
                                        bg-[#faf9f7]
                                        px-3
                                        text-sm
                                        outline-none
                                        focus:border-[#a38671]
                                    "
                                />

                            </div>


                            {/* DATE */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-[#4b4d4d]
                                ">
                                    Date
                                </label>

                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        border
                                        border-[#ded7d3]
                                        bg-[#faf9f7]
                                        px-3
                                        text-sm
                                        outline-none
                                        focus:border-[#a38671]
                                    "
                                />

                            </div>


                            {/* BUTTON */}

                            <div className="
                                md:col-span-2
                                lg:col-span-5
                            ">

                                <button
                                    type="submit"
                                    className="
                                        flex
                                        h-11
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        bg-[#967056]
                                        px-5
                                        text-sm
                                        font-medium
                                        text-white
                                        transition
                                        duration-200
                                        hover:bg-[#89634d]
                                    "
                                >

                                    <i className="
                                        ri-add-line
                                    "></i>

                                    Add Transaction

                                </button>

                            </div>

                        </form>

                    </div>


                    {/* ================= ALL TRANSACTIONS ================= */}

                    <div className="
                        mt-5
                        w-full
                        overflow-hidden
                        rounded-2xl
                        border
                        border-[#e8e8e8]
                        bg-white
                        shadow-sm
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                            border-b
                            border-[#eeeeee]
                            p-4
                            sm:p-5
                        ">

                            <h2 className="
                                text-lg
                                font-semibold
                                text-[#111827]
                            ">
                                All Transactions
                            </h2>

                            <span className="
                                text-sm
                                text-[#8b95a5]
                            ">
                                {transactions.length} transactions
                            </span>

                        </div>


                        {/* DESKTOP */}

                        <div className="
                            hidden
                            overflow-x-auto
                            md:block
                        ">

                            <table className="w-full">

                                <thead>

                                    <tr className="
                                        border-b
                                        border-[#eeeeee]
                                        text-left
                                        text-xs
                                        font-medium
                                        text-[#8b95a5]
                                    ">

                                        <th className="px-5 py-4">
                                            Date
                                        </th>

                                        <th className="px-5 py-4">
                                            Description
                                        </th>

                                        <th className="px-5 py-4">
                                            Category
                                        </th>

                                        <th className="px-5 py-4">
                                            Type
                                        </th>

                                        <th className="
                                            px-5
                                            py-4
                                            text-right
                                        ">
                                            Amount
                                        </th>

                                        <th className="px-5 py-4">
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {transactions.map(
                                        (transaction) => (

                                            <tr
                                                key={transaction.id}
                                                className="
                                                    border-b
                                                    border-[#f1f1f1]
                                                    last:border-0
                                                "
                                            >

                                                <td className="
                                                    px-5
                                                    py-4
                                                    text-sm
                                                    text-[#667085]
                                                ">
                                                    {transaction.date}
                                                </td>


                                                <td className="
                                                    px-5
                                                    py-4
                                                    text-sm
                                                    font-medium
                                                    text-[#1f2937]
                                                ">
                                                    {transaction.description}
                                                </td>


                                                <td className="
                                                    px-5
                                                    py-4
                                                    text-sm
                                                    text-[#667085]
                                                ">
                                                    {transaction.category}
                                                </td>


                                                <td className="
                                                    px-5
                                                    py-4
                                                    text-sm
                                                    capitalize
                                                ">

                                                    <span
                                                        className={
                                                            transaction.type === "income"
                                                                ? "text-green-500"
                                                                : "text-red-500"
                                                        }
                                                    >
                                                        {transaction.type}
                                                    </span>

                                                </td>


                                                <td
                                                    className={`
                                                        px-5
                                                        py-4
                                                        text-right
                                                        text-sm
                                                        font-semibold
                                                        ${
                                                            transaction.type === "income"
                                                                ? "text-green-500"
                                                                : "text-red-500"
                                                        }
                                                    `}
                                                >

                                                    {transaction.type === "income"
                                                        ? "+"
                                                        : "-"
                                                    }

                                                    ₹
                                                    {Number(
                                                        transaction.amount
                                                    ).toLocaleString("en-IN")}

                                                </td>


                                                <td className="px-5 py-4">

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                transaction.id
                                                            )
                                                        }
                                                        className="
                                                            text-[#9ca3af]
                                                            transition
                                                            hover:text-red-500
                                                        "
                                                    >
                                                        <i className="
                                                            ri-delete-bin-line
                                                        "></i>
                                                    </button>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>


                        {/* MOBILE */}

                        <div className="md:hidden">

                            {transactions.map(
                                (transaction) => (

                                    <div
                                        key={transaction.id}
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                            border-b
                                            border-[#f1f1f1]
                                            p-4
                                            last:border-0
                                        "
                                    >

                                        <div className="
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-[#f3eee9]
                                            text-[#896b57]
                                        ">

                                            <i
                                                className={
                                                    transaction.type === "income"
                                                        ? "ri-arrow-down-line"
                                                        : "ri-shopping-bag-3-line"
                                                }
                                            ></i>

                                        </div>


                                        <div className="
                                            min-w-0
                                            flex-1
                                        ">

                                            <h3 className="
                                                truncate
                                                text-sm
                                                font-semibold
                                                text-[#1f2937]
                                            ">
                                                {transaction.description}
                                            </h3>

                                            <p className="
                                                mt-1
                                                truncate
                                                text-xs
                                                text-[#8b95a5]
                                            ">
                                                {transaction.category}
                                                {" • "}
                                                {transaction.date}
                                            </p>

                                        </div>


                                        <div className="text-right">

                                            <p
                                                className={
                                                    transaction.type === "income"
                                                        ? "text-sm font-semibold text-green-500"
                                                        : "text-sm font-semibold text-red-500"
                                                }
                                            >

                                                {transaction.type === "income"
                                                    ? "+"
                                                    : "-"
                                                }

                                                ₹
                                                {Number(
                                                    transaction.amount
                                                ).toLocaleString("en-IN")}

                                            </p>


                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        transaction.id
                                                    )
                                                }
                                                className="
                                                    mt-1
                                                    text-xs
                                                    text-[#9ca3af]
                                                    hover:text-red-500
                                                "
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Transactions;