import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Signup = () => {
    // State for form inputs
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [salary, setSalary] = useState(0);

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        const data = {
            username: username,
            password: password,
            salary: salary,
        };

        fetch("http://localhost:4000/signup", {
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
                alert("Signup successful!");
                window.location.href = "/login"; // Redirect to login page after signup
            }
        })
        .catch((err) => console.error("Error:", err));
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center min-h-screen">
                <h1 className="text-2xl font-bold my-3">Signup</h1>
                <form id="signup-form" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-lg font-medium mb-2">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border-black border-2 rounded-md p-2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-lg font-medium mb-2">
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

                    <div className="mb-4">
                        <label htmlFor="salary" className="block text-lg font-medium mb-2">
                            Salary:
                        </label>
                        <input
                            type="number"
                            id="salary"
                            name="salary"
                            value={salary}
                            onChange={(e) => setSalary(parseFloat(e.target.value))}
                            className="w-full border-black border-2 rounded-md p-2"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-amber-300 px-3 py-2 rounded-xl w-full transition-colors hover:bg-orange-500"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </>
    );
};

export default Signup;
