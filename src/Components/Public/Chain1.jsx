function Chain1({
    Text = [],
    Icon = "ri-arrow-right-long-line",
    className = ""
}) {
    return (
        <div
            className={`h-[30%] w-[80%] flex justify-start items-center gap-2 md:gap-6 lg:gap-8 ${className}`}
        >

            {Text.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center gap-2 md:gap-6 lg:gap-8"
                >

                    <h1 className="text-sm md:text-xl">
                        {item}
                    </h1>

                    {index < Text.length - 1 && (
                        <i className={`${Icon} text-sm md:text-lg`}></i>
                    )}

                </div>
            ))}

        </div>
    );
}

export default Chain1;