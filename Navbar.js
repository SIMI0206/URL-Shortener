import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Navbar.css"; // Ensure CSS file is linked

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <h2 className="logo">URL Shortener</h2>
            {user && (
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            )}
        </nav>
    );
};

export default Navbar;
