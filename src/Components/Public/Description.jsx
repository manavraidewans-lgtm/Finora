function Description({ Des, className = "" }) {
    return (
        <p
            className={`text-[#949494] font-medium md:text-xl ${className}`}
        >
            {Des}
        </p>
    );
}

export default Description;