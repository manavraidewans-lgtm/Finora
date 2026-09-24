import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [modal, setModal] = useState(null);

    // =====================================================
    // LOGIN DATA
    // =====================================================

    const [loginData, setLoginData] = useState({
        name: "",
        email: "",
        password: "",
    });

    // =====================================================
    // SIGN UP DATA
    // =====================================================

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
    });

    // =====================================================
    // CLOSE MENU
    // =====================================================

    const closeMenu = () => {
        setMenuOpen(false);
    };

    // =====================================================
    // OPEN MODAL
    // =====================================================

    const openModal = (type) => {
        setModal(type);
        setMenuOpen(false);
    };

    // =====================================================
    // CLOSE MODAL
    // =====================================================

    const closeModal = () => {
        setModal(null);
    };

    // =====================================================
    // LOGIN INPUT
    // =====================================================

    const handleLoginChange = (e) => {

        const { name, value } = e.target;

        setLoginData((previous) => ({
            ...previous,
            [name]: value,
        }));

    };

    // =====================================================
    // SIGN UP INPUT
    // =====================================================

    const handleSignupChange = (e) => {

        const { name, value } = e.target;

        setSignupData((previous) => ({
            ...previous,
            [name]: value,
        }));

    };

    // =====================================================
    // SAVE PROFILE
    // =====================================================

    const saveProfile = ({ name, email }) => {

        const existingProfile =
            localStorage.getItem("finoraProfile");

        let profile = {};

        if (existingProfile) {

            try {

                profile =
                    JSON.parse(existingProfile);

            } catch (error) {

                profile = {};

            }

        }

        const updatedProfile = {

            ...profile,

            name:
                name ||
                profile.name ||
                "User",

            email:
                email ||
                profile.email ||
                "",

        };

        localStorage.setItem(
            "finoraProfile",
            JSON.stringify(updatedProfile)
        );

        // Tell dashboard components
        // that profile has changed.

        window.dispatchEvent(
            new Event("profileUpdated")
        );

    };

    // =====================================================
    // LOGIN
    // =====================================================

    const handleLogin = (e) => {

        e.preventDefault();

        const name =
            loginData.name.trim();

        const email =
            loginData.email.trim();

        if (!name) {

            alert("Please enter your name.");

            return;

        }

        if (!email) {

            alert("Please enter your email.");

            return;

        }

        // Any password is accepted.
        // No password checking.

        // Save profile

        saveProfile({
            name,
            email,
        });

        // Login status

        localStorage.setItem(
            "finoraLoggedIn",
            "true"
        );

        // Reset form

        setLoginData({
            name: "",
            email: "",
            password: "",
        });

        // Close modal

        setModal(null);

        // Go to dashboard

        navigate("/dashboard");

    };

    // =====================================================
    // SIGN UP
    // =====================================================

    const handleSignup = (e) => {

        e.preventDefault();

        const name =
            signupData.name.trim();

        const email =
            signupData.email.trim();

        if (!name) {

            alert("Please enter your name.");

            return;

        }

        if (!email) {

            alert("Please enter your email.");

            return;

        }

        // Any password is accepted.
        // No password checking.

        // Save profile

        saveProfile({
            name,
            email,
        });

        // Login user immediately

        localStorage.setItem(
            "finoraLoggedIn",
            "true"
        );

        // Reset form

        setSignupData({
            name: "",
            email: "",
            password: "",
        });

        // Close modal

        setModal(null);

        // Go to dashboard

        navigate("/dashboard");

    };

    return (

        <>

            {/* =================================================
                NAVBAR
            ================================================= */}

            <nav className="
                fixed
                top-0
                left-0
                z-50
                flex
                h-20
                w-full
                items-center
                justify-between
                bg-[#f8f5f0]
                px-6
                md:px-10
                lg:px-16
            ">

                {/* LOGO */}

                <Link
                    to="/"
                    onClick={closeMenu}
                    className="
                        text-xl
                        font-bold
                        text-[#4b4d4d]
                        md:text-2xl
                    "
                >
                    Finora 🍀
                </Link>


                {/* =================================================
                    DESKTOP NAVIGATION
                ================================================= */}

                <div className="
                    hidden
                    items-center
                    gap-8
                    md:flex
                ">

                    <Link
                        to="/"
                        className="
                            text-[#4b4d4d]
                            transition-colors
                            hover:text-[#896b57]
                        "
                    >
                        Home
                    </Link>


                    <Link
                        to="/about"
                        className="
                            text-[#4b4d4d]
                            transition-colors
                            hover:text-[#896b57]
                        "
                    >
                        About
                    </Link>


                    <Link
                        to="/features"
                        className="
                            text-[#4b4d4d]
                            transition-colors
                            hover:text-[#896b57]
                        "
                    >
                        Features
                    </Link>

                </div>


                {/* =================================================
                    DESKTOP LOGIN / SIGNUP
                ================================================= */}

                <div className="
                    hidden
                    items-center
                    gap-5
                    md:flex
                ">

                    <button
                        onClick={() =>
                            openModal("login")
                        }
                        className="
                            text-[#4b4d4d]
                            transition-colors
                            hover:text-[#896b57]
                        "
                    >
                        Login
                    </button>


                    <button
                        onClick={() =>
                            openModal("signup")
                        }
                        className="
                            rounded-lg
                            bg-[#896b57]
                            px-5
                            py-2.5
                            text-white
                            transition-colors
                            hover:bg-[#765945]
                        "
                    >
                        Sign Up
                    </button>

                </div>


                {/* =================================================
                    HAMBURGER
                ================================================= */}

                <button
                    onClick={() =>
                        setMenuOpen(!menuOpen)
                    }
                    className="
                        flex
                        flex-col
                        gap-1.5
                        p-2
                        md:hidden
                    "
                    aria-label="Toggle menu"
                >

                    <span
                        className={`
                            h-0.5
                            w-6
                            bg-[#4b4d4d]
                            transition-all
                            duration-300
                            ${
                                menuOpen
                                    ? "translate-y-2 rotate-45"
                                    : ""
                            }
                        `}
                    />


                    <span
                        className={`
                            h-0.5
                            w-6
                            bg-[#4b4d4d]
                            transition-all
                            duration-300
                            ${
                                menuOpen
                                    ? "opacity-0"
                                    : ""
                            }
                        `}
                    />


                    <span
                        className={`
                            h-0.5
                            w-6
                            bg-[#4b4d4d]
                            transition-all
                            duration-300
                            ${
                                menuOpen
                                    ? "-translate-y-2 -rotate-45"
                                    : ""
                            }
                        `}
                    />

                </button>


                {/* =================================================
                    MOBILE MENU
                ================================================= */}

                {menuOpen && (

                    <div className="
                        absolute
                        top-20
                        left-0
                        w-full
                        border-t
                        border-[#dedad4]
                        bg-[#f8f5f0]
                        px-6
                        py-6
                        md:hidden
                    ">

                        <div className="
                            flex
                            flex-col
                            gap-5
                        ">

                            <Link
                                to="/"
                                onClick={closeMenu}
                                className="
                                    text-[#4b4d4d]
                                    hover:text-[#896b57]
                                "
                            >
                                Home
                            </Link>


                            <Link
                                to="/about"
                                onClick={closeMenu}
                                className="
                                    text-[#4b4d4d]
                                    hover:text-[#896b57]
                                "
                            >
                                About
                            </Link>


                            <Link
                                to="/features"
                                onClick={closeMenu}
                                className="
                                    text-[#4b4d4d]
                                    hover:text-[#896b57]
                                "
                            >
                                Features
                            </Link>


                            <div className="
                                h-px
                                w-full
                                bg-[#dedad4]
                            " />


                            <button
                                onClick={() =>
                                    openModal("login")
                                }
                                className="
                                    text-left
                                    text-[#4b4d4d]
                                    hover:text-[#896b57]
                                "
                            >
                                Login
                            </button>


                            <button
                                onClick={() =>
                                    openModal("signup")
                                }
                                className="
                                    w-full
                                    rounded-lg
                                    bg-[#896b57]
                                    px-5
                                    py-2.5
                                    text-center
                                    text-white
                                "
                            >
                                Sign Up
                            </button>

                        </div>

                    </div>

                )}

            </nav>


            {/* =====================================================
                MODAL
            ===================================================== */}

            {modal && (

                <div
                    className="
                        fixed
                        inset-0
                        z-[100]
                        flex
                        h-full
                        w-full
                        items-center
                        justify-center
                        overflow-y-auto
                        bg-black/40
                        px-4
                        py-6
                        backdrop-blur
                    "
                    onClick={closeModal}
                >

                    <div
                        className="
                            relative
                            w-full
                            max-h-[90vh]
                            overflow-y-auto
                            rounded-2xl
                            bg-[#f8f5f0]
                            p-6
                            shadow-2xl
                            md:w-[85%]
                            md:p-8
                            lg:w-[60%]
                        "
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* CLOSE BUTTON */}

                        <button
                            onClick={closeModal}
                            className="
                                absolute
                                top-4
                                right-4
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                text-xl
                                text-[#4b4d4d]
                                transition
                                hover:bg-[#e9e5df]
                            "
                        >
                            <i className="ri-close-line"></i>
                        </button>


                        {/* =================================================
                            LOGIN
                        ================================================= */}

                        {modal === "login" && (

                            <form
                                onSubmit={handleLogin}
                            >

                                <div className="mb-7">

                                    <p className="
                                        mb-2
                                        text-sm
                                        font-medium
                                        text-[#896b57]
                                    ">
                                        Welcome back
                                    </p>


                                    <h2 className="
                                        text-3xl
                                        font-bold
                                        text-[#4b4d4d]
                                    ">
                                        Login to Finora
                                    </h2>


                                    <p className="
                                        mt-2
                                        text-sm
                                        text-[#949494]
                                    ">
                                        Continue managing your finances with ease.
                                    </p>

                                </div>


                                {/* NAME */}

                                <div className="mb-4">

                                    <label className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                        text-[#4b4d4d]
                                    ">
                                        Name
                                    </label>


                                    <input
                                        type="text"
                                        name="name"
                                        value={
                                            loginData.name
                                        }
                                        onChange={
                                            handleLoginChange
                                        }
                                        placeholder="Your name"
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-[#ded7d3]
                                            bg-[#f7f4ef]
                                            px-4
                                            py-3
                                            outline-none
                                            transition
                                            focus:border-[#896b57]
                                        "
                                    />

                                </div>


                                {/* EMAIL */}

                                <div className="mb-4">

                                    <label className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                        text-[#4b4d4d]
                                    ">
                                        Email
                                    </label>


                                    <input
                                        type="email"
                                        name="email"
                                        value={
                                            loginData.email
                                        }
                                        onChange={
                                            handleLoginChange
                                        }
                                        placeholder="you@example.com"
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-[#ded7d3]
                                            bg-[#f7f4ef]
                                            px-4
                                            py-3
                                            outline-none
                                            transition
                                            focus:border-[#896b57]
                                        "
                                    />

                                </div>


                                {/* PASSWORD */}

                                <div className="mb-6">

                                    <label className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                        text-[#4b4d4d]
                                    ">
                                        Password
                                    </label>


                                    <input
                                        type="password"
                                        name="password"
                                        value={
                                            loginData.password
                                        }
                                        onChange={
                                            handleLoginChange
                                        }
                                        placeholder="••••••••"
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-[#ded7d3]
                                            bg-[#f7f4ef]
                                            px-4
                                            py-3
                                            outline-none
                                            transition
                                            focus:border-[#896b57]
                                        "
                                    />

                                </div>


                                {/* LOGIN BUTTON */}

                                <button
                                    type="submit"
                                    className="
                                        w-full
                                        rounded-xl
                                        bg-[#896b57]
                                        py-3
                                        font-medium
                                        text-white
                                        transition
                                        hover:bg-[#765945]
                                    "
                                >
                                    Login
                                </button>


                                {/* SWITCH */}

                                <p className="
                                    mt-5
                                    text-center
                                    text-sm
                                    text-[#949494]
                                ">
                                    Don't have an account?{" "}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setModal("signup")
                                        }
                                        className="
                                            font-medium
                                            text-[#896b57]
                                            hover:underline
                                        "
                                    >
                                        Sign Up
                                    </button>

                                </p>

                            </form>

                        )}


                        {/* =================================================
                            SIGN UP
                        ================================================= */}

                        {modal === "signup" && (

                            <form
                                onSubmit={handleSignup}
                            >

                                <div className="mb-7">

                                    <p className="
                                        mb-2
                                        text-sm
                                        font-medium
                                        text-[#896b57]
                                    ">
                                        Get started
                                    </p>


                                    <h2 className="
                                        text-3xl
                                        font-bold
                                        text-[#4b4d4d]
                                    ">
                                        Create your account
                                    </h2>


                                    <p className="
                                        mt-2
                                        text-sm
                                        text-[#949494]
                                    ">
                                        Start taking control of your money today.
                                    </p>

                                </div>


                                {/* NAME */}

                                <div className="mb-4">

                                    <label className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                        text-[#4b4d4d]
                                    ">
                                        Name
                                    </label>


                                    <input
                                        type="text"
                                        name="name"
                                        value={
                                            signupData.name
                                        }
                                        onChange={
                                            handleSignupChange
                                        }
                                        placeholder="Your name"
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-[#ded7d3]
                                            bg-[#f7f4ef]
                                            px-4
                                            py-3
                                            outline-none
                                            transition
                                            focus:border-[#896b57]
                                        "
                                    />

                                </div>


                                {/* EMAIL */}

                                <div className="mb-4">

                                    <label className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                        text-[#4b4d4d]
                                    ">
                                        Email
                                    </label>


                                    <input
                                        type="email"
                                        name="email"
                                        value={
                                            signupData.email
                                        }
                                        onChange={
                                            handleSignupChange
                                        }
                                        placeholder="you@example.com"
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-[#ded7d3]
                                            bg-[#f7f4ef]
                                            px-4
                                            py-3
                                            outline-none
                                            transition
                                            focus:border-[#896b57]
                                        "
                                    />

                                </div>


                                {/* PASSWORD */}

                                <div className="mb-6">

                                    <label className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                        text-[#4b4d4d]
                                    ">
                                        Password
                                    </label>


                                    <input
                                        type="password"
                                        name="password"
                                        value={
                                            signupData.password
                                        }
                                        onChange={
                                            handleSignupChange
                                        }
                                        placeholder="••••••••"
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-[#ded7d3]
                                            bg-[#f7f4ef]
                                            px-4
                                            py-3
                                            outline-none
                                            transition
                                            focus:border-[#896b57]
                                        "
                                    />

                                </div>


                                {/* SIGN UP BUTTON */}

                                <button
                                    type="submit"
                                    className="
                                        w-full
                                        rounded-xl
                                        bg-[#896b57]
                                        py-3
                                        font-medium
                                        text-white
                                        transition
                                        hover:bg-[#765945]
                                    "
                                >
                                    Create Account
                                </button>


                                {/* SWITCH */}

                                <p className="
                                    mt-5
                                    text-center
                                    text-sm
                                    text-[#949494]
                                ">
                                    Already have an account?{" "}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setModal("login")
                                        }
                                        className="
                                            font-medium
                                            text-[#896b57]
                                            hover:underline
                                        "
                                    >
                                        Login
                                    </button>

                                </p>

                            </form>

                        )}

                    </div>

                </div>

            )}

        </>

    );
}

export default Navbar;