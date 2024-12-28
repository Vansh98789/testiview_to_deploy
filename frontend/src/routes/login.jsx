import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:9878/login", { email, password });
            if (response.status === 200) {
                const userData = { id: response.data.userId, email }; // Store user ID
                localStorage.setItem('user', JSON.stringify(userData)); // Save to local storage
                navigate("/dashboard"); // Redirect to the dashboard
            } else {
                alert("Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert(error.response?.data || "An error occurred during login."); // Show server message if available
        }
    };
    

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="email" // Changed type to email for better validation
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
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Login
                </button>
            </form>
           
            <div className="mt-4 text-center">
                Not Registered? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
            </div>
        </div>
    );
}

export default Login;
