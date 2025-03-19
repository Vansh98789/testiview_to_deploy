import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Wall = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [layout, setLayout] = useState("fixed");
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add iFrameResizer content script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/iframe-resizer@4.3.2/js/iframeResizer.contentWindow.min.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Fetch layout from URL query parameters
  useEffect(() => {
    const layoutType = searchParams.get("layout");
    setLayout(layoutType || "fixed");
  }, [searchParams]);

  // Fetch testimonials from backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      // Get userId from URL parameters
      const userId = searchParams.get("userId");
      
      if (!userId) {
        // Fall back to localStorage if URL doesn't have userId
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.userId) {
          setError("User ID not found. Please provide a userId in the URL or log in.");
          setLoading(false);
          return;
        }
        
        // Use userId from localStorage as fallback
        const localUserId = user.userId;
        fetchData(localUserId);
      } else {
        // Use userId from URL
        fetchData(userId);
      }
    };

    // Function to fetch data with a specific userId
    const fetchData = async (userId) => {
      try {
        console.log(`Fetching testimonials for userId: ${userId}`);
        
        // Use the endpoint from your backend
        const response = await fetch(
          `${process.env.REACT_APP_API_URL || 'https://testiview-backend.vercel.app'}/testimonials?userId=${userId}`
        );
        
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Data received from API:", data);
        setTestimonials(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchTestimonials();
  }, [searchParams]);

  // Embed code for each layout
  const getEmbedCode = () => {
    // Get the current user ID for the embed code
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId || "";
    
    // Base URL with userId parameter
    const baseUrl = `https://testiview-frontend.vercel.app/wall?userId=${userId}&layout=`;
    
    switch (layout) {
      case "animated":
        return `<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/iframe-resizer@4.3.2/js/iframeResizer.min.js"></script>
<iframe id="testiview-wall-animated" src="${baseUrl}animated" frameborder="0" scrolling="no" width="100%"></iframe>
<script type="text/javascript">
    iFrameResize({log: false, checkOrigin: false}, '#testiview-wall-animated');
</script>`;
      
      case "fixed":
        return `<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/iframe-resizer@4.3.2/js/iframeResizer.min.js"></script>
<iframe 
  id="testiview-wall-fixed" 
  src="${baseUrl}fixed" 
  frameborder="0" 
  scrolling="no" 
  width="100%"
></iframe>
<script type="text/javascript">
  iFrameResize({log: false, checkOrigin: false}, '#testiview-wall-fixed');
</script>`;
      
      case "carousel":
        return `<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/iframe-resizer@4.3.2/js/iframeResizer.min.js"></script>
<iframe id="testiview-wall-carousel" src="${baseUrl}carousel" frameborder="0" scrolling="no" width="100%"></iframe>
<script type="text/javascript">
  iFrameResize({log: false, checkOrigin: false}, '#testiview-wall-carousel');
</script>`;
      
      default:
        return "";
    }
  };

  const embedCode = getEmbedCode();

  // Copy to clipboard function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode)
      .then(() => {
        alert("Embed code copied to clipboard!");
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Wall of Testimonials</h1>
      
      {/* Loading & Error Handling */}
      {loading && <div className="text-center">Loading testimonials...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      
      {/* Render Layouts */}
      {/* Fixed Layout */}
      {layout === "fixed" && !loading && !error && testimonials.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id || index} className="bg-white p-4 rounded-lg shadow">
              <p className="font-semibold">{testimonial.content}</p>
              <p className="text-gray-600">- {testimonial.author_name}</p>
              {testimonial.rating && (
                <div className="mt-2 flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{testimonial.rating}/5</span>
                </div>
              )}
              {testimonial.video_url && (
                <div className="mt-4">
                  <ReactPlayer
                    url={testimonial.video_url}
                    controls
                    width="100%"
                    height="200px"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Animated Layout */}
      {layout === "animated" && !loading && !error && testimonials.length > 0 && (
        <div className="overflow-hidden relative">
          <div className="flex flex-wrap justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id || index}
                className="bg-purple-100 p-4 rounded-lg shadow-lg animate-slide-up w-full md:w-1/3 lg:w-1/4 mx-2 my-4"
                style={{
                  animation: `fadeIn 0.5s ease-in-out ${index * 0.2}s forwards, 
                             slideUp 0.5s ease-in-out ${index * 0.2}s forwards`
                }}
              >
                <p className="font-bold text-purple-700">{testimonial.content}</p>
                <p className="text-purple-600">- {testimonial.author_name}</p>
                {testimonial.rating && (
                  <div className="mt-2 flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span>{testimonial.rating}/5</span>
                  </div>
                )}
                {testimonial.video_url && (
                  <div className="mt-4">
                    <ReactPlayer
                      url={testimonial.video_url}
                      controls
                      width="100%"
                      height="200px"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Carousel Layout */}
      {layout === "carousel" && !loading && !error && testimonials.length > 0 && (
        <div className="relative w-full max-w-4xl mx-auto mt-10">
          {/* Carousel (react-slick) */}
          <Slider
            dots={true}
            infinite={testimonials.length > 1}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            arrows={testimonials.length > 1}
            autoplay={true}
            autoplaySpeed={5000}
          >
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id || index} className="p-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {testimonial.video_url ? (
                    <ReactPlayer
                      url={testimonial.video_url}
                      controls
                      width="100%"
                      height="200px"
                    />
                  ) : (
                    <div className="w-full h-16 bg-gray-200 flex items-center justify-center">
                      <span className="text-yellow-500 text-3xl mr-2">★</span>
                      <span className="text-2xl font-bold">{testimonial.rating || 5}/5</span>
                    </div>
                  )}
                  <div className="p-4 text-center">
                    <p className="font-semibold text-lg">{testimonial.content}</p>
                    <p className="text-gray-600 mt-2">- {testimonial.author_name}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
      
      {/* No testimonials message */}
      {!loading && !error && testimonials.length === 0 && (
        <div className="text-center p-10">
          <p className="text-xl text-gray-600">No testimonials found for this user.</p>
        </div>
      )}
      
      {/* Embed Code Section - Show only when not embedded (when localStorage has user data) */}
      {JSON.parse(localStorage.getItem("user"))?.userId && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Embed Code:</h2>
          <div className="flex flex-col">
            <pre className="whitespace-pre-wrap p-2 bg-gray-200 rounded-lg text-sm mb-2 overflow-x-auto">
              {embedCode}
            </pre>
            <button 
              onClick={copyToClipboard}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded self-end"
            >
              Copy Embed Code
            </button>
          </div>
        </div>
      )}
      
      {/* Add this CSS for animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); }
          to { transform: translateY(0); }
        }
        
        .animate-slide-up {
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Wall;
