import { useState } from 'react';
import imgg from '../images/imggg.png'; 
import axios from 'axios';

function Response() {
    const [name, setName] = useState("");
    const [workDone, setWorkDone] = useState("");
    const [experience, setExperience] = useState("");
    const [specifyChange, setSpecifyChange] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Reset error state before submission

        // Get user data and token
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('embedToken');
        
        if (!user || !user.id) {
            setError("You must be logged in to submit a response.");
            setLoading(false);
            return;
        }
        
        const userId = user.id;

        // Basic Validation
        if (!name || !workDone || !experience || !specifyChange) {
            setError("All fields except video URL are required.");
            setLoading(false);
            return;
        }

        try {
            // Pass token in request headers if needed
            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            
            const response = await axios.post("https://testiview-backend.vercel.app/response", {
                user_id: userId,
                name,
                experience,
                specific_change: specifyChange,
                video_url: videoUrl || null // Ensure the video URL is optional
            }, { headers });

            // Retrieve existing reviews from localStorage
            const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
            
            // Create new review object
            const newReview = {
                userId: userId,
                review: experience,
                name: name,
                submittedAt: new Date().toLocaleDateString(),
                email: user.email, // Ensure email is available
                videoUrl: videoUrl,
            };
            
            // Add new review to existing reviews
            reviews.push(newReview);
            
            // Save updated reviews back to localStorage
            localStorage.setItem('reviews', JSON.stringify(reviews));
            
            // Reset the form fields
            setName("");
            setWorkDone("");
            setExperience("");
            setSpecifyChange("");
            setVideoUrl("");
            
            alert("Response submitted successfully!");
        } catch (error) {
            console.error("Error submitting response:", error);
            setError(error.response?.data || "An error occurred while submitting your response.");
        }
        
        setLoading(false);
    };

    return (
        <>
            <div className="bg-purple-500">
                <img src={imgg} alt="Logo" className="mr-2 h-[5rem]" />
            </div>
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
                <h1 className="text-center text-2xl font-bold">Review Form</h1>
                <h2 className="text-center text-xl pt-6 font-bold">Questions</h2>
                <div className="mt-8">
                    <h2 className="text-center pt-2 text-lg font-medium">Please specify your name:</h2>
                    <h2 className="text-center pt-2 text-lg font-medium">Please specify the work we have done for you:</h2>
                    <h2 className="text-center pt-2 text-lg font-medium">Please specify the overall experience:</h2>
                    <h2 className="text-center pt-2 text-lg font-medium">Please specify the changes you want in our services:</h2>
                    <h2 className="text-center pt-2 text-lg font-medium">Video Url (If any)</h2>
                </div>
            </div>
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold mb-4">Feedback Form</h2>
                    {/* Error message */}
                    {error && (
                        <div className="text-red-500 text-center mb-4">{error}</div>
                    )}
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                    <input type="text" id="name" placeholder="Enter your name" 
                        value={name} onChange={(e) => setName(e.target.value)} 
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                    <label htmlFor="workDone" className="block text-sm font-medium text-gray-700 mt-4">Please specify the work we have done for you:</label>
                    <input type="text" id="workDone" placeholder="Describe the work" 
                        value={workDone} onChange={(e) => setWorkDone(e.target.value)} 
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mt-4">Please specify the overall experience:</label>
                    <input type="text" id="experience" placeholder="Share your experience" 
                        value={experience} onChange={(e) => setExperience(e.target.value)} 
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                    <label htmlFor="changes" className="block text-sm font-medium text-gray-700 mt-4">Please specify the changes you want in our services:</label>
                    <input type="text" id="changes" placeholder="List any changes" 
                        value={specifyChange} onChange={(e) => setSpecifyChange(e.target.value)} 
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                    <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mt-4">Video Url (If any)</label>
                    <input type="text" id="videoUrl" placeholder="Enter video URL" 
                        value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} 
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    {/* Submit button */}
                    <button 
                        type="submit" 
                        className={`mt-6 w-full ${loading ? 'bg-gray-500' : 'bg-blue-500'} text-white font-semibold py-2 rounded-md hover:bg-blue-600 ${loading ? 'cursor-not-allowed' : ''}`} 
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </>
    );
}

export default Response;
