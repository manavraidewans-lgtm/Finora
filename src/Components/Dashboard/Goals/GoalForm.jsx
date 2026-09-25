function GoalForm({
    showForm,
    setShowForm,
    formData,
    setFormData,
    handleSubmit,
}) {
    if (!showForm) return null;

    const updateField = (field, value) =>
        setFormData({ ...formData, [field]: value });

    const fields = [
        {
            label: "Goal Name",
            type: "text",
            value: formData.name,
            field: "name",
            placeholder: "e.g. New Laptop",
        },
        {
            label: "Target Amount",
            type: "number",
            value: formData.target,
            field: "target",
            placeholder: "100000",
            min: "1",
        },
        {
            label: "Already Saved",
            type: "number",
            value: formData.saved,
            field: "saved",
            placeholder: "0",
            min: "0",
        },
    ];

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">

            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6">

                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-[#17233c]">
                            Create New Goal
                        </h2>

                        <p className="mt-1 text-xs text-[#7183a0]">
                            Set a target and start working towards it.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f4f6f8] text-[#64748b]"
                    >
                        <i className="ri-close-line"></i>
                    </button>
                </div>



                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="mt-6 flex flex-col gap-4"
                >

                    {/* NAME */}
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-[#34445c]">
                            Goal Name
                        </label>

                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                updateField("name", e.target.value)
                            }
                            placeholder="e.g. New Laptop"
                            className="w-full rounded-lg border border-[#dce4ed] px-3 py-2.5 text-sm outline-none focus:border-[#148c7e]"
                        />
                    </div>


                    {/* DESCRIPTION */}
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-[#34445c]">
                            Description
                        </label>

                        <textarea
                            rows="3"
                            value={formData.description}
                            onChange={(e) =>
                                updateField("description", e.target.value)
                            }
                            placeholder="What are you saving for?"
                            className="w-full resize-none rounded-lg border border-[#dce4ed] px-3 py-2.5 text-sm outline-none focus:border-[#148c7e]"
                        />
                    </div>


                    {/* AMOUNTS */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {fields.slice(1).map((field) => (
                            <div key={field.field}>
                                <label className="mb-1.5 block text-xs font-medium text-[#34445c]">
                                    {field.label}
                                </label>

                                <input
                                    type={field.type}
                                    min={field.min}
                                    value={field.value}
                                    onChange={(e) =>
                                        updateField(
                                            field.field,
                                            e.target.value
                                        )
                                    }
                                    placeholder={field.placeholder}
                                    className="w-full rounded-lg border border-[#dce4ed] px-3 py-2.5 text-sm outline-none focus:border-[#148c7e]"
                                />
                            </div>
                        ))}
                    </div>


                    {/* DATE */}
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-[#34445c]">
                            Target Date
                        </label>

                        <input
                            type="date"
                            value={formData.targetDate}
                            onChange={(e) =>
                                updateField("targetDate", e.target.value)
                            }
                            className="w-full rounded-lg border border-[#dce4ed] px-3 py-2.5 text-sm outline-none focus:border-[#148c7e]"
                        />
                    </div>
                    

                    {/* BUTTONS */}
                    <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="rounded-lg border border-[#dce4ed] px-5 py-2.5 text-sm font-medium text-[#64748b]"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-[#148c7e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#10786d]"
                        >
                            Create Goal
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default GoalForm;