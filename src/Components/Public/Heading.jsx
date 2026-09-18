function Heading({ Tittle, className = "" }) {
    return (
        <h1
            className={`w-fit bg-[#f3ede8] p-1 rounded-full text-[#96867c] font-bold ${className}`}
        >
            {Tittle}
        </h1>
    );
}

export default Heading;