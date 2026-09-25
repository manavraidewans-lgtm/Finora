import { useEffect, useState } from "react";

import Navbar from "../../Components/Dashboard/Navbar.jsx";
import Top from "../../Components/Dashboard/Top.jsx";
import BudgetForm from "../../Components/Dashboard/Budgets/BudgetForm.jsx";
import BudgetVsSpent from "../../Components/Dashboard/Budgets/BudgetVsSpent.jsx";
import SpendingByCategory from "../../Components/Dashboard/Budgets/SpendingByCategory.jsx";
import BudgetUsage from "../../Components/Dashboard/Budgets/BudgetUsage.jsx";
import BudgetCard from "../../Components/Dashboard/Budgets/BudgetCard.jsx";

function Budgets() {


    //  BUDGETS 
    const [budgets, setBudgets] = useState(() => {
        const saved = localStorage.getItem("finoraBudgets");

        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (error) {
                console.error("Budget loading error:", error);
            }
        }

        return [];
    });

    
    //  TRANSACTIONS 
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem("finoraTransactions");

        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (error) {
                console.error("Transaction loading error:", error);
            }
        }

        return [];
    });


    //  FORM 
    const [formData, setFormData] = useState({
        name: "",
        category: "Food & Dining",
        limit: "",
    });


    //  SAVE BUDGETS 
    useEffect(() => {
        localStorage.setItem("finoraBudgets", JSON.stringify(budgets));
    }, [budgets]);


    //  SYNC TRANSACTIONS 
    useEffect(() => {
        const loadTransactions = () => {
            const saved = localStorage.getItem("finoraTransactions");

            if (!saved) {
                setTransactions([]);
                return;
            }

            try {
                setTransactions(JSON.parse(saved));
            } catch (error) {
                console.error("Transaction sync error:", error);
            }
        };

        window.addEventListener("transactionsUpdated", loadTransactions);
        window.addEventListener("storage", loadTransactions);

        return () => {
            window.removeEventListener("transactionsUpdated", loadTransactions);
            window.removeEventListener("storage", loadTransactions);
        };
    }, []);

    
    //  SYNC BUDGETS 
    useEffect(() => {
        const loadBudgets = () => {
            const saved = localStorage.getItem("finoraBudgets");

            if (!saved) {
                setBudgets([]);
                return;
            }

            try {
                setBudgets(JSON.parse(saved));
            } catch (error) {
                console.error("Budget sync error:", error);
            }
        };

        window.addEventListener("budgetsUpdated", loadBudgets);
        window.addEventListener("storage", loadBudgets);

        return () => {
            window.removeEventListener("budgetsUpdated", loadBudgets);
            window.removeEventListener("storage", loadBudgets);
        };
    }, []);


    //  INPUT 
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    //  ADD BUDGET 
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.limit) return;

        const newBudget = {
            id: Date.now(),
            name: formData.name,
            category: formData.category,
            limit: Number(formData.limit),
        };

        const updatedBudgets = [newBudget, ...budgets];

        setBudgets(updatedBudgets);

        localStorage.setItem(
            "finoraBudgets",
            JSON.stringify(updatedBudgets)
        );

        window.dispatchEvent(new Event("budgetsUpdated"));

        setFormData({
            name: "",
            category: "Food & Dining",
            limit: "",
        });
    };


    //  DELETE 
    const handleDelete = (id) => {
        const updatedBudgets = budgets.filter(
            (budget) => budget.id !== id
        );

        setBudgets(updatedBudgets);

        localStorage.setItem(
            "finoraBudgets",
            JSON.stringify(updatedBudgets)
        );

        window.dispatchEvent(new Event("budgetsUpdated"));
    };


    //  SPENT 
    const getSpent = (category) =>
        transactions
            .filter(
                (transaction) =>
                    transaction.type?.toLowerCase() === "expense" &&
                    transaction.category === category
            )
            .reduce(
                (total, transaction) =>
                    total + Number(transaction.amount || 0),
                0
            );


    //  FORMAT MONEY 
    const formatMoney = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);

    

    //  BUDGET VS SPENT 
    const budgetChartData = budgets.map((budget) => {
        const spent = getSpent(budget.category);

        return {
            name:
                budget.name.length > 12
                    ? budget.name.substring(0, 12) + "..."
                    : budget.name,
            Budget: Number(budget.limit || 0),
            Spent: Number(spent || 0),
        };
    });


    //  CATEGORY CHART 
    const categoryTotals = {};

    transactions
        .filter(
            (transaction) =>
                transaction.type?.toLowerCase() === "expense"
        )
        .forEach((transaction) => {
            const category = transaction.category || "Others";

            categoryTotals[category] =
                (categoryTotals[category] || 0) +
                Number(transaction.amount || 0);
        });

    const categoryChartData = Object.entries(categoryTotals)
        .map(([name, value]) => ({ name, value }))
        .filter((item) => item.value > 0);



    //  USAGE CHART 
    const usageChartData = budgets.map((budget) => {
        const spent = getSpent(budget.category);

        const usage =
            budget.limit > 0
                ? Math.round((spent / budget.limit) * 100)
                : 0;

        return {
            name:
                budget.name.length > 12
                    ? budget.name.substring(0, 12) + "..."
                    : budget.name,
            Usage: usage,
        };
    });

    //  PIE COLORS 

    const pieColors = [
        "#896b57",
        "#43a7a7",
        "#967056",
        "#7b8db8",
        "#a38671",
        "#6f8f72",
        "#b28b6c",
        "#9a7b9a",
    ];

    //  UI 

    return (
        <div className="min-h-screen w-full bg-[#f7f4ef]">
            <Navbar />

            <main className="w-full lg:ml-60 lg:w-[calc(100%-240px)]">

                {/* TOP */}
                <Top
                    Icon="ri-crosshair-2-line"
                    Tittle="Budget"
                    Description="Set limits, stay on track and achieve your financial goals"
                />

                <div className="w-full p-4 sm:p-5 md:p-6 lg:p-8">

                    {/* FORM */}
                    <BudgetForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />

                    {/* CHARTS */}
                    {budgets.length > 0 && (
                        <div className="mt-5 grid w-full grid-cols-1 gap-4 lg:grid-cols-2">

                            <BudgetVsSpent
                                data={budgetChartData}
                                formatMoney={formatMoney}
                            />

                            <SpendingByCategory
                                data={categoryChartData}
                                pieColors={pieColors}
                                formatMoney={formatMoney}
                            />

                            <BudgetUsage data={usageChartData} />

                        </div>
                    )}

                    {/* BUDGET CARDS */}
                    <div className="mt-5 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

                        {budgets.length === 0 ? (
                            <div className="rounded-2xl border border-[#e8e8e8] bg-white p-8 text-center md:col-span-2 lg:col-span-3">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f3eee9] text-[#896b57]">
                                    <i className="ri-pie-chart-2-line text-2xl"></i>
                                </div>

                                <h2 className="mt-4 text-lg font-semibold text-[#111827]">
                                    No budgets yet
                                </h2>

                                <p className="mt-1 text-sm text-[#8b95a5]">
                                    Create your first budget to start tracking your spending.
                                </p>

                            </div>
                        ) : (
                            budgets.map((budget) => (
                                <BudgetCard
                                    key={budget.id}
                                    budget={budget}
                                    spent={getSpent(budget.category)}
                                    formatMoney={formatMoney}
                                    handleDelete={handleDelete}
                                />
                            ))
                        )}

                    </div>

                </div>
            </main>
        </div>
    );
}

export default Budgets;