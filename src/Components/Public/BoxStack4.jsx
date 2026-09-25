function BoxesStack4() {
    const boxes = [
        ["ri-shield-line", "Clarity", "See the bigger picture."],
        ["ri-lock-line", "Privacy", "Your data, your control."],
        ["ri-leaf-line", "Progress", "Small steps, big results."],
        ["ri-star-line", "Simplicity", "Less complexity. More life."],
    ];

    return (
        <div className="grid w-full grid-cols-2 md:grid-cols-4">
            {boxes.map(([Icon, Tittle, Description], index) => (
                <div
                    key={index}
                    className="flex flex-col items-center justify-center border-r border-[#ded7d3] px-4 py-8 text-center last:border-r-0 md:py-10"
                >
                    <i className={`${Icon} mb-4 text-4xl text-[#a38671] md:text-5xl`}></i>

                    <h2 className="text-xl font-semibold text-[#4b4d4d] md:text-2xl">
                        {Tittle}
                    </h2>

                    <p className="mt-3 max-w-35 text-sm font-medium leading-6 text-[#949494] md:text-base">
                        {Description}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default BoxesStack4;