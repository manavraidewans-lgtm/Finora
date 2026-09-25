function TransactionMobile({ transactions, handleDelete }) {
    return (
        <div className="md:hidden">

            {transactions.map((transaction) => (
                <div
                    key={transaction.id}
                    className="flex items-center gap-3 border-b border-[#f1f1f1] p-4 last:border-0"
                >

                    {/* ICON */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3eee9] text-[#896b57]">
                        <i
                            className={
                                transaction.type === "income"
                                    ? "ri-arrow-down-line"
                                    : "ri-shopping-bag-3-line"
                            }
                        ></i>
                    </div>

                    {/* DETAILS */}
                    <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-semibold text-[#1f2937]">
                            {transaction.description}
                        </h3>

                        <p className="mt-1 truncate text-xs text-[#8b95a5]">
                            {transaction.category} • {transaction.date}
                        </p>
                    </div>

                    {/* AMOUNT */}
                    <div className="text-right">
                        <p
                            className={
                                transaction.type === "income"
                                    ? "text-sm font-semibold text-green-500"
                                    : "text-sm font-semibold text-red-500"
                            }
                        >
                            {transaction.type === "income" ? "+" : "-"}₹
                            {Number(transaction.amount).toLocaleString("en-IN")}
                        </p>

                        <button
                            onClick={() => handleDelete(transaction.id)}
                            className="mt-1 text-xs text-[#9ca3af] hover:text-red-500"
                        >
                            Delete
                        </button>
                    </div>

                </div>
            ))}

        </div>
    );
}

export default TransactionMobile;