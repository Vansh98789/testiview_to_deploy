import React from 'react';
import { useNavigate } from 'react-router-dom';

const Modal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const selectedOption = event.target.option.value;
        navigate(`/wall?layout=${selectedOption}`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-sm w-full sm:max-w-md md:max-w-lg p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-4">Choose Layout of Wall</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input type="radio" name="option" value="animated" className="mr-2" required />
                        <label className="text-sm sm:text-base">Animated</label>
                    </div>
                    <div className="mb-4">
                        <input type="radio" name="option" value="fixed" className="mr-2" />
                        <label className="text-sm sm:text-base">Fixed</label>
                    </div>
                    <div className="mb-4">
                        <input type="radio" name="option" value="carousel" className="mr-2" />
                        <label className="text-sm sm:text-base">Carousel Slider</label>
                    </div>
                    <div className="flex justify-end">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 text-sm sm:text-base"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="bg-blue-500 text-white px-4 py-2 rounded text-sm sm:text-base"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
