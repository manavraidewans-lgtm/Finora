import { Link } from "react-router-dom";

function ButtonStack() {
    return (
        <div className="flex flex-wrap gap-3">


            {/* Try Your Spending */}
            <Link
                to="/dashboard"
                className="px-6 py-3 rounded-full bg-[#967056] text-white font-medium hover:bg-[#896b57] transition-all duration-300"
            >
                Try Your Spending
            </Link>



            {/* Explore Features */}
            <Link
                to="/features"
                className="px-6 py-3 rounded-full border border-[#896b57] text-[#896b57] font-medium hover:bg-[#896b57] hover:text-white transition-all duration-300"
            >
                Explore Features
            </Link>

        </div>
    );
}

export default ButtonStack;

