import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar({ ClassName = "" }) {

    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const navigate = useNavigate();

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const toggleProfile = () => {
        setProfileOpen(!profileOpen);
        setMenuOpen(false);
    };

    const closeProfile = () => {
        setProfileOpen(false);
    };

    const handleLogout = () => {
        setProfileOpen(false);
        setMenuOpen(false);

        navigate("/");
    };

    return (
        <>
            {/* ================================================= */}
            {/* DESKTOP SIDEBAR */}
            {/* ================================================= */}

            <aside
                className={`
                    hidden
                    md:flex
                    fixed
                    left-0
                    top-0
                    z-50
                    h-screen
                    w-[240px]
                    flex-col
                    bg-[#0d1b2a]
                    text-white
                    ${ClassName}
                `}
            >

                {/* Logo */}
                <div className="flex h-[80px] shrink-0 items-center px-8">

                    <NavLink
                        to="/dashboard"
                        className="flex items-center gap-3"
                    >

                        <div className="grid grid-cols-2 gap-1">

                            <div className="h-3 w-3 rounded-[3px] bg-[#ff7f7f]"></div>

                            <div className="h-3 w-3 rounded-[3px] bg-[#d98270]"></div>

                            <div className="h-3 w-3 rounded-[3px] bg-[#f08b83]"></div>

                            <div className="h-3 w-3 rounded-[3px] bg-[#e6a08c]"></div>

                        </div>

                        <span className="text-xl font-bold">
                            Munivo
                        </span>

                    </NavLink>

                </div>


                {/* Navigation */}
                <nav className="flex flex-1 flex-col gap-2 px-4 py-5">

                    <NavItem
                        Icon="ri-home-5-line"
                        Title="Dashboard"
                        Link="/dashboard"
                    />

                    <NavItem
                        Icon="ri-arrow-left-right-line"
                        Title="Transactions"
                        Link="/dashboard/transactions"
                    />

                    <NavItem
                        Icon="ri-focus-3-line"
                        Title="Budgets"
                        Link="/dashboard/budgets"
                    />

                    <NavItem
                        Icon="ri-flag-line"
                        Title="Goals"
                        Link="/dashboard/goals"
                    />

                    <NavItem
                        Icon="ri-bar-chart-line"
                        Title="Analytics"
                        Link="/dashboard/analytics"
                    />

                    <NavItem
                        Icon="ri-calendar-line"
                        Title="Recurring"
                        Link="/dashboard/recurring"
                    />

                    <NavItem
                        Icon="ri-file-chart-line"
                        Title="Reports"
                        Link="/dashboard/reports"
                    />

                    <NavItem
                        Icon="ri-settings-3-line"
                        Title="Settings"
                        Link="/dashboard/settings"
                    />

                </nav>


                {/* Bottom Message */}
                <div className="shrink-0 p-4">

                    <div className="rounded-xl bg-[#1b2d42] p-5">

                        <div className="mb-4 text-2xl">
                            🌱
                        </div>

                        <p className="text-sm leading-6 text-white">
                            Small steps
                            <br />
                            today, big dreams
                            <br />
                            tomorrow.
                        </p>

                        <div className="mt-4 h-[3px] w-8 rounded-full bg-[#f6c453]"></div>

                    </div>

                </div>

            </aside>


            {/* ================================================= */}
            {/* MOBILE NAVBAR */}
            {/* ================================================= */}

            <header
                className="
                    relative
                    z-50
                    flex
                    h-[70px]
                    w-full
                    items-center
                    justify-between
                    border-b
                    border-[#e5e1dc]
                    bg-[#f7f4ef]
                    px-5
                    md:hidden
                "
            >

                {/* Logo */}
                <NavLink
                    to="/dashboard"
                    onClick={() => {
                        closeMenu();
                        closeProfile();
                    }}
                    className="flex items-center gap-3"
                >

                    <div className="grid grid-cols-2 gap-1">

                        <div className="h-3 w-3 rounded-[3px] bg-[#ff7f7f]"></div>

                        <div className="h-3 w-3 rounded-[3px] bg-[#d98270]"></div>

                        <div className="h-3 w-3 rounded-[3px] bg-[#f08b83]"></div>

                        <div className="h-3 w-3 rounded-[3px] bg-[#e6a08c]"></div>

                    </div>

                    <span className="text-lg font-bold text-[#172033]">
                        Munivo
                    </span>

                </NavLink>


                {/* ================================================= */}
                {/* RIGHT SIDE */}
                {/* ================================================= */}

                <div className="flex items-center gap-2">

                    {/* Notification */}
                    <button
                        type="button"
                        className="
                            relative
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-lg
                            text-xl
                            text-[#172033]
                            hover:bg-[#ebe7e1]
                        "
                    >

                        <i className="ri-notification-3-line"></i>

                        <span
                            className="
                                absolute
                                right-2
                                top-2
                                h-2
                                w-2
                                rounded-full
                                bg-red-500
                            "
                        ></span>

                    </button>


                    {/* ================================================= */}
                    {/* USER / PROFILE BUTTON */}
                    {/* ================================================= */}

                    <button
                        type="button"
                        onClick={toggleProfile}
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-lg
                            text-xl
                            text-[#172033]
                            hover:bg-[#ebe7e1]
                        "
                    >

                        <i
                            className={
                                profileOpen
                                    ? "ri-close-line"
                                    : "ri-user-3-line"
                            }
                        ></i>

                    </button>


                    {/* Hamburger */}
                    <button
                        type="button"
                        onClick={() => {
                            setMenuOpen(!menuOpen);
                            setProfileOpen(false);
                        }}
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-lg
                            text-2xl
                            text-[#172033]
                            hover:bg-[#ebe7e1]
                        "
                    >

                        <i
                            className={
                                menuOpen
                                    ? "ri-close-line"
                                    : "ri-menu-line"
                            }
                        ></i>

                    </button>

                </div>

            </header>


            {/* ================================================= */}
            {/* PROFILE MODAL */}
            {/* ================================================= */}

            {profileOpen && (
                <>
                    {/* Overlay */}
                    <div
                        onClick={closeProfile}
                        className="
                            fixed
                            inset-0
                            z-40
                            bg-black/20
                            md:hidden
                        "
                    ></div>


                    {/* Profile Menu */}
                    <div
                        className="
                            fixed
                            right-5
                            top-[78px]
                            z-50
                            w-[260px]
                            rounded-2xl
                            border
                            border-[#e5e1dc]
                            bg-[#f7f4ef]
                            p-3
                            shadow-xl
                            md:hidden
                        "
                    >

                        {/* User Information */}
                        <div
                            className="
                                flex
                                items-center
                                gap-3
                                border-b
                                border-[#e5e1dc]
                                px-3
                                pb-4
                            "
                        >

                            {/* Avatar */}
                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-[#203854]
                                    text-lg
                                    text-white
                                "
                            >
                                <i className="ri-user-3-line"></i>
                            </div>


                            {/* User Details */}
                            <div>

                                <p className="text-sm font-semibold text-[#172033]">
                                    User
                                </p>

                                <p className="text-xs text-[#6b7280]">
                                    user@munivo.com
                                </p>

                            </div>

                        </div>


                        {/* Options */}
                        <div className="mt-2 flex flex-col gap-1">

                            {/* Profile */}
                            <button
                                type="button"
                                onClick={closeProfile}
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
                                    text-[#172033]
                                    transition
                                    hover:bg-[#ebe7e1]
                                "
                            >

                                <i className="ri-user-line text-lg text-[#896b57]"></i>

                                <span>
                                    Profile
                                </span>

                            </button>


                            {/* Settings */}
                            <button
                                type="button"
                                onClick={() => {
                                    closeProfile();
                                    navigate("/dashboard/settings");
                                }}
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
                                    text-[#172033]
                                    transition
                                    hover:bg-[#ebe7e1]
                                "
                            >

                                <i className="ri-settings-3-line text-lg text-[#896b57]"></i>

                                <span>
                                    Settings
                                </span>

                            </button>


                            {/* Privacy */}
                            <button
                                type="button"
                                onClick={closeProfile}
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
                                    text-[#172033]
                                    transition
                                    hover:bg-[#ebe7e1]
                                "
                            >

                                <i className="ri-shield-check-line text-lg text-[#896b57]"></i>

                                <span>
                                    Privacy
                                </span>

                            </button>


                            {/* Divider */}
                            <div className="my-1 h-px w-full bg-[#e5e1dc]"></div>


                            {/* Logout */}
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
                                    text-sm
                                    font-medium
                                    text-red-500
                                    transition
                                    hover:bg-red-50
                                "
                            >

                                <i className="ri-logout-box-r-line text-lg"></i>

                                <span>
                                    Logout
                                </span>

                            </button>

                        </div>

                    </div>
                </>
            )}


            {/* ================================================= */}
            {/* MOBILE MENU */}
            {/* ================================================= */}

            {menuOpen && (
                <>
                    {/* Overlay */}
                    <div
                        onClick={closeMenu}
                        className="
                            fixed
                            inset-0
                            z-40
                            bg-black/20
                            md:hidden
                        "
                    ></div>


                    {/* Menu */}
                    <div
                        className="
                            fixed
                            right-4
                            top-[78px]
                            z-50
                            w-[calc(100%-32px)]
                            max-w-[360px]
                            rounded-2xl
                            border
                            border-[#e5e1dc]
                            bg-[#f7f4ef]
                            p-3
                            shadow-xl
                            md:hidden
                        "
                    >

                        <div className="flex flex-col gap-1">

                            <MobileNavItem
                                Icon="ri-home-5-line"
                                Title="Dashboard"
                                Link="/dashboard"
                                closeMenu={closeMenu}
                            />

                            <MobileNavItem
                                Icon="ri-arrow-left-right-line"
                                Title="Transactions"
                                Link="/dashboard/transactions"
                                closeMenu={closeMenu}
                            />

                            <MobileNavItem
                                Icon="ri-focus-3-line"
                                Title="Budgets"
                                Link="/dashboard/budgets"
                                closeMenu={closeMenu}
                            />

                            <MobileNavItem
                                Icon="ri-flag-line"
                                Title="Goals"
                                Link="/dashboard/goals"
                                closeMenu={closeMenu}
                            />

                            <MobileNavItem
                                Icon="ri-bar-chart-line"
                                Title="Analytics"
                                Link="/dashboard/analytics"
                                closeMenu={closeMenu}
                            />

                            <MobileNavItem
                                Icon="ri-calendar-line"
                                Title="Recurring"
                                Link="/dashboard/recurring"
                                closeMenu={closeMenu}
                            />

                            <MobileNavItem
                                Icon="ri-file-chart-line"
                                Title="Reports"
                                Link="/dashboard/reports"
                                closeMenu={closeMenu}
                            />

                            <MobileNavItem
                                Icon="ri-settings-3-line"
                                Title="Settings"
                                Link="/dashboard/settings"
                                closeMenu={closeMenu}
                            />

                        </div>

                    </div>
                </>
            )}

        </>
    );
}


/* ================================================= */
/* DESKTOP NAV ITEM */
/* ================================================= */

function NavItem({ Icon, Title, Link }) {

    return (
        <NavLink
            to={Link}
            className={({ isActive }) => `
                flex
                w-full
                items-center
                gap-4
                rounded-xl
                px-4
                py-3
                text-left
                transition
                duration-200

                ${
                    isActive
                        ? "bg-[#203854] text-white"
                        : "text-[#d9e2ec] hover:bg-[#1d334d] hover:text-white"
                }
            `}
        >

            <i className={`${Icon} text-[20px]`}></i>

            <span className="text-[15px] font-medium">
                {Title}
            </span>

        </NavLink>
    );
}


/* ================================================= */
/* MOBILE NAV ITEM */
/* ================================================= */

function MobileNavItem({
    Icon,
    Title,
    Link,
    closeMenu
}) {

    return (
        <NavLink
            to={Link}
            onClick={closeMenu}
        >
            {({ isActive }) => (

                <div
                    className={`
                        flex
                        w-full
                        items-center
                        gap-4
                        rounded-xl
                        px-4
                        py-3
                        transition
                        duration-200

                        ${
                            isActive
                                ? "bg-[#203854] text-white"
                                : "text-[#172033] hover:bg-[#ebe7e1]"
                        }
                    `}
                >

                    {/* Icon */}
                    <div
                        className={`
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg

                            ${
                                isActive
                                    ? "bg-white/15"
                                    : "bg-[#e9e4dd]"
                            }
                        `}
                    >

                        <i className={`${Icon} text-lg`}></i>

                    </div>


                    {/* Title */}
                    <span className="text-sm font-medium">
                        {Title}
                    </span>

                </div>

            )}
        </NavLink>
    );
}


export default Navbar;