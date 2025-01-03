import imgg from '../images/imggg.png'; 
import imggg from '../images/char.jpg';
import { Link } from 'react-router-dom';

function Formm() {
    return (
        <>
            <div className="bg-purple-500 p-4">
                <img src={imgg} alt="Logo" className="mr-2 h-[3rem] sm:h-[5rem]" />
            </div>
            <hr />

            {/* Form Content */}
            <div className="flex flex-col items-center pt-12 sm:pt-16 px-4 sm:px-8">
                <img 
                    src={imggg} 
                    className="w-[4rem] h-[4rem] sm:w-[5rem] sm:h-[5rem] rounded-full" 
                    alt="Description" 
                />
                <h1 className="text-center text-2xl sm:text-3xl font-bold mt-4">Review Form</h1>
                <h2 className="text-center text-xl sm:text-2xl pt-8 font-bold">Questions</h2>

                {/* Questions */}
                <div className="space-y-4 mt-6 text-lg sm:text-xl text-center">
                    <h2>Please specify your name?</h2>
                    <h2>Please specify the work we have done for you?</h2>
                    <h2>Please specify the overall experience?</h2>
                    <h2>Please specify the changes you want in our services?</h2>
                    <h2>Video Url (If any)</h2>
                </div>

                {/* Submit Button */}
                <div className="space-y-4 mt-8">
                    <Link 
                        to="/response" 
                        className="bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-700 block text-center text-lg sm:text-xl"
                    >
                        Send Your Response
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Formm;
