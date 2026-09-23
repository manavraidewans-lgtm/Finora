import { useEffect, useState } from "react";

import Navbar from "../../Components/Dashboard/Navbar.jsx";
import Top from "../../Components/Dashboard/Top.jsx";

import Details from "../../Components/Dashboard/Settings/ProfileSettings.jsx";



const defaultProfile = {
    name: "Manav Rai Dewan",
    email: "manav.dewan@email.com",
    phone: "+91 98765 43210",
    timezone: "Asia/Kolkata",
    currency: "INR (₹)",
    language: "English",
    image: "/profile.jpg",
};


function Settings() {

    const [profile, setProfile] = useState(() => {

        const savedProfile =
            localStorage.getItem("finoraProfile");

        if (savedProfile) {
            try {
                return JSON.parse(savedProfile);
            } catch {
                return defaultProfile;
            }
        }

        return defaultProfile;
    });


    // ================= PROFILE UPDATE LISTENER =================

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
                    "Profile loading error:",
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


    // ================= SAVE PROFILE =================

    const handleProfileSave = (updatedProfile) => {

        localStorage.setItem(
            "finoraProfile",
            JSON.stringify(updatedProfile)
        );


        setProfile(updatedProfile);


        // Update every component immediately
        window.dispatchEvent(
            new Event("profileUpdated")
        );

    };


    return (
        <div className="min-h-screen w-full bg-[#f7f4ef]">

            <Navbar
                profile={profile}
            />


            <main className="w-full lg:ml-60 lg:w-[calc(100%-240px)]">

                <Top
                    Icon="ri-settings-3-line"
                    Tittle="Settings"
                    Description="Manage your account, preferences and app settings"
                />


                <div className="p-2 pt-6 md:p-6 lg:p-8">

                    <Details
                        profile={profile}
                        onSave={handleProfileSave}
                    />

                </div>

            </main>


            

        </div>
    );
}


export default Settings;