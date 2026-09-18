
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
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

                <Link
                    to="/login"
                    className="text-[#4b4d4d] hover:text-[#896b57] transition-colors"
                >
                    Login
                </Link>

                <Link
                    to="/signup"
                    className="px-5 py-2.5 bg-[#896b57] text-white rounded-lg hover:bg-[#765945] transition-colors"
                >
                    Sign Up
                </Link>

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

                        <Link
                            to="/login"
                            onClick={closeMenu}
                            className="text-[#4b4d4d] hover:text-[#896b57]"
                        >
                            Login
                        </Link>

                        <Link
                            to="/signup"
                            onClick={closeMenu}
                            className="w-full text-center px-5 py-2.5 bg-[#896b57] text-white rounded-lg"
                        >
                            Sign Up
                        </Link>

                    </div>

                </div>
            )}

        </nav>
    );
}

export default Navbar;

