import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Main from "./components/Main";
import InfoTooltip from "./components/InfoTooltip";
import { register, authorize, checkToken } from "./utils/auth";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    // Verifica token ao carregar o app
    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            checkToken(token)
                .then((res) => {
                    setLoggedIn(true);
                    setUserEmail(res.data.email);
                    navigate("/");
                })
                .catch((err) => {
                    console.error("Token inválido:", err);
                    localStorage.removeItem("jwt");
                });
        }
    }, []);

    // Registro
    const handleRegister = ({ email, password }) => {
        register(email, password)
            .then((res) => {
                setIsSuccess(true);
                setIsTooltipOpen(true);
                navigate("/signin");
            })
            .catch((err) => {
                setIsSuccess(false);
                setIsTooltipOpen(true);
                console.error(err);
            });
    };

    // Login
    const handleLogin = ({ email, password }) => {
        authorize(email, password)
            .then((res) => {
                localStorage.setItem("jwt", res.token);
                setLoggedIn(true);
                setUserEmail(email);
                navigate("/");
            })
            .catch((err) => {
                setIsSuccess(false);
                setIsTooltipOpen(true);
                console.error(err);
            });
    };

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("jwt");
        setLoggedIn(false);
        setUserEmail("");
        navigate("/signin");
    };

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute
                            element={<Main email={userEmail} onLogout={handleLogout} />}
                            loggedIn={loggedIn}
                        />
                    }
                />
                <Route path="/signup" element={<Register onRegister={handleRegister} />} />
                <Route path="/signin" element={<Login onLogin={handleLogin} />} />
                <Route path="*" element={<Navigate to="/signin" replace />} />
            </Routes>

            <InfoTooltip isOpen={isTooltipOpen} isSuccess={isSuccess} onClose={() => setIsTooltipOpen(false)} />
        </>
    );
}

export default App;
