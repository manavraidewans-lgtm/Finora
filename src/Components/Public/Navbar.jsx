import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [modal, setModal] = useState(null);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const openModal = (type) => {
        setModal(type);
        setMenuOpen(false);
    };

    const closeModal = () => {
        setModal(null);
    };

    return (
        <>
            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 w-full h-20 bg-[#f8f5f0] flex items-center justify-between px-6 md:px-10 lg:px-16 z-50">

                {/* Logo */}
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="text-xl md:text-2xl font-bold text-[#4b4d4d]"
                >
                    Finora 🍀
                </Link>


                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">

                    <Link
                        to="/"
                        className="text-[#4b4d4d] hover:text-[#896b57] transition-colors"
                    >
                        Home
                    </Link>

                    <Link
                        to="/about"
                        className="text-[#4b4d4d] hover:text-[#896b57] transition-colors"
                    >
                        About
                    </Link>

                    <Link
                        to="/features"
                        className="text-[#4b4d4d] hover:text-[#896b57] transition-colors"
                    >
                        Features
                    </Link>

                </div>


                {/* Desktop Login / Signup */}
                <div className="hidden md:flex items-center gap-5">

                    {/* Login */}
                    <button
                        onClick={() => openModal("login")}
                        className="text-[#4b4d4d] hover:text-[#896b57] transition-colors"
                    >
                        Login
                    </button>

                    {/* Sign Up */}
                    <button
                        onClick={() => openModal("signup")}
                        className="px-5 py-2.5 bg-[#896b57] text-white rounded-lg hover:bg-[#765945] transition-colors"
                    >
                        Sign Up
                    </button>

                </div>


                {/* Hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    aria-label="Toggle menu"
                >
                    <span
                        className={`w-6 h-0.5 bg-[#4b4d4d] transition-all duration-300 ${
                            menuOpen ? "rotate-45 translate-y-2" : ""
                        }`}
                    />

                    <span
                        className={`w-6 h-0.5 bg-[#4b4d4d] transition-all duration-300 ${
                            menuOpen ? "opacity-0" : ""
                        }`}
                    />

                    <span
                        className={`w-6 h-0.5 bg-[#4b4d4d] transition-all duration-300 ${
                            menuOpen ? "-rotate-45 -translate-y-2" : ""
                        }`}
                    />
                </button>


                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="absolute top-20 left-0 w-full bg-[#f8f5f0] border-t border-[#dedad4] px-6 py-6 md:hidden">

                        <div className="flex flex-col gap-5">

                            <Link
                                to="/"
                                onClick={closeMenu}
                                className="text-[#4b4d4d] hover:text-[#896b57]"
                            >
                                Home
                            </Link>

                            <Link
                                to="/about"
                                onClick={closeMenu}
                                className="text-[#4b4d4d] hover:text-[#896b57]"
                            >
                                About
                            </Link>

                            <Link
                                to="/features"
                                onClick={closeMenu}
                                className="text-[#4b4d4d] hover:text-[#896b57]"
                            >
                                Features
                            </Link>

                            <div className="w-full h-px bg-[#dedad4]" />

                            {/* Mobile Login */}
                            <button
                                onClick={() => openModal("login")}
                                className="text-left text-[#4b4d4d] hover:text-[#896b57]"
                            >
                                Login
                            </button>

                            {/* Mobile Sign Up */}
                            <button
                                onClick={() => openModal("signup")}
                                className="w-full text-center px-5 py-2.5 bg-[#896b57] text-white rounded-lg"
                            >
                                Sign Up
                            </button>

                        </div>

                    </div>
                )}

            </nav>


            {/* MODAL OVERLAY */}
            {modal && (
                <div
                    className="fixed inset-0 z-100 bg-black/40 flex items-center justify-center px-4 h-full w-full backdrop-blur"
                    onClick={closeModal}
                >

                    {/* MODAL */}
                    <div
                        className="relative w-full  md:w-[85%] md:h-[75vh] lg:h-[70vh] lg:w-[60%] bg-[#f8f5f0] rounded-2xl p-6 md:p-8 shadow-2xl "
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-xl text-[#4b4d4d] hover:bg-[#e9e5df] transition"
                        >
                            <i className="ri-close-line"></i>
                        </button>


                        {/* LOGIN MODAL */}
                        {modal === "login" && (
                            <div>

                                <div className="mb-7">
                                    <p className="text-sm text-[#896b57] font-medium mb-2">
                                        Welcome back
                                    </p>

                                    <h2 className="text-3xl font-bold text-[#4b4d4d]">
                                        Login to Finora
                                    </h2>

                                    <p className="text-sm text-[#949494] mt-2">
                                        Continue managing your finances with ease.
                                    </p>
                                </div>


                                {/* Email */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-[#4b4d4d] mb-2">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3 rounded-xl border border-[#ded7d3] bg-[#f7f4ef] outline-none focus:border-[#896b57] transition"
                                    />
                                </div>


                                {/* Password */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-[#4b4d4d] mb-2">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 rounded-xl border border-[#ded7d3] bg-[#f7f4ef] outline-none focus:border-[#896b57] transition"
                                    />
                                </div>


                                {/* Login Button */}
                                <button
                                    className="w-full py-3 rounded-xl bg-[#896b57] text-white font-medium hover:bg-[#765945] transition"
                                >
                                    Login
                                </button>


                                {/* Switch */}
                                <p className="text-center text-sm text-[#949494] mt-5">
                                    Don't have an account?{" "}
                                    <button
                                        onClick={() => setModal("signup")}
                                        className="text-[#896b57] font-medium hover:underline"
                                    >
                                        Sign Up
                                    </button>
                                </p>

                            </div>
                        )}


                        {/* SIGN UP MODAL */}
                        {modal === "signup" && (
                            <div>

                                <div className="mb-7">
                                    <p className="text-sm text-[#896b57] font-medium mb-2">
                                        Get started
                                    </p>

                                    <h2 className="text-3xl font-bold text-[#4b4d4d]">
                                        Create your account
                                    </h2>

                                    <p className="text-sm text-[#949494] mt-2">
                                        Start taking control of your money today.
                                    </p>
                                </div>


                                {/* Name */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-[#4b4d4d] mb-2">
                                        Name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        className="w-full px-4 py-3 rounded-xl border border-[#ded7d3] bg-[#f7f4ef] outline-none focus:border-[#896b57] transition"
                                    />
                                </div>


                                {/* Email */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-[#4b4d4d] mb-2">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3 rounded-xl border border-[#ded7d3] bg-[#f7f4ef] outline-none focus:border-[#896b57] transition"
                                    />
                                </div>


                                {/* Password */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-[#4b4d4d] mb-2">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 rounded-xl border border-[#ded7d3] bg-[#f7f4ef] outline-none focus:border-[#896b57] transition"
                                    />
                                </div>


                                {/* Sign Up Button */}
                                <button
                                    className="w-full py-3 rounded-xl bg-[#896b57] text-white font-medium hover:bg-[#765945] transition"
                                >
                                    Create Account
                                </button>


                                {/* Switch */}
                                <p className="text-center text-sm text-[#949494] mt-5">
                                    Already have an account?{" "}
                                    <button
                                        onClick={() => setModal("login")}
                                        className="text-[#896b57] font-medium hover:underline"
                                    >
                                        Login
                                    </button>
                                </p>

                            </div>
                        )}

                    </div>

                </div>
            )}
        </>
    );
}

export default Navbar;