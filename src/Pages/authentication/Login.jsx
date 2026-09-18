import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        // Save login state
        localStorage.setItem(
            "finoraUser",
            JSON.stringify({
                email: email,
            })
        );

        // Go to dashboard
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center">

            <form
                onSubmit={handleLogin}
                className="w-full max-w-md p-6"
            >

                <h1 className="text-3xl font-bold mb-6">
                    Welcome Back
                </h1>

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
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;