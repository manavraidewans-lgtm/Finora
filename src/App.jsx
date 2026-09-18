import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

// Public pages
import Home from "./Pages/public/Home.jsx";
import About from "./Pages/public/About.jsx";
import Features from "./Pages/public/Features.jsx";

// Authentication pages
import Login from "./Pages/authentication/Login.jsx";
import SignUp from "./Pages/authentication/SignUp.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/features" element={<Features />} />

                {/* Authentication */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/* 404 */}
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;