import { useEffect, useState } from "react";
import Background from "../../../assets/dash.png";

function First() {
    const [profile, setProfile] = useState(() => {
        const savedProfile = localStorage.getItem("finoraProfile");

        if (savedProfile) {
            try {
                return JSON.parse(savedProfile);
            } catch (error) {
                console.error("Profile loading error:", error);
            }
        }

        return { name: "Manav Rai Dewan" };
    });


    //  PROFILE SYNC 
    useEffect(() => {
        const updateProfile = () => {
            const savedProfile = localStorage.getItem("finoraProfile");

            if (!savedProfile) return;

            try {
                setProfile(JSON.parse(savedProfile));
            } catch (error) {
                console.error("Profile data error:", error);
            }
        };

        window.addEventListener("profileUpdated", updateProfile);
        window.addEventListener("storage", updateProfile);

        return () => {
            window.removeEventListener("profileUpdated", updateProfile);
            window.removeEventListener("storage", updateProfile);
        };
    }, []);

    return (
        <div className="flex w-full flex-col gap-5 p-2 md:gap-3 lg:gap-1">

            {/* TOP */}
            <div
                className="relative flex min-h-25 w-full flex-col items-start justify-between overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat p-5 sm:min-h-20 sm:p-6 md:min-h-25 md:p-8 lg:min-h-40 lg:p-7 xl:min-h-45 xl:p-8"
                style={{ backgroundImage: `url(${Background})` }}
            >
                {/* CONTENT */}
                <div className="relative z-10 flex w-full flex-col items-start gap-2 sm:gap-1">
                    <p className="text-xs font-medium tracking-wide text-[#896b57] sm:text-sm md:text-base">
                        Welcome back
                    </p>

                    <h1 className="max-w-full wrap-break-words text-2xl font-semibold leading-tight tracking-tight text-[#3f4345] sm:text-3xl md:max-w-[75%] md:text-4xl lg:max-w-[65%] lg:text-4xl xl:text-5xl">
                        Hello, {profile?.name || "Manav"}
                    </h1>
                </div>

                {/* DESCRIPTION */}
                <p className="relative z-10 max-w-70 text-xs font-medium leading-relaxed text-[#68716f] sm:max-w-85 sm:text-sm md:max-w-105 md:text-base lg:max-w-112.5 lg:text-sm xl:text-base">
                    Here's your financial overview for this month
                </p>
            </div>

        </div>
    );
}

export default First;