import { useEffect, useMemo, useState } from "react";

import Navbar from "../../Components/Dashboard/Navbar.jsx";
import Top from "../../Components/Dashboard/Top.jsx";

import RecurringSummary from "../../Components/Dashboard/Recurring/RecurringSummary.jsx";
import RecurringTable from "../../Components/Dashboard/Recurring/RecurringTable.jsx";
import RecurringSidebar from "../../Components/Dashboard/Recurring/RecurringSidebar.jsx";
import RecurringForm from "../../Components/Dashboard/Recurring/RecurringForm.jsx";


function Recurring() {


    //  RECURRING 
    const [recurring, setRecurring] = useState(() => {
        const saved = localStorage.getItem("finoraRecurring");

        if (!saved) return [];

        try {
            return JSON.parse(saved);
        } catch (error) {
            console.error("Recurring loading error:", error);
            return [];
        }
    });



    //  FORM 
    const [showForm, setShowForm] = useState(false);

    const initialForm = {
        name: "",
        category: "Bills & Utilities",
        amount: "",
        frequency: "Monthly",
        nextPayment: "",
        type: "expense",
        status: "Active",
    };

    const [formData, setFormData] = useState(initialForm);



    //  SYNC 
    useEffect(() => {
        const syncRecurring = () => {
            const saved = localStorage.getItem("finoraRecurring");

            if (!saved) {
                setRecurring([]);
                return;
            }

            try {
                setRecurring(JSON.parse(saved));
            } catch (error) {
                console.error("Recurring sync error:", error);
            }
        };

        window.addEventListener("recurringUpdated", syncRecurring);
        window.addEventListener("storage", syncRecurring);

        return () => {
            window.removeEventListener("recurringUpdated", syncRecurring);
            window.removeEventListener("storage", syncRecurring);
        };
    }, []);



    //  SAVE 
    const saveRecurring = (data) => {
        localStorage.setItem("finoraRecurring", JSON.stringify(data));
        window.dispatchEvent(new Event("recurringUpdated"));
    };



    //  FORMAT 
    const formatMoney = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(Number(amount) || 0);

    const formatDate = (date) => {
        if (!date) return "-";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) return date;

        return parsedDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };



    //  MONTHLY AMOUNT 
    const monthlyAmount = useMemo(
        () =>
            recurring
                .filter((item) => item.status !== "Paused")
                .reduce((total, item) => {
                    const amount = Number(item.amount || 0);

                    if (item.frequency === "Monthly")
                        return total + amount;

                    if (item.frequency === "Weekly")
                        return total + amount * 4;

                    if (item.frequency === "Yearly")
                        return total + amount / 12;

                    return total;
                }, 0),
        [recurring]
    );



    //  THIS MONTH PAID 
    const thisMonthPaid = useMemo(() => {
        const now = new Date();

        return recurring
            .filter((item) => item.status !== "Paused")
            .filter((item) => {
                if (!item.lastPaid) return false;

                const date = new Date(item.lastPaid);

                return (
                    date.getMonth() === now.getMonth() &&
                    date.getFullYear() === now.getFullYear()
                );
            })
            .reduce(
                (total, item) => total + Number(item.amount || 0),
                0
            );
    }, [recurring]);



    //  UPCOMING PAYMENTS 
    const upcomingPayments = useMemo(
        () =>
            recurring
                .filter(
                    (item) =>
                        item.status !== "Paused" &&
                        item.nextPayment
                )
                .sort(
                    (a, b) =>
                        new Date(a.nextPayment) -
                        new Date(b.nextPayment)
                )
                .slice(0, 5),
        [recurring]
    );



    //  ADD 
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
            id: Date.now(),
            name: formData.name.trim(),
            category: formData.category,
            amount: Number(formData.amount),
            frequency: formData.frequency,
            nextPayment: formData.nextPayment,
            type: formData.type,
            status: formData.status,
        };

        saveRecurring([...recurring, newRecurring]);
        setFormData(initialForm);
        setShowForm(false);
    };



    //  DELETE 
    const handleDelete = (id) => {
        saveRecurring(
            recurring.filter((item) => item.id !== id)
        );
    };



    // TOGGLE STATUS 
    const toggleStatus = (id) => {
        saveRecurring(
            recurring.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          status:
                              item.status === "Active"
                                  ? "Paused"
                                  : "Active",
                      }
                    : item
            )
        );
    };



    //  ICONS 
    const getIcon = (category) => {
        const icons = {
            Entertainment: "ri-netflix-fill",
            "Bills & Utilities": "ri-flashlight-line",
            Internet: "ri-wifi-line",
            "Health & Fitness": "ri-heart-pulse-line",
            Insurance: "ri-shield-check-line",
            Investments: "ri-bank-line",
            Subscriptions: "ri-cloud-line",
        };

        return icons[category] || "ri-refresh-line";
    };

    const getIconStyle = (category) => {
        const styles = {
            Entertainment: "bg-red-50 text-red-500",
            "Bills & Utilities": "bg-orange-50 text-orange-500",
            Internet: "bg-blue-50 text-blue-500",
            "Health & Fitness": "bg-pink-50 text-pink-500",
            Insurance: "bg-cyan-50 text-cyan-500",
            Investments: "bg-indigo-50 text-indigo-500",
        };

        return styles[category] || "bg-purple-50 text-purple-500";
    };



    //  RENDER 
    return (
        <div className="min-h-screen w-full bg-[#f7f4ef]">

            <Navbar />

            <main className="w-full lg:ml-60 lg:w-[calc(100%-240px)]">

                <Top
                    Icon="ri-calendar-2-line"
                    Tittle="Recurring Transactions"
                    Description="Manage your automatic payments and never miss a bill."
                />

                <div className="px-3 pb-8 sm:px-5 lg:px-6">

                    {/* HEADER */}
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">

                        <button
                            onClick={() => setShowForm(true)}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f8b78] px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#0b7767] sm:w-auto"
                        >
                            <i className="ri-add-line text-lg"></i>
                            Add Recurring Transaction
                        </button>

                    </div>


                    {/* MAIN GRID */}
                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_325px]">

                        {/* LEFT */}
                        <div className="min-w-0">

                            <RecurringSummary
                                recurring={recurring}
                                monthlyAmount={monthlyAmount}
                                thisMonthPaid={thisMonthPaid}
                                upcomingPayments={upcomingPayments}
                                formatMoney={formatMoney}
                            />

                            <div className="mt-4">
                                <RecurringTable
                                    recurring={recurring}
                                    formatMoney={formatMoney}
                                    formatDate={formatDate}
                                    getIcon={getIcon}
                                    getIconStyle={getIconStyle}
                                    toggleStatus={toggleStatus}
                                    handleDelete={handleDelete}
                                />
                            </div>

                        </div>


                        {/* RIGHT */}
                        <RecurringSidebar
                            upcomingPayments={upcomingPayments}
                            formatMoney={formatMoney}
                            formatDate={formatDate}
                            getIcon={getIcon}
                            getIconStyle={getIconStyle}
                        />

                    </div>

                </div>


                {/* FORM */}
                <RecurringForm
                    showForm={showForm}
                    setShowForm={setShowForm}
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                />

            </main>

        </div>
    );
}

export default Recurring;