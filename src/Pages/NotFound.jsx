import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#f7f4ef] px-5">

            <div className="w-full max-w-xl text-center">

                {/* LOGO */}
                <div className="mb-8 flex items-center justify-center gap-3">

                    <div className="grid grid-cols-2 gap-1">
                        {[
                            "bg-[#ff7f7f]",
                            "bg-[#d98270]",
                            "bg-[#f08b83]",
                            "bg-[#e6a08c]",
                        ].map((color, index) => (
                            <div
                                key={index}
                                className={`h-3 w-3 rounded-[3px] ${color}`}
                            />
                        ))}
                    </div>

                    <span className="text-xl font-bold text-[#172033]">
                        Munivo
                    </span>

                </div>


                {/* 404 */}
                <h1 className="text-8xl font-black tracking-tight text-[#172033] md:text-9xl">
                    404
                </h1>


                {/* HEADING */}
                <h2 className="mt-4 text-2xl font-bold text-[#172033] md:text-3xl">
                    Page not found
                </h2>


                {/* DESCRIPTION */}
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6b7280] md:text-base">
                    The page you're looking for doesn't exist or may have
                    been moved somewhere else.
                </p>


                {/* BUTTON */}
                <Link
                    to="/"
                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#203854] px-6 py-3 text-sm font-medium text-white transition duration-200 hover:bg-[#172b41]"
                >
                    <i className="ri-home-5-line"></i>
                    Back to Home
                </Link>

            </div>

        </div>
    );
}

export default NotFound;