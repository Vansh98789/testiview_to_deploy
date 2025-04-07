import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        if (!email || !password) {
            setError("Both email and password are required.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("https://testiview-backend.vercel.app/signup", { email, password });

            if (response.status === 201) {
                const { userId, token } = response.data;
                
                // Save JWT and user info to localStorage
                localStorage.setItem("user", JSON.stringify({ id: userId, email, token }));

                alert("Signup successful! Redirecting to your dashboard...");
                navigate("/dashboard");
            } else {
                setError("Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Error signing up:", error);
            setError(error.response?.data || "An error occurred during signup. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

            {error && (
                <div className="text-red-500 text-center mb-4">{error}</div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>

                <button 
                    type="submit" 
                    className={`w-full ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white p-2 rounded-md transition duration-200`}
                    disabled={loading}
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
            </form>

            <div className="mt-4 text-center">
                Already Registered? <a href="/login" className="text-blue-600 hover:underline">Log In</a>
            </div>
        </div>
    );
}

export default Signup;
