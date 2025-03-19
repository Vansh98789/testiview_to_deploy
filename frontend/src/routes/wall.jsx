import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // For URL query params
import ReactPlayer from "react-player";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Wall = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [layout, setLayout] = useState("fixed");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // To get query params from the URL
  const location = useLocation();

  // Fetch userId from URL or use cookies, state management, etc.
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");

  // Fetch layout from URL query parameters
  useEffect(() => {
    const layoutType = searchParams.get("layout");
    setLayout(layoutType || "fixed");
  }, [searchParams]);

  // Fetch testimonials from backend based on userId
  useEffect(() => {
    const fetchTestimonials = async () => {
      if (!userId) {
        console.error("User ID is required");
        return;
      }

      try {
        const response = await fetch(`https://your-backend-url.com/testimonials?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTestimonials(data); // Set the testimonials state
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials. Please try again later.");
        setLoading(false); // Set loading to false on error
      }
    };

    fetchTestimonials();
  }, [userId]); // Run this effect when userId changes

  // Embed code for each layout
  const getEmbedCode = () => {
    switch (layout) {
      case "animated":
        return (
          <iframe
            id="testimonialto-vansh-test-review-tag-all-light-animated"
            src="https://testiview-frontend.vercel.app/wall?layout=animated"
            frameBorder="0"
            scrolling="no"
            width="100%"
          />
        );
      case "fixed":
        return (
          <iframe
            id="testimonialto-vansh-test-review-tag-all-light"
            src="https://testiview-frontend.vercel.app/wall?layout=fixed"
            frameBorder="0"
            scrolling="no"
            width="100%"
            style={{ height: "800px" }}
          />
        );
      case "carousel":
        return (
          <iframe
            id="testimonialto-carousel-vansh-test-review-tag-all-light"
            src="https://testiview-frontend.vercel.app/wall?layout=carousel"
            frameBorder="0"
            scrolling="no"
            width="100%"
          />
        );
      default:
        return "";
    }
  };

  const embedCode = getEmbedCode();

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Wall of Testimonials</h1>

      {/* Loading & Error Handling */}
      {loading && <div className="text-center">Loading testimonials...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {/* Render Layouts */}
      {layout === "fixed" && !loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <p className="font-semibold">{testimonial.content}</p>
              <p className="text-gray-600">- {testimonial.author_name}</p>
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
      {layout === "animated" && !loading && !error && (
        <div className="overflow-hidden relative">
          <div className="flex flex-wrap justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-purple-100 p-4 rounded-lg shadow-lg animate-slide-up w-1/4 mx-2 my-4"
              >
                <p className="font-bold text-purple-700">{testimonial.content}</p>
                <p className="text-purple-600">- {testimonial.author_name}</p>
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
      {layout === "carousel" && !loading && !error && (
        <div className="relative w-full max-w-4xl mx-auto mt-10">
          <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1} arrows={true}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {testimonial.video_url ? (
                    <ReactPlayer
                      url={testimonial.video_url}
                      controls
                      width="100%"
                      height="200px"
                    />
                  ) : (
                    <img
                      className="w-full h-48 object-cover"
                      src="https://via.placeholder.com/150"
                      alt="Placeholder"
                    />
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

      {/* Embed Code Section */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Embed Code:</h2>
        <div className="flex items-center">
          <pre className="whitespace-pre-wrap p-2 bg-gray-200 rounded-lg text-sm flex-grow">
            {embedCode}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Wall;
