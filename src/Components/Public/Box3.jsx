function Box3({ Icon, Tittle, Description }) {

    return (
        <div className="w-full min-h-45 sm:min-h-50 md:min-h-55 bg-[#f0ede8] border border-[#ded7d3] rounded-2xl p-5 md:p-6 flex flex-col justify-center items-center gap-3">

            {/* Icon */}
            <div className="h-15 w-15 rounded-[50%] md:h-20 md:w-20 bg-[#f5eee8] flex justify-center items-center p-4 border-[#ded7d3] border-2">
                <i className={`${Icon} text-xl md:text-4xl text-[#896b57] font-black`}></i>
            </div>

            {/* Title */}
            <h3 className="text-base md:text-lg font-semibold text-[#4b4d4d]">
                {Tittle}
            </h3>

            {/* Description */}
            <p className="text-sm md:text-base text-[#6b6d6d]">
                {Description}
            </p>

        </div>
    )
}

export default Box3