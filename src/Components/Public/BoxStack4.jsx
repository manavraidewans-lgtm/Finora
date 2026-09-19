function BoxesStack4() {
    const Boxes = [
        {
            Icon: "ri-shield-line",
            Tittle: "Clarity",
            Description: "See the bigger picture."
        },
        {
            Icon: "ri-lock-line",
            Tittle: "Privacy",
            Description: "Your data, your control."
        },
        {
            Icon: "ri-leaf-line",
            Tittle: "Progress",
            Description: "Small steps, big results."
        },
        {
            Icon: "ri-star-line",
            Tittle: "Simplicity",
            Description: "Less complexity. More life."
        }
    ];

    return (
        <div className="w-full grid grid-cols-2 md:grid-cols-4">

            {Boxes.map((Box, index) => (
                <div
                    key={index}
                    className="flex flex-col justify-center items-center text-center px-4 py-8 md:py-10 border-r border-[#ded7d3] last:border-r-0"
                >

                    {/* Icon */}
                    <i
                        className={`${Box.Icon} text-4xl md:text-5xl text-[#a38671] mb-4`}
                    ></i>

                    {/* Title */}
                    <h2 className="text-xl md:text-2xl font-semibold text-[#4b4d4d]">
                        {Box.Tittle}
                    </h2>

                    {/* Description */}
                    <p className="mt-3 max-w-35 text-sm md:text-base font-medium leading-6 text-[#949494]">
                        {Box.Description}
                    </p>

                </div>
            ))}

        </div>
    );
}

export default BoxesStack4