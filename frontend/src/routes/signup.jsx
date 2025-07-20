import { useState } from "react";

function Signup() {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Mock navigation function
    const navigate = (path) => {
        console.log(`Navigating to ${path}`);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        if (!email || !password) {
            setError("Both email and password are required.");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            setLoading(false);
            return;
        }

        // Simulate API call
        try {
            setTimeout(() => {
                setSuccess(true);
                setLoading(false);
                
                setTimeout(() => {
                    alert("Signup successful! Redirecting to your dashboard...");
                    navigate("/dashboard");
                }, 2000);
            }, 1500);
        } catch (error) {
            console.error("Error signing up:", error);
            setError("An error occurred during signup. Please try again.");
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !loading) {
            handleSubmit();
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md text-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 p-12">
                        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Created Successfully!</h2>
                        <p className="text-gray-600 mb-6">Welcome aboard! Redirecting you to your dashboard...</p>
                        <div className="flex justify-center">
                            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-indigo-200/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
            
            <div className="w-full max-w-md relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl transform hover:scale-110 transition-transform duration-300">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                        Create Account
                    </h1>
                    <p className="text-gray-600 text-lg">Join thousands of users and start your journey</p>
                </div>

                {/* Signup Card */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-10 transform hover:scale-[1.02] transition-all duration-300">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50/80 border border-red-200 rounded-2xl">
                            <p className="text-red-700 text-sm font-medium text-center">{error}</p>
                        </div>
                    )}

                    <div className="space-y-8">
                        {/* Email Field */}
                        <div className="space-y-3">
                            <label htmlFor="email" className="text-sm font-semibold text-gray-700 block">
                                Email Address
                            </label>
                            <div className="relative group">
                                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <input 
                                    type="email" 
                                    id="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    onKeyPress={handleKeyPress}
                                    required 
                                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/60 hover:bg-white/80 text-gray-900 placeholder-gray-500"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-3">
                            <label htmlFor="password" className="text-sm font-semibold text-gray-700 block">
                                Password
                            </label>
                            <div className="relative group">
                                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    id="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    onKeyPress={handleKeyPress}
                                    required 
                                    className="w-full pl-12 pr-14 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/60 hover:bg-white/80 text-gray-900 placeholder-gray-500"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors focus:outline-none"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L12 12m7.8-2.9l-3.9 3.9" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    Sign Up
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Login Link */}
                <div className="text-center mt-8">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <a 
                            href="/login" 
                            className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                        >
                            Sign in instead
                        </a>
                    </p>
                </div>

                {/* Footer */}
                <div className="text-center mt-6 text-sm text-gray-500">
                    <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
