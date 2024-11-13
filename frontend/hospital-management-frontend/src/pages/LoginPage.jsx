import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/LoginPage.css';
import { loginUser } from '../services/authService'; // Ensure the correct path is used

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages

        // Basic validation
        if (!email || !password) {
            setMessage('Please enter both email and password.');
            return;
        }

        const credentials = { email, password };
        console.log("Logged in user credentials:", credentials);
        try {
            const response = await loginUser(credentials); // Ensure this function is correctly implemented
            const userData = response.data;
            console.log("Logged in user:", userData);

            // Save user data (you can adjust what's necessary here)
            localStorage.setItem('email', userData.email);
            localStorage.setItem('role', userData.role);

            // Role-based navigation
            if (userData.role === 'ROLE_ADMIN') {
                navigate('/admin/dashboard');
            } else if (userData.role === 'ROLE_DOCTOR') {
                navigate('/doctor/profile');
            } else if (userData.role === 'ROLE_PATIENT') {
                navigate('/patient/profile');
            } else if (userData.role === 'ROLE_NURSE') {
                navigate('/nurse/profile');
            } else if (userData.role === 'ROLE_STAFF') {
                navigate('/staff/profile');
            } else {
                setMessage('Unknown role. Please contact support.');
            }
        } catch (error) {
            setMessage('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo-container">
                    <img
                        src={`${process.env.PUBLIC_URL}/website logo.png`}
                        alt="Website Logo"
                        className="logo"
                    />
                </div>
                <h2 className="login-title">Welcome to LifeBridge Hospital</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {message && <div className="text-danger">{message}</div>}
                    <button type="submit" className="btn btn-primary login-button">
                        Login
                    </button>
                </form>
                <div className="links-container">
                    <Link to="/" className="link">Home</Link>
                    <Link to="/register" className="link">Register</Link>
                    <Link to="/forgot-password" className="link">Forgot Password?</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
