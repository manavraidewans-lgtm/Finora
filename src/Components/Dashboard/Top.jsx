function Top({ Icon, Tittle, Description }) {
    return (
        <div
            className="
                flex
                w-full
                items-center
                justify-start
                gap-5
                px-5
                pt-[calc(8vh+0.75rem)]
                pb-3
                md:gap-6
                md:px-8
                md:pt-[calc(8vh+0.75rem)]
                md:pb-3
                lg:h-[12vh]
                lg:gap-7
                lg:px-9
                lg:pt-0
                lg:pb-0
            "
        >

            {/* Icon */}

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e0eafd] md:h-12 md:w-12 lg:h-14 lg:w-14">

                <i
                    className={`${Icon} text-xl text-[#3f5b89] md:text-2xl lg:text-4xl`}
                ></i>

            </div>


            {/* Text */}

            <div className="flex flex-col">

                <h1 className="text-lg font-semibold text-[#172033] md:text-xl lg:text-2xl">
                    {Tittle}
                </h1>

                <p className="text-sm text-[#6b7280] md:text-base">
                    {Description}
                </p>

            </div>

        </div>
    );
}

export default Top;

