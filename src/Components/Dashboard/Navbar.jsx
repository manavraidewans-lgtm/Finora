import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";


function Navbar({ ClassName = "" }) {

    const navigate = useNavigate();


    // ================= MENU =================

    const [menuOpen, setMenuOpen] = useState(false);

    const [profileOpen, setProfileOpen] = useState(false);

    const [popup, setPopup] = useState(null);


    // ================= PROFILE =================

    const [profile, setProfile] = useState(() => {

        const savedProfile =
            localStorage.getItem("finoraProfile");


        if (savedProfile) {

            try {

                return JSON.parse(savedProfile);

            } catch (error) {

                console.error(
                    "Profile loading error:",
                    error
                );

            }

        }


        return {
            name: "Manav Rai Dewan",
            email: "manav.dewan@email.com",
            phone: "+91 98765 43210",
            timezone: "Asia/Kolkata",
            currency: "INR (₹)",
            language: "English",
            image: "/profile.jpg",
        };

    });


    // ================= PROFILE SYNC =================

    useEffect(() => {

        const updateProfile = () => {

            const savedProfile =
                localStorage.getItem("finoraProfile");


            if (!savedProfile) return;


            try {

                setProfile(
                    JSON.parse(savedProfile)
                );

            } catch (error) {

                console.error(
                    "Navbar profile error:",
                    error
                );

            }

        };


        window.addEventListener(
            "profileUpdated",
            updateProfile
        );


        window.addEventListener(
            "storage",
            updateProfile
        );


        return () => {

            window.removeEventListener(
                "profileUpdated",
                updateProfile
            );


            window.removeEventListener(
                "storage",
                updateProfile
            );

        };

    }, []);


    // ================= NAVIGATION =================

    const goTo = (path) => {

        setMenuOpen(false);
        setProfileOpen(false);

        navigate(path);

    };


    // ================= PROFILE =================

    const handleProfileClick = () => {

        setProfileOpen((prev) => !prev);

        setPopup(null);

    };


    // ================= PRIVACY =================

    const openPrivacy = () => {

        setProfileOpen(false);
        setPopup("privacy");

    };


    // ================= SECURITY =================

    const openSecurity = () => {

        setProfileOpen(false);
        setPopup("security");

    };


    // ================= LOGOUT =================

    const handleLogout = () => {

        setProfileOpen(false);
        setMenuOpen(false);

        localStorage.removeItem("finoraLoggedIn");

        navigate("/");

    };


    // ================= CLOSE MENU =================

    const closeMenu = () => {

        setMenuOpen(false);

    };


    // ================= CLOSE POPUP =================

    const closePopup = () => {

        setPopup(null);

    };


    return (

        <>

            {/* =====================================================
                DESKTOP SIDEBAR
            ===================================================== */}

            <aside
                className={`
                    fixed
                    left-0
                    top-0
                    z-50
                    hidden
                    h-screen
                    w-64
                    flex-col
                    border-r
                    border-[#203044]
                    bg-[#101e2d]
                    lg:flex
                    ${ClassName}
                `}
            >

                {/* =================================================
                    LOGO
                ================================================= */}

                <div className="flex h-[12vh] items-center px-7">

                    <button
                        type="button"
                        onClick={() => goTo("/dashboard")}
                        className="flex items-center gap-2 text-xl font-bold tracking-tight text-white"
                    >

                        <span>
                            Finora
                        </span>

                        <span className="text-lg">
                            🍀
                        </span>

                    </button>

                </div>


                {/* =================================================
                    NAVIGATION
                ================================================= */}

                <nav className="flex flex-1 flex-col px-4">

                    <NavItem
                        to="/dashboard"
                        icon="ri-dashboard-line"
                        label="Dashboard"
                    />

                    <NavItem
                        to="/dashboard/transactions"
                        icon="ri-exchange-dollar-line"
                        label="Transactions"
                    />

                    <NavItem
                        to="/dashboard/budgets"
                        icon="ri-wallet-3-line"
                        label="Budgets"
                    />

                    <NavItem
                        to="/dashboard/goals"
                        icon="ri-focus-3-line"
                        label="Goals"
                    />

                    <NavItem
                        to="/dashboard/analytics"
                        icon="ri-bar-chart-box-line"
                        label="Analytics"
                    />

                    <NavItem
                        to="/dashboard/recurring"
                        icon="ri-repeat-line"
                        label="Recurring"
                    />

                    

                </nav>


                {/* =================================================
                    BOTTOM SECTION
                ================================================= */}

                <div className="border-t border-[#203044] p-4">

                    {/* ================= SETTINGS ================= */}

                    <button
                        type="button"
                        onClick={() =>
                            goTo("/dashboard/settings")
                        }
                        className="
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            py-3
                            text-left
                            text-sm
                            font-medium
                            text-[#c8d4e3]
                            transition
                            hover:bg-[#1b2c42]
                            hover:text-white
                        "
                    >

                        <i className="ri-settings-3-line text-xl"></i>

                        <span>
                            Settings
                        </span>

                    </button>


                    {/* ================= PROFILE ================= */}

                    <div className="relative mt-2">

                        <button
                            type="button"
                            onClick={handleProfileClick}
                            className="
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-xl
                                p-2
                                text-left
                                transition
                                hover:bg-[#1b2c42]
                            "
                        >

                            {/* PROFILE IMAGE */}

                            <div className="
                                h-10
                                w-10
                                shrink-0
                                overflow-hidden
                                rounded-full
                                border
                                border-[#34485e]
                                bg-[#24364b]
                            ">

                                <img
                                    src={
                                        profile?.image ||
                                        "/profile.jpg"
                                    }
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />

                            </div>


                            {/* PROFILE INFO */}

                            <div className="min-w-0 flex-1">

                                <p className="
                                    truncate
                                    text-sm
                                    font-semibold
                                    text-white
                                ">
                                    {profile?.name ||
                                        "Manav Rai Dewan"}
                                </p>

                                <p className="
                                    truncate
                                    text-xs
                                    text-[#91a3b8]
                                ">
                                    {profile?.email ||
                                        "manav.dewan@email.com"}
                                </p>

                            </div>


                            <i
                                className={`
                                    ri-arrow-up-s-line
                                    shrink-0
                                    text-lg
                                    text-[#9eb0c3]
                                    transition-transform
                                    ${
                                        profileOpen
                                            ? "rotate-180"
                                            : ""
                                    }
                                `}
                            ></i>

                        </button>


                        {/* =================================================
                            DESKTOP PROFILE MENU
                        ================================================= */}

                        {profileOpen && (

                            <div className="
                                absolute
                                bottom-[calc(100%+10px)]
                                left-0
                                z-[60]
                                w-full
                                min-w-[220px]
                                rounded-2xl
                                border
                                border-[#2b4056]
                                bg-[#16283b]
                                p-2
                                shadow-[0_18px_45px_rgba(0,0,0,0.30)]
                            ">

                                {/* PROFILE */}

                                <ProfileMenuItem
                                    icon="ri-user-line"
                                    label="Profile"
                                    onClick={() =>
                                        goTo(
                                            "/dashboard/settings"
                                        )
                                    }
                                />


                                {/* SETTINGS */}

                                <ProfileMenuItem
                                    icon="ri-settings-3-line"
                                    label="Settings"
                                    onClick={() =>
                                        goTo(
                                            "/dashboard/settings"
                                        )
                                    }
                                />


                                {/* PRIVACY */}

                                <ProfileMenuItem
                                    icon="ri-shield-check-line"
                                    label="Privacy"
                                    onClick={openPrivacy}
                                />


                                {/* SECURITY */}

                                <ProfileMenuItem
                                    icon="ri-lock-line"
                                    label="Security"
                                    onClick={openSecurity}
                                />


                                <div className="my-1 h-px bg-[#2b4056]"></div>


                                {/* LOGOUT */}

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        gap-3
                                        rounded-xl
                                        px-3
                                        py-3
                                        text-left
                                        transition
                                        hover:bg-[#2b2023]
                                    "
                                >

                                    <i className="
                                        ri-logout-box-r-line
                                        text-lg
                                        text-[#ff8d8d]
                                    "></i>

                                    <span className="
                                        text-sm
                                        font-medium
                                        text-[#ff9b9b]
                                    ">
                                        Logout
                                    </span>

                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </aside>


            {/* =====================================================
                MOBILE / TABLET NAVBAR
            ===================================================== */}

            <header
                className={`
                    fixed
                    left-0
                    top-0
                    z-50
                    flex
                    h-[8vh]
                    w-full
                    items-center
                    justify-between
                    border-b
                    border-[#203044]
                    bg-[#101e2d]
                    px-4
                    md:px-6
                    lg:hidden
                    ${ClassName}
                `}
            >

                {/* ================= LOGO ================= */}

                <button
                    type="button"
                    onClick={() =>
                        goTo("/dashboard")
                    }
                    className="
                        text-lg
                        font-bold
                        tracking-tight
                        text-white
                    "
                >

                    Finora

                    <span className="ml-1">
                        🍀
                    </span>

                </button>


                {/* ================= RIGHT ================= */}

                <div className="flex items-center gap-2">

                    {/* PROFILE */}

                    <button
                        type="button"
                        onClick={handleProfileClick}
                        className="
                            h-10
                            w-10
                            overflow-hidden
                            rounded-full
                            border
                            border-[#34485e]
                            bg-[#24364b]
                        "
                    >

                        <img
                            src={
                                profile?.image ||
                                "/profile.jpg"
                            }
                            alt="Profile"
                            className="h-full w-full object-cover"
                        />

                    </button>


                    {/* MENU */}

                    <button
                        type="button"
                        onClick={() =>
                            setMenuOpen((prev) => !prev)
                        }
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            text-[#d5dfeb]
                            transition
                            hover:bg-[#1b2c42]
                        "
                    >

                        <i
                            className={
                                menuOpen
                                    ? "ri-close-line text-2xl"
                                    : "ri-menu-line text-2xl"
                            }
                        ></i>

                    </button>

                </div>


                {/* =================================================
                    MOBILE PROFILE POPUP
                ================================================= */}

                {profileOpen && (

                    <div className="
                        absolute
                        right-4
                        top-[calc(100%+8px)]
                        z-[60]
                        w-60
                        rounded-2xl
                        border
                        border-[#2b4056]
                        bg-[#16283b]
                        p-3
                        shadow-[0_18px_45px_rgba(0,0,0,0.30)]
                        md:right-6
                    ">

                        {/* USER */}

                        <div className="
                            flex
                            items-center
                            gap-3
                            border-b
                            border-[#2b4056]
                            pb-3
                        ">

                            <div className="
                                h-11
                                w-11
                                shrink-0
                                overflow-hidden
                                rounded-full
                                border
                                border-[#34485e]
                            ">

                                <img
                                    src={
                                        profile?.image ||
                                        "/profile.jpg"
                                    }
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />

                            </div>


                            <div className="min-w-0">

                                <p className="
                                    truncate
                                    text-sm
                                    font-semibold
                                    text-white
                                ">
                                    {profile?.name ||
                                        "Manav Rai Dewan"}
                                </p>

                                <p className="
                                    truncate
                                    text-xs
                                    text-[#91a3b8]
                                ">
                                    {profile?.email ||
                                        "manav.dewan@email.com"}
                                </p>

                            </div>

                        </div>


                        {/* PROFILE */}

                        <ProfileMenuItem
                            icon="ri-user-line"
                            label="Profile"
                            onClick={() =>
                                goTo(
                                    "/dashboard/settings"
                                )
                            }
                        />


                        {/* SETTINGS */}

                        <ProfileMenuItem
                            icon="ri-settings-3-line"
                            label="Settings"
                            onClick={() =>
                                goTo(
                                    "/dashboard/settings"
                                )
                            }
                        />


                        {/* PRIVACY */}

                        <ProfileMenuItem
                            icon="ri-shield-check-line"
                            label="Privacy"
                            onClick={openPrivacy}
                        />


                        {/* SECURITY */}

                        <ProfileMenuItem
                            icon="ri-lock-line"
                            label="Security"
                            onClick={openSecurity}
                        />


                        <div className="my-1 h-px bg-[#2b4056]"></div>


                        {/* LOGOUT */}

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-xl
                                px-3
                                py-3
                                text-left
                                transition
                                hover:bg-[#2b2023]
                            "
                        >

                            <i className="
                                ri-logout-box-r-line
                                text-lg
                                text-[#ff8d8d]
                            "></i>

                            <span className="
                                text-sm
                                font-medium
                                text-[#ff9b9b]
                            ">
                                Logout
                            </span>

                        </button>

                    </div>

                )}

            </header>


            {/* =====================================================
                MOBILE / TABLET MENU
            ===================================================== */}

            {menuOpen && (

                <div className="
                    fixed
                    inset-x-0
                    top-[8vh]
                    z-40
                    max-h-[92vh]
                    overflow-y-auto
                    border-b
                    border-[#203044]
                    bg-[#101e2d]
                    p-4
                    shadow-[0_15px_35px_rgba(0,0,0,0.25)]
                    lg:hidden
                ">

                    <nav className="flex flex-col gap-1">

                        <MobileNavItem
                            to="/dashboard"
                            icon="ri-dashboard-line"
                            label="Dashboard"
                            onClick={closeMenu}
                        />

                        <MobileNavItem
                            to="/dashboard/transactions"
                            icon="ri-exchange-dollar-line"
                            label="Transactions"
                            onClick={closeMenu}
                        />

                        <MobileNavItem
                            to="/dashboard/budgets"
                            icon="ri-wallet-3-line"
                            label="Budgets"
                            onClick={closeMenu}
                        />

                        <MobileNavItem
                            to="/dashboard/goals"
                            icon="ri-focus-3-line"
                            label="Goals"
                            onClick={closeMenu}
                        />

                        <MobileNavItem
                            to="/dashboard/analytics"
                            icon="ri-bar-chart-box-line"
                            label="Analytics"
                            onClick={closeMenu}
                        />

                        <MobileNavItem
                            to="/dashboard/recurring"
                            icon="ri-repeat-line"
                            label="Recurring"
                            onClick={closeMenu}
                        />

                        


                        <div className="my-2 h-px bg-[#203044]"></div>


                        <MobileNavItem
                            to="/dashboard/settings"
                            icon="ri-settings-3-line"
                            label="Settings"
                            onClick={closeMenu}
                        />

                    </nav>

                </div>

            )}


            {/* =====================================================
                PRIVACY / SECURITY MODAL
            ===================================================== */}

            {popup && (

                <div
                    className="
                        fixed
                        inset-0
                        z-[100]
                        flex
                        items-center
                        justify-center
                        bg-black/40
                        px-4
                    "
                    onClick={closePopup}
                >

                    <div
                        className="
                            w-full
                            max-w-md
                            rounded-2xl
                            border
                            border-[#e4ded7]
                            bg-[#f8f5f0]
                            p-6
                            shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                        "
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* HEADER */}

                        <div className="flex items-start justify-between">

                            <div className="flex items-center gap-3">

                                <div className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-[#ebe5de]
                                ">

                                    <i
                                        className={
                                            popup === "privacy"
                                                ? "ri-shield-check-line text-xl text-[#896b57]"
                                                : "ri-lock-line text-xl text-[#896b57]"
                                        }
                                    ></i>

                                </div>

                                <div>

                                    <h2 className="
                                        text-lg
                                        font-semibold
                                        text-[#3f4345]
                                    ">

                                        {popup === "privacy"
                                            ? "Privacy"
                                            : "Security"}

                                    </h2>

                                    <p className="
                                        text-xs
                                        text-[#8a918f]
                                    ">

                                        {popup === "privacy"
                                            ? "Manage your privacy preferences."
                                            : "Keep your Finora account secure."}

                                    </p>

                                </div>

                            </div>


                            <button
                                type="button"
                                onClick={closePopup}
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-lg
                                    text-[#68747c]
                                    transition
                                    hover:bg-[#ebe5de]
                                "
                            >

                                <i className="ri-close-line text-xl"></i>

                            </button>

                        </div>


                        {/* CONTENT */}

                        {popup === "privacy" ? (

                            <div className="mt-6 space-y-3">

                                <div className="
                                    rounded-xl
                                    border
                                    border-[#e7e3de]
                                    bg-white
                                    p-4
                                ">

                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                    ">

                                        <div>

                                            <p className="
                                                text-sm
                                                font-semibold
                                                text-[#3f4345]
                                            ">
                                                Personal Information
                                            </p>

                                            <p className="
                                                mt-1
                                                text-xs
                                                text-[#8a918f]
                                            ">
                                                Your profile information is stored locally.
                                            </p>

                                        </div>

                                        <i className="
                                            ri-user-line
                                            text-lg
                                            text-[#896b57]
                                        "></i>

                                    </div>

                                </div>


                                <div className="
                                    rounded-xl
                                    border
                                    border-[#e7e3de]
                                    bg-white
                                    p-4
                                ">

                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                    ">

                                        <div>

                                            <p className="
                                                text-sm
                                                font-semibold
                                                text-[#3f4345]
                                            ">
                                                Data Storage
                                            </p>

                                            <p className="
                                                mt-1
                                                text-xs
                                                text-[#8a918f]
                                            ">
                                                Finora currently uses local browser storage.
                                            </p>

                                        </div>

                                        <i className="
                                            ri-database-2-line
                                            text-lg
                                            text-[#896b57]
                                        "></i>

                                    </div>

                                </div>

                            </div>

                        ) : (

                            <div className="mt-6 space-y-3">

                                <div className="
                                    rounded-xl
                                    border
                                    border-[#e7e3de]
                                    bg-white
                                    p-4
                                ">

                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                    ">

                                        <div>

                                            <p className="
                                                text-sm
                                                font-semibold
                                                text-[#3f4345]
                                            ">
                                                Account Security
                                            </p>

                                            <p className="
                                                mt-1
                                                text-xs
                                                text-[#8a918f]
                                            ">
                                                Your account settings are protected.
                                            </p>

                                        </div>

                                        <i className="
                                            ri-shield-check-line
                                            text-lg
                                            text-[#896b57]
                                        "></i>

                                    </div>

                                </div>


                                <div className="
                                    rounded-xl
                                    border
                                    border-[#e7e3de]
                                    bg-white
                                    p-4
                                ">

                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                    ">

                                        <div>

                                            <p className="
                                                text-sm
                                                font-semibold
                                                text-[#3f4345]
                                            ">
                                                Password
                                            </p>

                                            <p className="
                                                mt-1
                                                text-xs
                                                text-[#8a918f]
                                            ">
                                                Password management can be added here later.
                                            </p>

                                        </div>

                                        <i className="
                                            ri-key-2-line
                                            text-lg
                                            text-[#896b57]
                                        "></i>

                                    </div>

                                </div>

                            </div>

                        )}


                        {/* CLOSE */}

                        <button
                            type="button"
                            onClick={closePopup}
                            className="
                                mt-6
                                w-full
                                rounded-xl
                                bg-[#896b57]
                                px-4
                                py-3
                                text-sm
                                font-medium
                                text-white
                                transition
                                hover:bg-[#795d4b]
                            "
                        >
                            Close
                        </button>

                    </div>

                </div>

            )}

        </>

    );

}


/* =========================================================
   PROFILE MENU ITEM
========================================================= */

function ProfileMenuItem({
    icon,
    label,
    onClick,
}) {

    return (

        <button
            type="button"
            onClick={onClick}
            className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-3
                py-3
                text-left
                transition
                hover:bg-[#20354b]
            "
        >

            <i className={`
                ${icon}
                text-lg
                text-[#9db5d0]
            `}></i>

            <span className="
                text-sm
                font-medium
                text-[#d9e2ed]
            ">
                {label}
            </span>

        </button>

    );

}


/* =========================================================
   DESKTOP NAV ITEM
========================================================= */

function NavItem({
    to,
    icon,
    label,
}) {

    return (

        <NavLink
            to={to}
            end={to === "/dashboard"}
            className={({ isActive }) =>
                `
                mb-1
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3.5
                text-sm
                font-medium
                transition-all
                duration-200
                ${
                    isActive
                        ? "bg-[#243b55] text-white shadow-[inset_3px_0_0_#7da2d1]"
                        : "text-[#b9c8d8] hover:bg-[#1b2c42] hover:text-white"
                }
                `
            }
        >

            <i
                className={`
                    ${icon}
                    text-xl
                    ${
                        "text-[#c7d5e5]"
                    }
                `}
            ></i>

            <span>
                {label}
            </span>

        </NavLink>

    );

}


/* =========================================================
   MOBILE NAV ITEM
========================================================= */

function MobileNavItem({
    to,
    icon,
    label,
    onClick,
}) {

    return (

        <NavLink
            to={to}
            end={to === "/dashboard"}
            onClick={onClick}
            className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3.5
                text-sm
                font-medium
                transition
                ${
                    isActive
                        ? "bg-[#243b55] text-white"
                        : "text-[#b9c8d8] hover:bg-[#1b2c42] hover:text-white"
                }
                `
            }
        >

            <i className={`${icon} text-xl`}></i>

            <span>
                {label}
            </span>

        </NavLink>

    );

}


export default Navbar;