import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Auth.css";


const Login = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser || storedUser.username !== credentials.username || storedUser.password !== credentials.password) {
            setError("Invalid username or password!");
            return;
        }

        login(storedUser);
        navigate("/dashboard");
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <span onClick={() => navigate("/signup")} style={{color:'blue'}}>Sign Up</span></p>
        </div>
    );
};

export default Login;
