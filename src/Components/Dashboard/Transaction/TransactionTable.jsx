function TransactionTable({
    transactions,
    handleDelete,
}) {

    return (

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

                        <th className="px-5 py-4"></th>

                    </tr>

                </thead>


                <tbody>

                    {transactions.map((transaction) => (

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

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default TransactionTable;