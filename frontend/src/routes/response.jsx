import { useState } from 'react';
import imgg from '../images/imggg.png'; 
import axios from 'axios';

function Response() {
    const [name, setName] = useState("");
    const [workDone, setWorkDone] = useState("");
    const [experience, setExperience] = useState("");
    const [specifyChange, setSpecifyChange] = useState("");
    const [videoUrl, setVideoUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
    
        if (!user || !user.id) {
            alert("You must be logged in to submit a response.");
            return;
        }
    
        const userId = user.id;
    
        try {
            const response = await axios.post("http://localhost:9878/response", {
                user_id: userId,
                name,
                experience,
                specific_change: specifyChange,
                video_url: videoUrl
            });
    
            // Retrieve existing reviews
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
            
            // Log the reviews to check if they're being saved correctly
            console.log("Updated Reviews:", reviews);
    
            alert("Response submitted successfully!");
        } catch (error) {
            console.error("Error submitting response:", error);
            alert(error.response?.data || "An error occurred while submitting your response.");
        }
    };
    
    
    
    

    return (
        <>
            <div className="bg-purple-500">
                <img src={imgg} alt="Logo" className="mr-2 h-[5rem]" />
            </div>

            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-center text-2xl font-bold">Vansh Business Work</h1>
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

                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                    <input type="text" id="name" placeholder="Enter your name" 
                           value={name} onChange={(e) => setName(e.target.value)} 
                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />

                    <label htmlFor="workDone" className="block text-sm font-medium text-gray-700 mt-4">Please specify the work we have done for you:</label>
                    <input type="text" id="workDone" placeholder="Describe the work" 
                           value={workDone} onChange={(e) => setWorkDone(e.target.value)} 
                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />

                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mt-4">Please specify the overall experience:</label>
                    <input type="text" id="experience" placeholder="Share your experience" 
                           value={experience} onChange={(e) => setExperience(e.target.value)} 
                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />

                    <label htmlFor="changes" className="block text-sm font-medium text-gray-700 mt-4">Please specify the changes you want in our services:</label>
                    <input type="text" id="changes" placeholder="List any changes" 
                           value={specifyChange} onChange={(e) => setSpecifyChange(e.target.value)} 
                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />

                    <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mt-4">Video Url (If any)</label>
                    <input type="text" id="videoUrl" placeholder="Enter video URL" 
                           value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} 
                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />

                    <button type="submit" className="mt-6 w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600">Submit</button>
                </form>
            </div>
        </>
    );
}

export default Response;
