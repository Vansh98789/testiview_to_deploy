import React, { useEffect, useState } from "react";
import ReactPlayer from 'react-player';
import axios from 'axios';
import Modal from "../components/modal";

const PersonalDashboard = ({ setIsLogin }) => {
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLogin(true);
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.id) {
            // Send the user ID to the backend to fetch reviews
            fetchReviews(user.id);
        } else {
            setLoading(false);
            setError("Please log in to view your dashboard");
        }
    }, [setIsLogin]);

    // Function to fetch reviews from the backend
    const fetchReviews = async (userId) => {
        try {
            const response = await axios.get(`https://testiview-backend.vercel.app/testimonials`, {
                params: {
                    userId: userId // Send userId as a query parameter
                }
            });

            // Assuming the response contains reviews data
            if (response.status === 200) {
                setReviews(response.data); // Set the reviews in state
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            setError("Error loading reviews: " + (error.response?.data || error.message));
            setLoading(false);
        }
    };

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

                {/* Error display */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {/* Instructions Card */}
                <div className="mb-6 p-4 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-3">Share Your Form</h2>
                    <p className="mb-4">Share your form link with customers to collect testimonials. Once collected, they will appear below.</p>
                    <div className="mt-3 flex justify-end">
                        <button 
                            onClick={handleOpenModal} 
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                        >
                            View Instructions
                        </button>
                    </div>
                </div>
                
                {/* Reviews section */}
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold mb-4">Your Testimonials</h2>
                    
                    {loading ? (
                        <p className="text-center py-4">Loading your testimonials...</p>
                    ) : reviews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {reviews.map((review, index) => {
                                const authorName = review.author_name || "Unknown Author"; // Default to "Unknown Author"
                                const content = review.content || "No content available."; // Default to "No content available"
                                
                                return (
                                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                                        <div className="flex items-center mb-3">
                                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                                {authorName.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{authorName}</h3>
                                                <p className="text-sm text-gray-500">{new Date(review.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        
                                        <p className="mb-3">{content}</p>
                                        
                                        {review.video_url && (
                                            <div className="aspect-w-16 aspect-h-9 mt-3">
                                                <ReactPlayer
                                                    url={review.video_url}
                                                    width="100%"
                                                    height="100%"
                                                    controls
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-center py-4 text-gray-500">No testimonials yet. Share your form link to collect testimonials.</p>
                    )}
                </div>
            </div>
            
            {/* Modal for instructions */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className="text-2xl font-bold mb-4">How to Collect Testimonials</h2>
                <p className="mb-4">
                    Follow these steps to collect testimonials from your customers:
                </p>
                <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
                <ol className="list-decimal pl-5 mb-4">
                    <li className="mb-2">Copy your form URL: <span className="text-blue-600">https://testiview-frontend.vercel.app/formm</span></li>
                    <li className="mb-2">Share this URL with your customers via email, social media, or your website</li>
                    <li className="mb-2">Customers can visit the link and submit their testimonials</li>
                    <li className="mb-2">All submissions will automatically appear in your dashboard</li>
                    <li className="mb-2">You can view both text and video testimonials in this dashboard</li>
                </ol>
                <button
                    onClick={handleCloseModal}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Close
                </button>
            </Modal>
        </>
    );
};

export default PersonalDashboard;
