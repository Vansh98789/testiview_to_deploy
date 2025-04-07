import React, { useEffect, useState } from "react";
import ReactPlayer from 'react-player';
import axios from 'axios';
import Modal from "../components/modal";

const PersonalDashboard = ({ setIsLogin }) => {
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsLogin(true);
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.id) {
            fetchReviews(user.id);
        }
    }, [setIsLogin]);

    const fetchReviews = async (userId) => {
        try {
            const response = await axios.get(`https://testiview-backend.vercel.app/testimonials`, {
                params: {
                    userId: userId,
                }
            });

            if (response.status === 200) {
                setReviews(response.data);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const user = JSON.parse(localStorage.getItem("user"));
    const embedUrl = user
        ? `https://testiview-frontend.vercel.app/wall?layout=fixed&userId=${user.id}&token=${user.token}`
        : "";

    return (
        <>
            <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md max-w-screen-lg">
                <h1 className="text-3xl font-bold text-center mb-4">Personal Dashboard</h1>
                <p className="text-center text-lg mb-6">
                    Your space form URL:
                    <a href="https://testiview-frontend.vercel.app/formm" className="text-blue-600 underline"> https://testiview-frontend.vercel.app/formm</a>
                </p>

                <div className="flex justify-center mb-6">
                    <button 
                        onClick={handleOpenModal} 
                        className="bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-700 transition duration-200"
                    >
                        Create Your own Wall of Testimonial
                    </button>
                </div>

                <Modal isOpen={isModalOpen} onClose={handleCloseModal} />

                <h2 className="text-xl font-semibold mb-4">Total Reviews: {reviews.length}</h2>

                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="review-item bg-white p-4 rounded-lg shadow mb-4">
                            <div className="flex flex-col md:flex-row justify-between">
                                <div className="flex-1 mb-4 md:mb-0">
                                    <p><strong>Name:</strong> {review.author_name}</p>
                                    <p className="font-medium">Review: {review.content}</p>
                                    <p><strong>Submitted At:</strong> {review.created_at}</p>
                                </div>

                                <div className="video-container mt-4 md:mt-0 md:w-1/3 md:ml-4">
                                    {review.video_url ? (
                                        <ReactPlayer 
                                            url={review.video_url} 
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

                {user && (
                    <div className="mt-10 p-4 bg-gray-100 rounded-lg">
                        <h2 className="text-xl font-bold mb-2">Your Embed Code:</h2>
                        <pre className="bg-gray-200 p-4 rounded text-sm overflow-auto">
{`<iframe 
  src="${embedUrl}" 
  width="100%" 
  height="800px" 
  style="border: none;" 
  allowfullscreen
></iframe>`}
                        </pre>
                    </div>
                )}
            </div>
        </>
    );
};

export default PersonalDashboard;
