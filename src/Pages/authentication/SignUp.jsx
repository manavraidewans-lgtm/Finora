import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = (e) => {
        e.preventDefault();

        // Save user
        localStorage.setItem(
            "finoraUser",
            JSON.stringify({
                name: name,
                email: email,
            })
        );

        // Go directly to dashboard
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center">

            <form
                onSubmit={handleSignUp}
                className="w-full max-w-md p-6"
            >

                <h1 className="text-3xl font-bold mb-6">
                    Create Your Account
                </h1>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border p-3 mb-4 rounded-lg"
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-3 mb-4 rounded-lg"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-3 mb-4 rounded-lg"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-[#896b57] text-white py-3 rounded-lg"
                >
                    Sign Up
                </button>

            </form>

        </div>
    );
}

export default SignUp;