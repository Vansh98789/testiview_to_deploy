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
            <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center mb-4">Vansh Test Review</h1>
                <p className="text-center text-lg mb-6">
                    Your space form URL: 
                    <a href="http://localhost:5173/formm" className="text-blue-600 underline"> http://localhost:5173/formm</a>
                </p>
                <button 
                    onClick={handleOpenModal} 
                    className=" ml-[30rem] bg-purple-500 mt-8 text-white px-4 py-2 rounded hover:bg-purple-700 block text-center"
                >
                    Create Your own wall of testimonial
                </button>
                <br/>
                <br/>

                <Modal isOpen={isModalOpen} onClose={handleCloseModal} />

                <h2 className="text-xl font-semibold mb-4">Total Reviews: {reviews.length}</h2>

                {reviews.map((review, index) => (
                    <div key={index} className="review-item bg-white p-4 rounded-lg shadow mb-4">
                        <div className="flex-1">
                            <p className="font-medium">Review: {review.review}</p>
                            <p><strong>Name:</strong> {review.name}</p>
                            <p><strong>Submitted At:</strong> {review.submittedAt}</p>
                            <p><strong>Email:</strong> {review.email}</p>

                            {review.videoUrl ? (
                                <div className="video-container mt-2">
                                    <ReactPlayer 
                                        url={review.videoUrl} 
                                        controls 
                                        width="300px" 
                                        height="200px" 
                                    />
                                </div>
                            ) : (
                                <p className="text-red-500">No video response available.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default PersonalDashboard;
