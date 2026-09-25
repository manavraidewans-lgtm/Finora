function BudgetForm({ formData, handleChange, handleSubmit }) {
    return (
        <div className="w-full rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5 md:p-6">


            {/* HEADER */}
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3eee9] text-[#896b57]">
                    <i className="ri-wallet-3-line text-xl"></i>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-[#111827]">
                        Create Budget
                    </h2>

                    <p className="text-sm text-[#8b95a5]">
                        Set a spending limit for a category
                    </p>
                </div>
            </div>


            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-4 md:grid-cols-3"
            >

                {/* NAME */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-[#4b4d4d]">
                        Budget Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Monthly Food"
                        className="h-11 w-full rounded-xl border border-[#ded7d3] bg-[#faf9f7] px-3 text-sm outline-none focus:border-[#a38671]"
                    />
                </div>


                {/* CATEGORY */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-[#4b4d4d]">
                        Category
                    </label>

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="h-11 w-full rounded-xl border border-[#ded7d3] bg-[#faf9f7] px-3 text-sm outline-none focus:border-[#a38671]"
                    >
                        <option>Food & Dining</option>
                        <option>Travel</option>
                        <option>Shopping</option>
                        <option>Bills & Utilities</option>
                        <option>Entertainment</option>
                        <option>Health</option>
                        <option>Education</option>
                        <option>Others</option>
                    </select>
                </div>


                {/* LIMIT */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-[#4b4d4d]">
                        Budget Limit
                    </label>

                    <input
                        type="number"
                        name="limit"
                        value={formData.limit}
                        onChange={handleChange}
                        placeholder="₹ 10,000"
                        min="0"
                        className="h-11 w-full rounded-xl border border-[#ded7d3] bg-[#faf9f7] px-3 text-sm outline-none focus:border-[#a38671]"
                    />
                </div>
                

                {/* BUTTON */}
                <div className="md:col-span-3">
                    <button
                        type="submit"
                        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#967056] px-5 text-sm font-medium text-white transition duration-200 hover:bg-[#89634d]"
                    >
                        <i className="ri-add-line"></i>
                        Create Budget
                    </button>
                </div>

            </form>
        </div>
    );
}

export default BudgetForm;