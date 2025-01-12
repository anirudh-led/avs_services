import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        console.log("Button clicked!");

        const data = {
            username: username,
            password: password,
        };

        fetch("https://avs-services-backend.vercel.app/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                alert("Error: " + data.error);
            } else {
                localStorage.setItem('isLoggedOn', true);
                alert("Login successful!");
                window.location.href = "/"; // Redirect to home page after login
            }
        })
        .catch((err) => console.error("Error:", err));
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center min-h-screen">
                <h1 className="text-4xl font-bold my-3 text-center">Login</h1>
                <form id="login-form" onSubmit={handleSubmit} className="w-full max-w-sm">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-center text-lg font-medium mb-2">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border-black border-2 rounded-md p-2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-center text-lg font-medium mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-black border-2 rounded-md p-2"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-teal-300 px-4 py-2 rounded-xl w-full transition-colors hover:bg-teal-500"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </>
    );
};

export default Login;
