
function Button({ BackgroundColor = "bg-white", Text, className = "" }) {
    return (
        <button
            className={`${BackgroundColor} ${className} p-3  md:pt-3 md:pb-3 md:pl-4 md:pr-4 lg:mt-4 lg:pb-4 lg:pr-5 lg:pl-5 border-2 border-[#ded7d3] rounded-2xl flex justify-center items-center`}
        >
            {Text}
        </button>
    );
}

export default Button;

