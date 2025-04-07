import React, { useEffect, useState } from "react";
import ReactPlayer from 'react-player';
import axios from 'axios';
import Modal from "../components/modal";

const PersonalDashboard = ({ setIsLogin }) => {
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [embedToken, setEmbedToken] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLogin(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('embedToken');
        
        if (token) {
            setEmbedToken(token);
        }
        
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
                    userId: userId, // Send userId as a query parameter
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
    
    // Function to regenerate embed token
    const regenerateToken = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
            setError("User not logged in");
            return;
        }
        
        try {
            setLoading(true);
            const response = await axios.post("https://testiview-backend.vercel.app/generate-embed-token", {
                userId: user.id
            });
            
            if (response.status === 200 && response.data.embedToken) {
                localStorage.setItem('embedToken', response.data.embedToken);
                setEmbedToken(response.data.embedToken);
                alert("New embed token generated successfully!");
            }
        } catch (error) {
            console.error("Error generating token:", error);
            setError("Failed to generate new token");
        } finally {
            setLoading(false);
        }
    };
    
    // Function to create embed code with current token
    const getEmbedCode = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id || !embedToken) {
            return "Please log in and generate an embed token first.";
        }
        
        return `<script type="text/javascript" src="https://testimonial.to/js/iframeResizer.min.js"></script>
<iframe 
  id="testimonialto-embed"
  src="https://testiview-frontend.vercel.app/wall?layout=fixed&userId=${user.id}&token=${embedToken}" 
  frameborder="0" 
  scrolling="no" 
  width="100%" 
  style="height: 800px; border: none;"
></iframe>
<script type="text/javascript">
  iFrameResize({
    log: false,
    checkOrigin: false,
    warningTimeout: 15000
  }, '#testimonialto-embed');
</script>`;
    };

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
                
                {/* Embed code section */}
                <div className="mb-6 p-4 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-3">Your Embed Code</h2>
                    <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto text-sm">
                        {getEmbedCode()}
                    </pre>
                    <div className="mt-3 flex justify-between">
                        <button 
                            onClick={regenerateToken}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Regenerate Embed Token"}
                        </button>
                        
                        <button
