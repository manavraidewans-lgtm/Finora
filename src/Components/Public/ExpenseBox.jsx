function ExpenseBox({
    Heading,
    Money,
    Growth,
    GrowthColor = "text-gray-500",
    className = "",
}) {
    return (
        <section
            className={`
                flex h-26.25 w- shrink-0 flex-col
                items-start justify-center gap-1 rounded-2xl
                bg-[#f0ede8] p-3
                md:h-30 md:w-40 md:p-3.5
                lg:h-38.75 lg:w-43.75 lg:p-4
                ${className}
            `}
        >
            <span className="text-[10px] text-gray-500 md:text-xs lg:text-sm">
                {Heading}
            </span>

            <h2 className="whitespace-nowrap text-sm font-semibold text-[#4b4d4d] md:text-base lg:text-lg">
                {Money}
            </h2>

            <span className={`text-[9px] md:text-[10px] lg:text-xs ${GrowthColor}`}>
                ↑ {Growth}
            </span>
        </section>
    );
}

export default ExpenseBox;