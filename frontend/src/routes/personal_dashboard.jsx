import React, { useEffect, useState } from "react";
import ReactPlayer from 'react-player'; 
import Modal from "../components/modal";

const PersonalDashboard = ({ setIsLogin }) => {
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsLogin(true);
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.id) {
            const allReviews = JSON.parse(localStorage.getItem('reviews')) || [];
            const userReviews = allReviews.filter(review => review.userId === user.id);
            setReviews(userReviews);
        }
    }, [setIsLogin]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <>
            <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md max-w-screen-lg">
                <h1 className="text-3xl font-bold text-center mb-4">Personal Dashboard</h1>
                <p className="text-center text-lg mb-6">
                    Your space form URL: 
                    <a href="https://testiview-frontend.vercel.app/formm" className="text-blue-600 underline"> https://testiview-frontend.vercel.app/formm</a>
                </p>

                {/* Button - Improved responsiveness */}
                <div className="flex justify-center mb-6">
                    <button 
                        onClick={handleOpenModal} 
                        className="bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-700 transition duration-200"
                    >
                        Create Your own Wall of Testimonial
                    </button>
                </div>

                <Modal isOpen={isModalOpen} onClose={handleCloseModal} />

                {/* Total Reviews */}
                <h2 className="text-xl font-semibold mb-4">Total Reviews: {reviews.length}</h2>

                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="review-item bg-white p-4 rounded-lg shadow mb-4">
                            <div className="flex flex-col md:flex-row justify-between">
                                <div className="flex-1 mb-4 md:mb-0">
                                    <p className="font-medium">Review: {review.review}</p>
                                    <p><strong>Name:</strong> {review.name}</p>
                                    <p><strong>Submitted At:</strong> {review.submittedAt}</p>
                                    <p><strong>Email:</strong> {review.email}</p>
                                </div>

                                {/* Video Section */}
                                <div className="video-container mt-4 md:mt-0 md:w-1/3 md:ml-4">
                                    {review.videoUrl ? (
                                        <ReactPlayer 
                                            url={review.videoUrl} 
                                            controls 
                                            width="100%" 
                                            height="200px" 
                                        />
                                    ) : (
                                        <p className="text-red-500">No video response available.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No reviews yet.</p>
                )}
            </div>
        </>
    );
};

export default PersonalDashboard;
