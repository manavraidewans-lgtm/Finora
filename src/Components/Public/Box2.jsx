function Box2({ Icon, Tittle, Description }) {
    return (
        <div className="min-h-40 w-full bg-[#f7f4ef] p-4 md:p-5 flex flex-row items-start gap-4">

            {/* Icon */}
            <div className="shrink-0 text-3xl text-[#896b57] flex items-center justify-center rounded-[50%] bg-[#e4dad1] h-15 w-15 font-black ">
                <i className={Icon}></i>
            </div>

            {/* Content */}
            <div className="flex flex-col  gap-1 md:gap-3 lg:gap-4">

                <h3 className="text-base md:text-2xl lg:text-3xl font-medium text-[#4b4d4d]">
                    {Tittle}
                </h3>

                <p className="text-sm md:text-[0.9rem] text-[#777] leading-relaxed">
                    {Description}
                </p>

            </div>

        </div>
    );
}

export default Box2;