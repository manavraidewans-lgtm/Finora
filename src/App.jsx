import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

// Public pages
import Home from "./Pages/public/Home.jsx";
import About from "./Pages/public/About.jsx";
import Features from "./Pages/public/Features.jsx";

// Dashboard pages
import Dashboard from "./Pages/dashboard/Dashboard.jsx";
import Transactions from "./Pages/dashboard/Transactions.jsx";
import Budgets from "./Pages/dashboard/Budgets.jsx";
import Goals from "./Pages/dashboard/Goals.jsx";
import Analytics from "./Pages/dashboard/Analytics.jsx";
import Recurring from "./Pages/dashboard/Recurring.jsx";
import Reports from "./Pages/dashboard/Reports.jsx";
import Settings from "./Pages/dashboard/Settings.jsx";

// 404 error page
import NotFound from "./Pages/NotFound.jsx";


function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* ============================= */}
                {/* PUBLIC */}
                {/* ============================= */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/features"
                    element={<Features />}
                />


                {/* ============================= */}
                {/* DASHBOARD */}
                {/* ============================= */}

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/dashboard/transactions"
                    element={<Transactions />}
                />

                <Route
                    path="/dashboard/budgets"
                    element={<Budgets />}
                />

                <Route
                    path="/dashboard/goals"
                    element={<Goals />}
                />

                <Route
                    path="/dashboard/analytics"
                    element={<Analytics />}
                />

                <Route
                    path="/dashboard/recurring"
                    element={<Recurring />}
                />

                <Route
                    path="/dashboard/reports"
                    element={<Reports />}
                />

                <Route
                    path="/dashboard/settings"
                    element={<Settings />}
                />


                {/* ============================= */}
                {/* 404 */}
                {/* ============================= */}

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;