import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";


const Signup = () => {
    const [userData, setUserData] = useState({ username: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const existingUser = JSON.parse(localStorage.getItem("user"));

        if (existingUser && existingUser.username === userData.username) {
            setError("Username already exists!");
            return;
        }

        localStorage.setItem("user", JSON.stringify(userData));
        alert("Signup successful! You can now login.");
        navigate("/login");
    };

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <span onClick={() => navigate("/login")}style={{color:'blue'}}>Login</span></p>
        </div>
    );
};

export default Signup;
