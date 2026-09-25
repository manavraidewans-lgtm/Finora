import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [modal, setModal] = useState(null);

    const [loginData, setLoginData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
    });



    //  MENU 
    const closeMenu = () => setMenuOpen(false);

    const openModal = (type) => {
        setModal(type);
        setMenuOpen(false);
    };

    const closeModal = () => setModal(null);



    //  INPUTS 
    const handleLoginChange = (e) => {
        const { name, value } = e.target;

        setLoginData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSignupChange = (e) => {
        const { name, value } = e.target;

        setSignupData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    

    //  PROFILE 
    const saveProfile = ({ name, email }) => {

        let profile = {};

        try {
            profile = JSON.parse(
                localStorage.getItem("finoraProfile") || "{}"
            );
        } catch {
            profile = {};
        }

        localStorage.setItem(
            "finoraProfile",
            JSON.stringify({
                ...profile,
                name: name || profile.name || "User",
                email: email || profile.email || "",
            })
        );

        window.dispatchEvent(new Event("profileUpdated"));
    };



    //  LOGIN 
    const handleLogin = (e) => {

        e.preventDefault();

        const name = loginData.name.trim();
        const email = loginData.email.trim();

        if (!name) return alert("Please enter your name.");
        if (!email) return alert("Please enter your email.");

        saveProfile({ name, email });

        localStorage.setItem("finoraLoggedIn", "true");

        setLoginData({
            name: "",
            email: "",
            password: "",
        });

        setModal(null);
        navigate("/dashboard");
    };



    //  SIGN UP 
    const handleSignup = (e) => {

        e.preventDefault();

        const name = signupData.name.trim();
        const email = signupData.email.trim();

        if (!name) return alert("Please enter your name.");
        if (!email) return alert("Please enter your email.");

        saveProfile({ name, email });

        localStorage.setItem("finoraLoggedIn", "true");

        setSignupData({
            name: "",
            email: "",
            password: "",
        });

        setModal(null);
        navigate("/dashboard");
    };



    //  FORM 
    const isLogin = modal === "login";
    const formData = isLogin ? loginData : signupData;
    const handleChange = isLogin
        ? handleLoginChange
        : handleSignupChange;

    const handleSubmit = isLogin
        ? handleLogin
        : handleSignup;


    return (
        <>

            {/*  NAVBAR  */}

            <nav className="
                fixed left-0 top-0 z-50 flex h-20 w-full
                items-center justify-between bg-[#f8f5f0]
                px-6 md:px-10 lg:px-16
            ">

                {/* LOGO */}

                <Link
                    to="/"
                    onClick={closeMenu}
                    className="text-xl font-bold text-[#4b4d4d] md:text-2xl"
                >
                    Finora 🍀
                </Link>


                {/* DESKTOP NAVIGATION */}

                <div className="hidden items-center gap-8 md:flex">

                    {[
                        ["/", "Home"],
                        ["/about", "About"],
                        ["/features", "Features"],
                    ].map(([path, text]) => (
                        <Link
                            key={path}
                            to={path}
                            className="text-[#4b4d4d] transition-colors hover:text-[#896b57]"
                        >
                            {text}
                        </Link>
                    ))}

                </div>


                {/* DESKTOP ACTIONS */}

                <div className="hidden items-center gap-5 md:flex">

                    <button
                        onClick={() => openModal("login")}
                        className="text-[#4b4d4d] transition-colors hover:text-[#896b57]"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => openModal("signup")}
                        className="rounded-lg bg-[#896b57] px-5 py-2.5 text-white transition-colors hover:bg-[#765945]"
                    >
                        Sign Up
                    </button>

                </div>


                {/* HAMBURGER */}

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex flex-col gap-1.5 p-2 md:hidden"
                    aria-label="Toggle menu"
                >
                    <span
                        className={`
                            h-0.5 w-6 bg-[#4b4d4d] transition-all duration-300
                            ${menuOpen ? "translate-y-2 rotate-45" : ""}
                        `}
                    />

                    <span
                        className={`
                            h-0.5 w-6 bg-[#4b4d4d] transition-all duration-300
                            ${menuOpen ? "opacity-0" : ""}
                        `}
                    />

                    <span
                        className={`
                            h-0.5 w-6 bg-[#4b4d4d] transition-all duration-300
                            ${menuOpen ? "-translate-y-2 -rotate-45" : ""}
                        `}
                    />
                </button>


                {/* MOBILE MENU */}

                {menuOpen && (
                    <div className="
                        absolute left-0 top-20 w-full border-t
                        border-[#dedad4] bg-[#f8f5f0] px-6 py-6 md:hidden
                    ">

                        <div className="flex flex-col gap-5">

                            {[
                                ["/", "Home"],
                                ["/about", "About"],
                                ["/features", "Features"],
                            ].map(([path, text]) => (
                                <Link
                                    key={path}
                                    to={path}
                                    onClick={closeMenu}
                                    className="text-[#4b4d4d] hover:text-[#896b57]"
                                >
                                    {text}
                                </Link>
                            ))}

                            <div className="h-px w-full bg-[#dedad4]" />

                            <button
                                onClick={() => openModal("login")}
                                className="text-left text-[#4b4d4d] hover:text-[#896b57]"
                            >
                                Login
                            </button>

                            <button
                                onClick={() => openModal("signup")}
                                className="w-full rounded-lg bg-[#896b57] px-5 py-2.5 text-center text-white"
                            >
                                Sign Up
                            </button>

                        </div>

                    </div>
                )}

            </nav>


            {/*  MODAL  */}

            {modal && (
                <div
                    className="
                        fixed inset-0 z-100 flex h-full w-full
                        items-center justify-center overflow-y-auto
                        bg-black/40 px-4 py-6 backdrop-blur
                    "
                    onClick={closeModal}
                >

                    <div
                        className="
                            relative max-h-[90vh] w-full overflow-y-auto
                            rounded-2xl bg-[#f8f5f0] p-6 shadow-2xl
                            md:w-[85%] md:p-8 lg:w-[60%]
                        "
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* CLOSE */}

                        <button
                            onClick={closeModal}
                            className="
                                absolute right-4 top-4 flex h-9 w-9
                                items-center justify-center rounded-full
                                text-xl text-[#4b4d4d] transition
                                hover:bg-[#e9e5df]
                            "
                        >
                            <i className="ri-close-line" />
                        </button>


                        {/*  FORM  */}

                        <form onSubmit={handleSubmit}>

                            <div className="mb-7">

                                <p className="mb-2 text-sm font-medium text-[#896b57]">
                                    {isLogin ? "Welcome back" : "Get started"}
                                </p>

                                <h2 className="text-3xl font-bold text-[#4b4d4d]">
                                    {isLogin
                                        ? "Login to Finora"
                                        : "Create your account"}
                                </h2>

                                <p className="mt-2 text-sm text-[#949494]">
                                    {isLogin
                                        ? "Continue managing your finances with ease."
                                        : "Start taking control of your money today."}
                                </p>

                            </div>


                            {/* INPUTS */}

                            {[
                                {
                                    name: "name",
                                    label: "Name",
                                    type: "text",
                                    placeholder: "Your name",
                                },
                                {
                                    name: "email",
                                    label: "Email",
                                    type: "email",
                                    placeholder: "you@example.com",
                                },
                                {
                                    name: "password",
                                    label: "Password",
                                    type: "password",
                                    placeholder: "••••••••",
                                },
                            ].map((field, index) => (
                                <div
                                    key={field.name}
                                    className={index === 2 ? "mb-6" : "mb-4"}
                                >

                                    <label className="mb-2 block text-sm font-medium text-[#4b4d4d]">
                                        {field.label}
                                    </label>

                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        placeholder={field.placeholder}
                                        className="
                                            w-full rounded-xl border
                                            border-[#ded7d3] bg-[#f7f4ef]
                                            px-4 py-3 outline-none transition
                                            focus:border-[#896b57]
                                        "
                                    />

                                </div>
                            ))}


                            {/* SUBMIT */}

                            <button
                                type="submit"
                                className="
                                    w-full rounded-xl bg-[#896b57]
                                    py-3 font-medium text-white
                                    transition hover:bg-[#765945]
                                "
                            >
                                {isLogin ? "Login" : "Create Account"}
                            </button>


                            {/* SWITCH */}

                            <p className="mt-5 text-center text-sm text-[#949494]">

                                {isLogin
                                    ? "Don't have an account?"
                                    : "Already have an account?"}

                                {" "}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setModal(isLogin ? "signup" : "login")
                                    }
                                    className="font-medium text-[#896b57] hover:underline"
                                >
                                    {isLogin ? "Sign Up" : "Login"}
                                </button>

                            </p>

                        </form>

                    </div>

                </div>
            )}

        </>
    );
}

export default Navbar;