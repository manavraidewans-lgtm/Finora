import { useEffect, useRef, useState } from "react";


function ProfileSettings({ profile, onSave }) {

    const fileInputRef = useRef(null);


    // ================= FORM DATA =================

    const [formData, setFormData] = useState(profile);


    // ================= UPDATE WHEN PROFILE CHANGES =================

    useEffect(() => {
        setFormData(profile);
    }, [profile]);


    // ================= HANDLE INPUT =================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    // ================= HANDLE PHOTO =================

    const handlePhotoChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const imageURL = URL.createObjectURL(file);

        setFormData((prev) => ({
            ...prev,
            image: imageURL,
        }));

    };


    // ================= SAVE =================

    const handleSave = () => {

        onSave(formData);

    };


    return (
        <div className="w-full bg-[#f7f9fb] px-3 py-4 sm:px-5 md:px-8 lg:px-10">

            {/* ================= MAIN CARD ================= */}

            <div className="mx-auto w-full max-w-[900px] rounded-2xl border border-[#e5ebf2] bg-white p-4 shadow-[0_4px_25px_rgba(40,60,80,0.04)] sm:p-5 md:p-7 lg:p-8">


                {/* ================= PROFILE HEADER ================= */}

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">


                    {/* LEFT */}

                    <div className="flex min-w-0 items-center gap-4">


                        {/* Profile Image */}

                        <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full border border-[#dfe7ef] bg-[#edf2f7]">

                            <img
                                src={formData.image || "/profile.jpg"}
                                alt="Profile"
                                className="h-full w-full object-cover"
                            />

                        </div>


                        {/* Profile Info */}

                        <div className="min-w-0">

                            <h2 className="truncate text-lg font-semibold text-[#182b43] sm:text-xl">
                                {formData.name}
                            </h2>


                            <div className="mt-1 flex min-w-0 items-center gap-2">

                                <p className="truncate text-sm text-[#71839a] sm:text-base">
                                    {formData.email}
                                </p>

                                <button
                                    type="button"
                                    className="shrink-0 text-[#55718f] transition hover:text-[#1677ff]"
                                >
                                    <i className="ri-pencil-line text-lg"></i>
                                </button>

                            </div>


                            {/* Premium */}

                            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#eee8ff] px-3 py-1 text-xs font-semibold text-[#6745d8]">

                                <i className="ri-vip-crown-line"></i>

                                Premium User

                            </div>

                        </div>

                    </div>


                    {/* CHANGE PHOTO */}

                    <div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePhotoChange}
                        />


                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#dfe7ef] bg-white px-4 py-3 text-sm font-medium text-[#385575] transition hover:bg-[#f7faff] sm:w-auto"
                        >

                            <i className="ri-camera-line text-lg"></i>

                            Change Photo

                        </button>

                    </div>

                </div>


                {/* ================= FORM ================= */}

                <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">


                    {/* NAME */}

                    <InputField
                        label="Full Name"
                        icon="ri-user-line"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />


                    {/* EMAIL */}

                    <InputField
                        label="Email Address"
                        icon="ri-mail-line"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />


                    {/* PHONE */}

                    <InputField
                        label="Phone Number"
                        icon="ri-phone-line"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />


                    {/* TIMEZONE */}

                    <SelectField
                        label="Time Zone"
                        icon="ri-time-line"
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleChange}
                        options={[
                            "Asia/Kolkata",
                            "Asia/Dubai",
                            "Europe/London",
                            "America/New_York",
                        ]}
                    />


                    {/* CURRENCY */}

                    <SelectField
                        label="Preferred Currency"
                        icon="ri-money-dollar-circle-line"
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        options={[
                            "INR (₹)",
                            "USD ($)",
                            "EUR (€)",
                            "GBP (£)",
                        ]}
                    />


                    {/* LANGUAGE */}

                    <SelectField
                        label="Language"
                        icon="ri-global-line"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        options={[
                            "English",
                            "Hindi",
                            "French",
                            "Spanish",
                        ]}
                    />

                </div>


                {/* ================= CHANGE PASSWORD ================= */}

                <button
                    type="button"
                    className="mt-6 flex w-full items-center gap-4 rounded-2xl border border-[#e5ebf2] bg-white p-4 text-left transition hover:border-[#d5e0ec] hover:bg-[#fbfcfe] sm:p-5"
                >

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#edf4ff] text-[#42698f]">

                        <i className="ri-lock-line text-2xl"></i>

                    </div>


                    <div className="min-w-0 flex-1">

                        <h3 className="text-base font-semibold text-[#243b56]">
                            Change Password
                        </h3>

                        <p className="mt-1 text-sm text-[#7c8fa5]">
                            Update your password to keep your account secure.
                        </p>

                    </div>


                    <i className="ri-arrow-right-s-line shrink-0 text-2xl text-[#1677ff]"></i>

                </button>


                {/* ================= SECURITY ================= */}

                <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-[#d8f0eb] bg-[#effbf8] p-4 sm:flex-row sm:items-center sm:p-5">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#d7f5ee] text-[#087d68]">

                        <i className="ri-shield-check-line text-2xl"></i>

                    </div>


                    <div className="min-w-0 flex-1">

                        <h3 className="text-base font-semibold text-[#14695c]">
                            Your account is secure
                        </h3>

                        <p className="mt-1 text-sm text-[#6d938c]">
                            All your data is encrypted and protected.
                        </p>

                    </div>


                    <div className="flex w-fit items-center gap-1.5 rounded-full bg-[#d8f4ed] px-3 py-1.5 text-xs font-semibold text-[#087d68]">

                        <i className="ri-checkbox-circle-fill text-base"></i>

                        2FA Enabled

                    </div>

                </div>


                {/* ================= BUTTONS ================= */}

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                    {/* CANCEL */}

                    <button
                        type="button"
                        onClick={() => setFormData(profile)}
                        className="w-full rounded-xl border border-[#dfe7ef] bg-white px-6 py-3 text-sm font-semibold text-[#48617c] transition hover:bg-[#f7f9fc] sm:w-auto"
                    >
                        Cancel
                    </button>


                    {/* SAVE */}

                    <button
                        type="button"
                        onClick={handleSave}
                        className="w-full rounded-xl bg-[#087f6a] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#066e5b] sm:w-auto"
                    >
                        Save Changes
                    </button>

                </div>

            </div>

        </div>
    );
}


