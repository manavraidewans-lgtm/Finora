import { useEffect, useState } from "react";

import Navbar from "../../Components/Dashboard/Navbar.jsx";
import Top from "../../Components/Dashboard/Top.jsx";
import Card from "../../Components/Dashboard/Card.jsx";
import TransactionForm from "../../Components/Dashboard/Transaction/TransactionForm.jsx";
import TransactionTable from "../../Components/Dashboard/Transaction/TransactionTable.jsx";
import TransactionMobile from "../../Components/Dashboard/Transaction/TransactionMobile.jsx";

function Transactions() {

    {/*   TRANSACTIONS   */}

    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem("finoraTransactions");

        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (error) {
                console.error("Transactions loading error:", error);
            }
        }

        return [];
    });


    {/*   Form   */}

    const [formData, setFormData] = useState({
        type: "expense",
        description: "",
        category: "Food & Dining",
        amount: "",
        date: new Date().toISOString().split("T")[0],
    });


    {/*   Total   */}

    const totalIncome = transactions
        .filter((transaction) => transaction.type?.toLowerCase() === "income")
        .reduce((total, transaction) => total + Number(transaction.amount || 0), 0);

    const totalExpenses = transactions
        .filter((transaction) => transaction.type?.toLowerCase() === "expense")
        .reduce((total, transaction) => total + Number(transaction.amount || 0), 0);

    const totalBalance = totalIncome - totalExpenses;
    const savings = totalBalance;


    {/*   Format Money   */}

    const formatMoney = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);


    {/*   Save  */}

    useEffect(() => {
        localStorage.setItem(
            "finoraTransactions",
            JSON.stringify(transactions)
        );
    }, [transactions]);


    {/*   Sync  */}

    useEffect(() => {
        const loadTransactions = () => {
            const saved = localStorage.getItem("finoraTransactions");

            if (saved) {
                try {
                    setTransactions(JSON.parse(saved));
                } catch (error) {
                    console.error("Transaction sync error:", error);
                }
            } else {
                setTransactions([]);
            }
        };

        window.addEventListener("transactionsUpdated", loadTransactions);
        window.addEventListener("storage", loadTransactions);

        return () => {
            window.removeEventListener("transactionsUpdated", loadTransactions);
            window.removeEventListener("storage", loadTransactions);
        };
    }, []);


    {/*   Input  */}

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    {/*  Add Transactions   */}

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.description || !formData.amount || !formData.date) {
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

        const updatedTransactions = [newTransaction, ...transactions];

        setTransactions(updatedTransactions);

        localStorage.setItem(
            "finoraTransactions",
            JSON.stringify(updatedTransactions)
        );

        window.dispatchEvent(new Event("transactionsUpdated"));

        setFormData({
            type: "expense",
            description: "",
            category: "Food & Dining",
            amount: "",
            date: new Date().toISOString().split("T")[0],
        });
    };


    {/*   Delete   */}

    const handleDelete = (id) => {
        const updatedTransactions = transactions.filter(
            (transaction) => transaction.id !== id
        );

        setTransactions(updatedTransactions);

        localStorage.setItem(
            "finoraTransactions",
            JSON.stringify(updatedTransactions)
        );

        window.dispatchEvent(new Event("transactionsUpdated"));
    };


    {/*   UI (User Interface)   */}

    return (
        <div className="min-h-screen w-full bg-[#f7f4ef]">

            <Navbar />

            <main className="w-full lg:ml-60 lg:w-[calc(100%-240px)]">

                {/* TOP */}
                <Top
                    Icon="ri-arrow-left-right-fill"
                    Tittle="Transactions"
                    Description="Track your income and expenses, stay in control of your money"
                />

                <div className="w-full p-4 sm:p-5 md:p-6 lg:p-8">

                    {/* CARDS */}
                    <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">

                        <Card
                            Icon="ri-wallet-3-line"
                            Tittle="Total Balance"
                            Amount={formatMoney(totalBalance)}
                            value=""
                            Description="current balance"
                        />

                        <Card
                            Icon="ri-arrow-up-line"
                            Tittle="Total Income"
                            Amount={formatMoney(totalIncome)}
                            value=""
                            Description="total income"
                        />

                        <Card
                            Icon="ri-arrow-down-line"
                            Tittle="Total Expenses"
                            Amount={formatMoney(totalExpenses)}
                            value=""
                            Description="total expenses"
                        />

                        <Card
                            Icon="ri-piggy-bank-line"
                            Tittle="Savings"
                            Amount={formatMoney(savings)}
                            value=""
                            Description="available savings"
                        />

                    </div>


                    {/* FORM */}
                    <TransactionForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />


                    {/* ALL TRANSACTIONS */}
                    <div className="mt-5 w-full overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">

                        {/* HEADER */}
                        <div className="flex items-center justify-between border-b border-[#eeeeee] p-4 sm:p-5">

                            <h2 className="text-lg font-semibold text-[#111827]">
                                All Transactions
                            </h2>

                            <span className="text-sm text-[#8b95a5]">
                                {transactions.length} transactions
                            </span>

                        </div>


                        {/* DESKTOP */}
                        <TransactionTable
                            transactions={transactions}
                            handleDelete={handleDelete}
                        />


                        {/* MOBILE */}
                        <TransactionMobile
                            transactions={transactions}
                            handleDelete={handleDelete}
                        />

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Transactions;