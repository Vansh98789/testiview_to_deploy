import { useState } from 'react';
import imgg from '../images/imggg.png'; 
import imggg from '../images/char.jpg';
// Mock Link component for demonstration
const Link = ({ to, children, className, onClick }) => (
    <a href={to} className={className} onClick={onClick}>
        {children}
    </a>
);

function Navbar({ isLogin, setIsLogin }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const handleLogout = () => {
        setIsLogin(false);
    };

    return (
        <nav className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 shadow-xl backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center group">
                        <div className="relative">
                            <img 
                                src={imgg}
                                alt="Logo" 
                                className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105" 
                            />
                            {/* Subtle glow effect */}
                            <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="ml-4">
                            <h1 className="text-white text-2xl sm:text-4xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                                TestiView
                            </h1>
                            <p className="text-purple-100 text-xs sm:text-sm font-medium opacity-90">
                                See the proof, Share the truth
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Right Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isLogin ? (
                            <div className="flex items-center space-x-4">
                                {/* Profile Section */}
                                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 hover:bg-white/20 transition-all duration-300">
                                    <img 
                                        src="/api/placeholder/40/40" 
                                        className="w-10 h-10 rounded-full border-2 border-white/30 shadow-lg" 
                                        alt="Profile" 
                                    />
                                    <span className="text-white font-medium text-sm">Welcome back</span>
                                </div>
                                
                                {/* Logout Button */}
                                <button 
                                    onClick={handleLogout} 
                                    className="bg-white/10 hover:bg-red-500 text-white px-6 py-3 rounded-full border border-white/20 hover:border-red-400 font-medium transition-all duration-300 hover:shadow-lg"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link 
                                    to="/login" 
                                    className="text-white px-6 py-2 rounded-full font-medium hover:bg-white/10 transition-all duration-300"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/signup" 
                                    className="bg-white text-purple-700 px-6 py-2 rounded-full font-semibold hover:bg-purple-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Right Section */}
                    <div className="md:hidden flex items-center space-x-2">
                        {isLogin ? (
                            <div className="flex items-center space-x-2">
                                
                                <button 
                                    onClick={handleLogout} 
                                    className="bg-white/10 hover:bg-red-500 text-white px-3 py-2 rounded-full text-xs font-medium transition-all duration-300"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link 
                                    to="/login" 
                                    className="text-white px-3 py-2 rounded-full font-medium hover:bg-white/10 transition-all duration-300 text-sm"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/signup" 
                                    className="bg-white text-purple-700 px-4 py-2 rounded-full font-semibold hover:bg-purple-50 transition-all duration-300 text-sm"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
