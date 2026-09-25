function TransactionForm({
    formData,
    handleChange,
    handleSubmit,
}) {

    return (

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

            {/* HEADER */}

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


            {/* FORM */}

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

                        <i className="ri-add-line"></i>

                        Add Transaction

                    </button>

                </div>

            </form>

        </div>
    );
}

export default TransactionForm;