import imgg from '../images/imggg.png'; 
import imggg from '../images/char.jpg';
import { Link } from 'react-router-dom';

function Navbar({ isLogin, setIsLogin }) { // Accept isLogin as a prop
    const handleLogout = () => {
        setIsLogin(false); // Call the parent's setIsLogin to log out
    };

    return (
        <div className="bg-purple-500 flex items-center p-4">
            <Link to="/">
                <img src={imgg} alt="Logo" className="mr-2 h-[5rem]" />
            </Link>
            <div>
                <h1 className="text-white text-5xl font-bold">TestiView</h1>
                <p className="text-white font-bold text-xs ml-[0.8rem] mt-[0.2rem]">See the proof, Share the truth</p>
            </div>
            {isLogin ? (
                <div className="flex items-center ml-auto">
                    <img src={imggg} className="w-[4rem] h-[4rem] rounded-full" alt="Description" />
                    <button onClick={handleLogout} className="ml-4 bg-white text-purple-800 px-4 py-2 rounded hover:bg-purple-800 hover:text-white">
                        Logout
                    </button>
                </div>
            ) : (
                <Link to="/login" className="ml-auto bg-white text-purple-800 px-4 py-2 rounded mr-[2rem] hover:bg-purple-800 hover:text-white">
                    Login / Sign Up
                </Link>
            )}
        </div>
    );
}

export default Navbar;