/* =========================================================
   INPUT FIELD
========================================================= */

function InputField({
    label,
    icon,
    name,
    value,
    onChange,
    type = "text",
}) {

    return (
        <div className="w-full">

            <label className="mb-2 block text-sm font-medium text-[#263f5c]">
                {label}
            </label>


            <div className="flex h-[58px] items-center rounded-xl border border-[#dfe7ef] bg-white px-4 transition focus-within:border-[#7fa6d1] focus-within:ring-2 focus-within:ring-[#eaf3ff]">

                <i
                    className={`${icon} mr-4 text-xl text-[#52708f]`}
                ></i>


                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="h-full w-full bg-transparent text-sm font-medium text-[#405b77] outline-none placeholder:text-[#9aabba]"
                />

            </div>

        </div>
    );
}


/* =========================================================
   SELECT FIELD
========================================================= */

function SelectField({
    label,
    icon,
    name,
    value,
    onChange,
    options,
}) {

    return (
        <div className="w-full">

            <label className="mb-2 block text-sm font-medium text-[#263f5c]">
                {label}
            </label>


            <div className="relative flex h-[58px] items-center rounded-xl border border-[#dfe7ef] bg-white px-4 transition focus-within:border-[#7fa6d1] focus-within:ring-2 focus-within:ring-[#eaf3ff]">

                <i
                    className={`${icon} mr-4 text-xl text-[#52708f]`}
                ></i>


                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="h-full w-full appearance-none bg-transparent pr-8 text-sm font-medium text-[#405b77] outline-none"
                >

                    {options.map((option) => (
                        <option
                            key={option}
                            value={option}
                        >
                            {option}
                        </option>
                    ))}

                </select>


                <i className="ri-arrow-down-s-line pointer-events-none absolute right-4 text-xl text-[#55718f]"></i>

            </div>

        </div>
    );
}


export default ProfileSettings;