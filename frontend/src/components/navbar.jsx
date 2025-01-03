import imgg from '../images/imggg.png'; 
import imggg from '../images/char.jpg';
import { Link } from 'react-router-dom';

function Navbar({ isLogin, setIsLogin }) { 
    const handleLogout = () => {
        setIsLogin(false); // Call the parent's setIsLogin to log out
    };

    return (
        <div className="bg-purple-500 flex items-center justify-between p-4">
            {/* Logo Section */}
            <Link to="/" className="flex items-center">
                <img src={imgg} alt="Logo" className="mr-2 h-[3rem] sm:h-[5rem]" />
                <div>
                    <h1 className="text-white text-2xl sm:text-5xl font-bold">TestiView</h1>
                    <p className="text-white text-xs sm:text-sm font-bold mt-[0.2rem]">See the proof, Share the truth</p>
                </div>
            </Link>

            {/* Right Section: Login / Logout */}
            <div className="flex items-center space-x-4 ml-auto">
                {isLogin ? (
                    <div className="flex items-center">
                        <img src={imggg} className="w-[3rem] h-[3rem] sm:w-[4rem] sm:h-[4rem] rounded-full" alt="Profile" />
                        <button 
                            onClick={handleLogout} 
                            className="ml-4 bg-white text-purple-800 px-4 py-2 rounded hover:bg-purple-800 hover:text-white text-xs sm:text-base"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link 
                        to="/login" 
                        className="bg-white text-purple-800 px-4 py-2 rounded hover:bg-purple-800 hover:text-white text-xs sm:text-base"
                    >
                        Login / Sign Up
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Navbar;
