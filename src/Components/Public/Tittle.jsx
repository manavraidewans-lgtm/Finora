function Tittle({ Heading, className = "" }) {
    return (
        <h1
            className={`font-black text-[#3c3f44] ${className}`}
        >
            {Heading}
        </h1>
    );
}

export default Tittle;