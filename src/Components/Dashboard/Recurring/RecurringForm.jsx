function RecurringForm({
    showForm,
    setShowForm,
    formData,
    setFormData,
    handleSubmit,
}) {
    if (!showForm) return null;

    const inputClass =
        "w-full rounded-xl border border-[#dfe5eb] bg-white px-4 py-3 text-sm text-[#17233c] outline-none focus:border-[#896b57]";

    const labelClass =
        "mb-1.5 block text-xs font-medium text-[#405578]";

    const updateField = (field, value) =>
        setFormData({ ...formData, [field]: value });

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4">

            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-6">

                {/* HEADER */}
                <div className="flex items-center justify-between gap-3">

                    <div>
                        <h2 className="text-lg font-bold text-[#17233c]">
                            Add Recurring Transaction
                        </h2>

                        <p className="mt-1 text-xs text-[#7185a3]">
                            Add an automatic payment to Finora.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowForm(false)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f5f7] text-[#607697]"
                    >
                        <i className="ri-close-line text-lg"></i>
                    </button>

                </div>


                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="mt-6 flex flex-col gap-4"
                >

                    {/* NAME */}
                    <div>
                        <label className={labelClass}>Name</label>

                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                updateField("name", e.target.value)
                            }
                            placeholder="Netflix"
                            className={inputClass}
                        />
                    </div>


                    {/* CATEGORY */}
                    <div>
                        <label className={labelClass}>Category</label>

                        <select
                            value={formData.category}
                            onChange={(e) =>
                                updateField("category", e.target.value)
                            }
                            className={inputClass}
                        >
                            {[
                                "Bills & Utilities",
                                "Entertainment",
                                "Health & Fitness",
                                "Insurance",
                                "Investments",
                                "Subscriptions",
                                "Internet",
                                "Other",
                            ].map((category) => (
                                <option key={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>


                    {/* AMOUNT */}
                    <div>
                        <label className={labelClass}>Amount</label>

                        <input
                            type="number"
                            min="0"
                            value={formData.amount}
                            onChange={(e) =>
                                updateField("amount", e.target.value)
                            }
                            placeholder="2499"
                            className={inputClass}
                        />
                    </div>


                    {/* FREQUENCY */}
                    <div>
                        <label className={labelClass}>Frequency</label>

                        <select
                            value={formData.frequency}
                            onChange={(e) =>
                                updateField("frequency", e.target.value)
                            }
                            className={inputClass}
                        >
                            {["Monthly", "Weekly", "Yearly"].map(
                                (frequency) => (
                                    <option key={frequency}>
                                        {frequency}
                                    </option>
                                )
                            )}
                        </select>
                    </div>


                    {/* NEXT PAYMENT */}
                    <div>
                        <label className={labelClass}>Next Payment</label>

                        <input
                            type="date"
                            value={formData.nextPayment}
                            onChange={(e) =>
                                updateField("nextPayment", e.target.value)
                            }
                            className={inputClass}
                        />
                    </div>


                    {/* TYPE */}
                    <div>
                        <label className={labelClass}>Type</label>

                        <select
                            value={formData.type}
                            onChange={(e) =>
                                updateField("type", e.target.value)
                            }
                            className={inputClass}
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>


                    {/* BUTTONS */}
                    <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">

                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="rounded-xl border border-[#dfe5eb] px-5 py-3 text-sm font-medium text-[#607697]"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-xl bg-[#0f8b78] px-5 py-3 text-sm font-medium text-white"
                        >
                            Add Recurring
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default RecurringForm;