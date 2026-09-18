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
                w-[105px]
                h-[105px]

                md:w-[160px]
                md:h-[120px]

                lg:w-[175px]
                lg:h-[155px]

                bg-[#f0ede8]
                rounded-2xl

                flex flex-col
                justify-center
                items-start

                p-3
                md:p-3.5
                lg:p-4

                gap-1

                shrink-0

                ${className}
            `}
        >

            <span className="text-[10px] md:text-xs lg:text-sm text-gray-500">
                {Heading}
            </span>

            <h2 className="text-sm md:text-base lg:text-lg font-semibold text-[#4b4d4d] whitespace-nowrap">
                {Money}
            </h2>

            <span className={`text-[9px] md:text-[10px] lg:text-xs ${GrowthColor}`}>
                ↑  {Growth}
            </span>

        </section>
    );
}

export default ExpenseBox;