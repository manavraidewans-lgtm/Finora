import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar({ ClassName = "" }) {
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [popup, setPopup] = useState(null);



    //  PROFILE 
    const [profile, setProfile] = useState(() => {
        const saved = localStorage.getItem("finoraProfile");

        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (error) {
                console.error("Profile loading error:", error);
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




    //  PROFILE SYNC 
    useEffect(() => {
        const updateProfile = () => {
            const saved = localStorage.getItem("finoraProfile");

            if (!saved) return;

            try {
                setProfile(JSON.parse(saved));
            } catch (error) {
                console.error("Navbar profile error:", error);
            }
        };

        window.addEventListener("profileUpdated", updateProfile);
        window.addEventListener("storage", updateProfile);

        return () => {
            window.removeEventListener("profileUpdated", updateProfile);
            window.removeEventListener("storage", updateProfile);
        };
    }, []);




    //  ACTIONS 
    const goTo = (path) => {
        setMenuOpen(false);
        setProfileOpen(false);
        navigate(path);
    };

    const handleProfileClick = () => {
        setProfileOpen((prev) => !prev);
        setPopup(null);
    };

    const openPrivacy = () => {
        setProfileOpen(false);
        setPopup("privacy");
    };

    const openSecurity = () => {
        setProfileOpen(false);
        setPopup("security");
    };

    const handleLogout = () => {
        setProfileOpen(false);
        setMenuOpen(false);
        localStorage.removeItem("finoraLoggedIn");
        navigate("/");
    };

    const closeMenu = () => setMenuOpen(false);
    const closePopup = () => setPopup(null);

    return (
        <>

            {/*  DESKTOP SIDEBAR  */}
            <aside
                className={`
                    fixed left-0 top-0 z-50 hidden h-screen w-64
                    flex-col border-r border-[#203044] bg-[#101e2d]
                    lg:flex ${ClassName}
                `}
            >

                {/* LOGO */}
                <div className="flex h-[12vh] items-center px-7">
                    <button
                        type="button"
                        onClick={() => goTo("/dashboard")}
                        className="flex items-center gap-2 text-xl font-bold tracking-tight text-white"
                    >
                        Finora <span className="text-lg">🍀</span>
                    </button>
                </div>

                {/* NAVIGATION */}
                <nav className="flex flex-1 flex-col px-4">
                    <NavItem to="/dashboard" icon="ri-dashboard-line" label="Dashboard" />
                    <NavItem to="/dashboard/transactions" icon="ri-exchange-dollar-line" label="Transactions" />
                    <NavItem to="/dashboard/budgets" icon="ri-wallet-3-line" label="Budgets" />
                    <NavItem to="/dashboard/goals" icon="ri-focus-3-line" label="Goals" />
                    <NavItem to="/dashboard/analytics" icon="ri-bar-chart-box-line" label="Analytics" />
                    <NavItem to="/dashboard/recurring" icon="ri-repeat-line" label="Recurring" />
                </nav>

                {/* BOTTOM */}
                <div className="border-t border-[#203044] p-4">

                    {/* SETTINGS */}
                    <button
                        type="button"
                        onClick={() => goTo("/dashboard/settings")}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-[#c8d4e3] transition hover:bg-[#1b2c42] hover:text-white"
                    >
                        <i className="ri-settings-3-line text-xl"></i>
                        Settings
                    </button>

                    {/* PROFILE */}
                    <div className="relative mt-2">
                        <button
                            type="button"
                            onClick={handleProfileClick}
                            className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-[#1b2c42]"
                        >
                            <ProfileImage profile={profile} />

                            <ProfileInfo profile={profile} />

                            <i
                                className={`
                                    ri-arrow-up-s-line shrink-0 text-lg text-[#9eb0c3]
                                    transition-transform
                                    ${profileOpen ? "rotate-180" : ""}
                                `}
                            ></i>
                        </button>

                        {/* DESKTOP PROFILE MENU */}
                        {profileOpen && (
                            <ProfileMenu
                                goTo={goTo}
                                openPrivacy={openPrivacy}
                                openSecurity={openSecurity}
                                handleLogout={handleLogout}
                            />
                        )}
                    </div>
                </div>
            </aside>


            {/*  MOBILE NAVBAR  */}

            <header
                className={`
                    fixed left-0 top-0 z-50 flex h-[8vh] w-full
                    items-center justify-between border-b border-[#203044]
                    bg-[#101e2d] px-4 md:px-6 lg:hidden ${ClassName}
                `}
            >

                <button
                    type="button"
                    onClick={() => goTo("/dashboard")}
                    className="text-lg font-bold tracking-tight text-white"
                >
                    Finora <span className="ml-1">🍀</span>
                </button>

                <div className="flex items-center gap-2">

                    {/* PROFILE */}
                    <button
                        type="button"
                        onClick={handleProfileClick}
                        className="h-10 w-10 overflow-hidden rounded-full border border-[#34485e] bg-[#24364b]"
                    >
                        <img
                            src={profile?.image || "/profile.jpg"}
                            alt="Profile"
                            className="h-full w-full object-cover"
                        />
                    </button>

                    {/* MENU */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-[#d5dfeb] transition hover:bg-[#1b2c42]"
                    >
                        <i className={menuOpen ? "ri-close-line text-2xl" : "ri-menu-line text-2xl"}></i>
                    </button>
                </div>

                {/* MOBILE PROFILE POPUP */}
                {profileOpen && (
                    <div className="absolute right-4 top-[calc(100%+8px)] z-60 w-60 rounded-2xl border border-[#2b4056] bg-[#16283b] p-3 shadow-[0_18px_45px_rgba(0,0,0,0.30)] md:right-6">

                        <div className="flex items-center gap-3 border-b border-[#2b4056] pb-3">
                            <ProfileImage profile={profile} size="large" />
                            <ProfileInfo profile={profile} />
                        </div>

                        <ProfileMenuItem
                            icon="ri-user-line"
                            label="Profile"
                            onClick={() => goTo("/dashboard/settings")}
                        />

                        <ProfileMenuItem
                            icon="ri-settings-3-line"
                            label="Settings"
                            onClick={() => goTo("/dashboard/settings")}
                        />

                        <ProfileMenuItem
                            icon="ri-shield-check-line"
                            label="Privacy"
                            onClick={openPrivacy}
                        />

                        <ProfileMenuItem
                            icon="ri-lock-line"
                            label="Security"
                            onClick={openSecurity}
                        />

                        <LogoutButton handleLogout={handleLogout} />
                    </div>
                )}
            </header>


            {/*  MOBILE MENU  */}

            {menuOpen && (
                <div className="fixed inset-x-0 top-[8vh] z-40 max-h-[92vh] overflow-y-auto border-b border-[#203044] bg-[#101e2d] p-4 shadow-[0_15px_35px_rgba(0,0,0,0.25)] lg:hidden">

                    <nav className="flex flex-col gap-1">
                        <MobileNavItem to="/dashboard" icon="ri-dashboard-line" label="Dashboard" onClick={closeMenu} />
                        <MobileNavItem to="/dashboard/transactions" icon="ri-exchange-dollar-line" label="Transactions" onClick={closeMenu} />
                        <MobileNavItem to="/dashboard/budgets" icon="ri-wallet-3-line" label="Budgets" onClick={closeMenu} />
                        <MobileNavItem to="/dashboard/goals" icon="ri-focus-3-line" label="Goals" onClick={closeMenu} />
                        <MobileNavItem to="/dashboard/analytics" icon="ri-bar-chart-box-line" label="Analytics" onClick={closeMenu} />
                        <MobileNavItem to="/dashboard/recurring" icon="ri-repeat-line" label="Recurring" onClick={closeMenu} />

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


            {/*  PRIVACY / SECURITY MODAL  */}

            {popup && (
                <div
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4"
                    onClick={closePopup}
                >
                    <div
                        className="w-full max-w-md rounded-2xl border border-[#e4ded7] bg-[#f8f5f0] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* HEADER */}
                        <div className="flex items-start justify-between">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ebe5de]">
                                    <i
                                        className={
                                            popup === "privacy"
                                                ? "ri-shield-check-line text-xl text-[#896b57]"
                                                : "ri-lock-line text-xl text-[#896b57]"
                                        }
                                    ></i>
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-[#3f4345]">
                                        {popup === "privacy" ? "Privacy" : "Security"}
                                    </h2>

                                    <p className="text-xs text-[#8a918f]">
                                        {popup === "privacy"
                                            ? "Manage your privacy preferences."
                                            : "Keep your Finora account secure."}
                                    </p>
                                </div>

                            </div>

                            <button
                                type="button"
                                onClick={closePopup}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#68747c] transition hover:bg-[#ebe5de]"
                            >
                                <i className="ri-close-line text-xl"></i>
                            </button>

                        </div>


                        {/* CONTENT */}
                        {popup === "privacy" ? (
                            <div className="mt-6 space-y-3">

                                <InfoBox
                                    title="Personal Information"
                                    text="Your profile information is stored locally."
                                    icon="ri-user-line"
                                />

                                <InfoBox
                                    title="Data Storage"
                                    text="Finora currently uses local browser storage."
                                    icon="ri-database-2-line"
                                />

                            </div>
                        ) : (
                            <div className="mt-6 space-y-3">

                                <InfoBox
                                    title="Account Security"
                                    text="Your account settings are protected."
                                    icon="ri-shield-check-line"
                                />

                                <InfoBox
                                    title="Password"
                                    text="Password management can be added here later."
                                    icon="ri-key-2-line"
                                />

                            </div>
                        )}

                        <button
                            type="button"
                            onClick={closePopup}
                            className="mt-6 w-full rounded-xl bg-[#896b57] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#795d4b]"
                        >
                            Close
                        </button>

                    </div>
                </div>
            )}
        </>
    );
}


/*  PROFILE IMAGE  */

function ProfileImage({ profile, size = "normal" }) {
    return (
        <div
            className={
                size === "large"
                    ? "h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#34485e]"
                    : "h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#34485e] bg-[#24364b]"
            }
        >
            <img
                src={profile?.image || "/profile.jpg"}
                alt="Profile"
                className="h-full w-full object-cover"
            />
        </div>
    );
}


/*  PROFILE INFO  */

function ProfileInfo({ profile }) {
    return (
        <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
                {profile?.name || "Manav Rai Dewan"}
            </p>

            <p className="truncate text-xs text-[#91a3b8]">
                {profile?.email || "manav.dewan@email.com"}
            </p>
        </div>
    );
}


/*  PROFILE MENU  */

function ProfileMenu({
    goTo,
    openPrivacy,
    openSecurity,
    handleLogout,
}) {
    return (
        <div className="absolute bottom-[calc(100%+10px)] left-0 z-[60] w-full min-w-[220px] rounded-2xl border border-[#2b4056] bg-[#16283b] p-2 shadow-[0_18px_45px_rgba(0,0,0,0.30)]">

            <ProfileMenuItem
                icon="ri-user-line"
                label="Profile"
                onClick={() => goTo("/dashboard/settings")}
            />

            <ProfileMenuItem
                icon="ri-settings-3-line"
                label="Settings"
                onClick={() => goTo("/dashboard/settings")}
            />

            <ProfileMenuItem
                icon="ri-shield-check-line"
                label="Privacy"
                onClick={openPrivacy}
            />

            <ProfileMenuItem
                icon="ri-lock-line"
                label="Security"
                onClick={openSecurity}
            />

            <LogoutButton handleLogout={handleLogout} />
        </div>
    );
}


/*  PROFILE MENU ITEM  */

function ProfileMenuItem({ icon, label, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-[#20354b]"
        >
            <i className={`${icon} text-lg text-[#9db5d0]`}></i>
            <span className="text-sm font-medium text-[#d9e2ed]">
                {label}
            </span>
        </button>
    );
}


// LOGOUT  

function LogoutButton({ handleLogout }) {
    return (
        <button
            type="button"
            onClick={handleLogout}
            className="mt-1 flex w-full items-center gap-3 rounded-xl border-t border-[#2b4056] px-3 py-3 text-left transition hover:bg-[#2b2023]"
        >
            <i className="ri-logout-box-r-line text-lg text-[#ff8d8d]"></i>

            <span className="text-sm font-medium text-[#ff9b9b]">
                Logout
            </span>
        </button>
    );
}


/*  INFO BOX  */

function InfoBox({ title, text, icon }) {
    return (
        <div className="rounded-xl border border-[#e7e3de] bg-white p-4">
            <div className="flex items-center justify-between">

                <div>
                    <p className="text-sm font-semibold text-[#3f4345]">
                        {title}
                    </p>

                    <p className="mt-1 text-xs text-[#8a918f]">
                        {text}
                    </p>
                </div>

                <i className={`${icon} text-lg text-[#896b57]`}></i>
            </div>
        </div>
    );
}


/*  DESKTOP NAV ITEM  */

function NavItem({ to, icon, label }) {
    return (
        <NavLink
            to={to}
            end={to === "/dashboard"}
            className={({ isActive }) => `
                mb-1 flex items-center gap-3 rounded-xl px-4 py-3.5
                text-sm font-medium transition-all duration-200
                ${
                    isActive
                        ? "bg-[#243b55] text-white shadow-[inset_3px_0_0_#7da2d1]"
                        : "text-[#b9c8d8] hover:bg-[#1b2c42] hover:text-white"
                }
            `}
        >
            <i className={`${icon} text-xl`}></i>
            <span>{label}</span>
        </NavLink>
    );
}


/*  MOBILE NAV ITEM  */

function MobileNavItem({ to, icon, label, onClick }) {
    return (
        <NavLink
            to={to}
            end={to === "/dashboard"}
            onClick={onClick}
            className={({ isActive }) => `
                flex items-center gap-3 rounded-xl px-4 py-3.5
                text-sm font-medium transition
                ${
                    isActive
                        ? "bg-[#243b55] text-white"
                        : "text-[#b9c8d8] hover:bg-[#1b2c42] hover:text-white"
                }
            `}
        >
            <i className={`${icon} text-xl`}></i>
            <span>{label}</span>
        </NavLink>
    );
}

export default Navbar;