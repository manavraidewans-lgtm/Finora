import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfileTop({ profile }) {

    const navigate = useNavigate();
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);


    //  ACTIONS 
    const handleLogout = () => {
        setSettingsOpen(false);
        navigate("/");
    };

    const handleHelp = () => {
        setSettingsOpen(false);
        setHelpOpen(true);
    };

    return (
        <>

            {/*  PROFILE TOP  */}
            <div className="hidden h-[12vh] w-full items-center justify-between bg-[#fbfcfd] px-6 lg:flex xl:px-10">


                {/* LEFT */}
                <div className="flex items-center gap-4">

                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#e5e5e5]">
                        <img
                            src={profile.image || "/profile.jpg"}
                            alt="Profile"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="flex min-w-0 flex-col">
                        <h2 className="max-w-62.5 truncate text-base font-semibold text-[#3c3f44]">
                            {profile.name}
                        </h2>

                        <p className="max-w-62.5 truncate text-sm text-[#949494]">
                            Personal Profile
                        </p>
                    </div>

                </div>




                {/* RIGHT */}
                <div className="relative flex items-center gap-3">



                    {/* Notifications */}
                    <button
                        type="button"
                        aria-label="Notifications"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-[#4b4d4d] transition hover:bg-[#f5f3f0]"
                    >
                        <i className="ri-notification-3-line text-lg" />
                    </button>



                    {/* Settings */}
                    <button
                        type="button"
                        aria-label="Settings"
                        onClick={() => setSettingsOpen(!settingsOpen)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-[#4b4d4d] transition hover:bg-[#f5f3f0]"
                    >
                        <i className="ri-settings-3-line text-lg" />
                    </button>



                    {/* SETTINGS MENU */}
                    {settingsOpen && (
                        <div className="absolute right-0 top-12 z-50 w-52 overflow-hidden rounded-xl border border-[#e5e5e5] bg-white p-1.5 shadow-lg">

                            <button
                                type="button"
                                onClick={handleHelp}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-[#4b4d4d] transition hover:bg-[#f5f3f0]"
                            >
                                <i className="ri-question-line text-lg" />
                                <span>Help & Support</span>
                            </button>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-[#d9534f] transition hover:bg-[#fff3f2]"
                            >
                                <i className="ri-logout-box-r-line text-lg" />
                                <span>Logout</span>
                            </button>

                        </div>
                    )}

                </div>

            </div>


            {/*  HELP POPUP  */}
            {helpOpen && (
                <div
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/30 px-5"
                    onClick={() => setHelpOpen(false)}
                >

                    <div
                        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* HEADER */}

                        <div className="mb-6 flex items-center justify-between">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f3f0] text-[#896b57]">
                                    <i className="ri-question-line text-xl" />
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-[#3c3f44]">
                                        Help & Support
                                    </h3>

                                    <p className="text-sm text-[#949494]">
                                        How can we help you?
                                    </p>
                                </div>

                            </div>

                            <button
                                type="button"
                                onClick={() => setHelpOpen(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-[#949494] transition hover:bg-[#f5f3f0] hover:text-[#4b4d4d]"
                            >
                                <i className="ri-close-line text-xl" />
                            </button>

                        </div>



                        {/* HELP CENTER */}
                        <button
                            type="button"
                            className="mb-3 flex w-full items-center gap-4 rounded-xl border border-[#e5e5e5] p-4 text-left transition hover:bg-[#f8f7f5]"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f3f0] text-[#896b57]">
                                <i className="ri-book-open-line text-lg" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-[#3c3f44]">
                                    Help Center
                                </p>

                                <p className="text-xs text-[#949494]">
                                    Find answers to common questions.
                                </p>
                            </div>
                        </button>




                        {/* CONTACT SUPPORT */}
                        <button
                            type="button"
                            className="flex w-full items-center gap-4 rounded-xl border border-[#e5e5e5] p-4 text-left transition hover:bg-[#f8f7f5]"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f3f0] text-[#896b57]">
                                <i className="ri-customer-service-2-line text-lg" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-[#3c3f44]">
                                    Contact Support
                                </p>

                                <p className="text-xs text-[#949494]">
                                    Get in touch with our support team.
                                </p>
                            </div>
                        </button>




                        {/* CLOSE */}
                        <button
                            type="button"
                            onClick={() => setHelpOpen(false)}
                            className="mt-5 w-full rounded-xl bg-[#896b57] py-3 text-sm font-semibold text-white transition hover:bg-[#795d4c]"
                        >
                            Close
                        </button>

                    </div>

                </div>
            )}

        </>
    );
}

export default ProfileTop;