import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ReactPlayer from "react-player";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Wall = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [layout, setLayout] = useState("fixed");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();

    // Fetch layout from URL
    useEffect(() => {
        const layoutType = searchParams.get("layout");
        setLayout(layoutType || "fixed");
    }, [searchParams]);

    // Fetch testimonials from backend with error handling and logging
    useEffect(() => {
        const fetchTestimonials = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user?.id) {
                    throw new Error("User ID not found in localStorage");
                }

                const response = await fetch(`https://testiview-backend.vercel.app/testimonials?userId=${user.id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log("Fetched testimonials:", data); // Debug log
                
                if (!Array.isArray(data)) {
                    throw new Error("Received data is not an array");
                }
                
                setTestimonials(data);
            } catch (err) {
                console.error("Error fetching testimonials:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    // Testimonial Card Component for DRY code
    const TestimonialCard = ({ testimonial, className = "" }) => (
        <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
            {testimonial ? (
                <>
                    <p className="font-semibold mb-2">
                        {testimonial.experience || "No experience provided"}
                    </p>
                    <p className="text-gray-600 mb-3">
                        - {testimonial.name || "Anonymous"}
                    </p>
                    {testimonial.video_url && (
                        <div className="mt-4">
                            <ReactPlayer
                                url={testimonial.video_url}
                                controls
                                width="100%"
                                height="200px"
                                onError={(e) => console.error("Video player error:", e)}
                            />
                        </div>
                    )}
                </>
            ) : (
                <p>No testimonial data available</p>
            )}
        </div>
    );

    // Slider settings
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    if (loading) {
        return <div className="text-center p-4">Loading testimonials...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">Error: {error}</div>;
    }

    if (!testimonials.length) {
        return <div className="text-center p-4">No testimonials available</div>;
    }

    return (
        <div className="container mx-auto p-6 bg-gray-50 rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Wall of Testimonials</h1>

            {/* Fixed Layout */}
            {layout === "fixed" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} />
                    ))}
                </div>
            )}

            {/* Animated Layout */}
            {layout === "animated" && (
                <div className="overflow-hidden relative">
                    <div className="flex flex-wrap justify-center">
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard 
                                key={index} 
                                testimonial={testimonial}
                                className="w-full md:w-1/4 mx-2 my-4 animate-slide-up bg-purple-100"
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Carousel Layout */}
            {layout === "carousel" && (
                <div className="max-w-3xl mx-auto">
                    <Slider {...sliderSettings}>
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard 
                                key={index} 
                                testimonial={testimonial}
                                className="bg-gray-100"
                            />
                        ))}
                    </Slider>
                </div>
            )}

            {/* Rest of your embed code section remains the same */}
        </div>
    );
};

export default Wall;
