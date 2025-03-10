import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import UrlShortener from "./components/UrlShortener";
import { AuthProvider } from "./context/AuthContext";
import AuthContext from "./context/AuthContext";
import Redirect from "./pages/Redirect";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<ProtectedRoute><UrlShortener /></ProtectedRoute>} />
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/go/:shortCode" element={<Redirect />} />
                    <Route path="/not-found" element={<h2>404 - Not Found</h2>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
