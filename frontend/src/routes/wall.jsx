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

  // Fetch layout from URL query parameters
  useEffect(() => {
    const layoutType = searchParams.get("layout");
    setLayout(layoutType || "fixed");
  }, [searchParams]);

  // Fetch testimonials from backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        console.error("User ID not found in localStorage");
        return;
      }

      const userId = user.id;

      try {
        console.log(`Fetching testimonials for userId: ${userId}`);
        const response = await fetch(
          `https://testiview-backend.vercel.app/testimonials?userId=${userId}`
        );

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Data received from API:", data);

        setTestimonials(data); // Set the testimonials state
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }
    };

    fetchTestimonials();
  }, []);

  // State for carousel navigation (for layout "carousel")
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = testimonials.length;

  // Function to move the carousel (for layout "carousel")
  const moveSlide = (step) => {
    let newIndex = currentIndex + step;
    if (newIndex < 0) {
      newIndex = totalCards - 1;
    } else if (newIndex >= totalCards) {
      newIndex = 0;
    }
    setCurrentIndex(newIndex);
  };

  // Embed code for each layout
  const getEmbedCode = () => {
    switch (layout) {
      case "animated":
        return `<script type="text/javascript" src="https://testimonial.to/js/iframeResizer.min.js"></script>
<iframe id='testimonialto-vansh-test-review-tag-all-light-animated' src="https://testiview-frontend.vercel.app/wall?layout=animated" frameborder="0" scrolling="no" width="100%"></iframe>
<script type="text/javascript">
    iFrameResize({log: false, checkOrigin: false}, '#testimonialto-vansh-test-review-tag-all-light-animated');
</script>
`;
      case "fixed":
        return `<script type="text/javascript" src="https://testimonial.to/js/iframeResizer.min.js"></script>
                <iframe id='testimonialto-vansh-test-review-tag-all-light' src="https://testiview-frontend.vercel.app/wall?layout=fixed" frameborder="0" scrolling="no" width="100%"></iframe>
                <script type="text/javascript">iFrameResize({log: false, checkOrigin: false}, '#testimonialto-vansh-test-review-tag-all-light');</script>`;
      case "carousel":
        return `<script type="text/javascript" src="https://testimonial.to/js/iframeResizer.min.js"></script>
                <iframe id='testimonialto-carousel-vansh-test-review-tag-all-light' src="https://testiview-frontend.vercel.app/wall?layout=carousel" frameborder="0" scrolling="no" width="100%"></iframe>
                <script type="text/javascript">iFrameResize({log: false, checkOrigin: false}, '#testimonialto-carousel-vansh-test-review-tag-all-light');</script>`;
      default:
        return "";
    }
  };

  const embedCode = getEmbedCode();

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Wall of Testimonials</h1>

      {/* Render Layouts */}

      {/* Fixed Layout */}
      {layout === "fixed" && (
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
      {layout === "animated" && (
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
      {layout === "carousel" && (
        <div className="relative w-full max-w-4xl mx-auto mt-10">
          {/* Left Arrow Button */}
          <button
            onClick={() => moveSlide(-1)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg z-10"
          >
            &#10094;
          </button>

          {/* Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-full p-5">
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
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => moveSlide(1)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg z-10"
          >
            &#10095;
          </button>
        </div>
      )}

      {/* Embed Code Section */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Embed Code:</h2>
        <div className="flex items-center">
          <pre className="whitespace-pre-wrap p-2 bg-gray-200 rounded-lg text-sm flex-grow">
            {embedCode}
          </pre>
          <button
            onClick={() => copyToClipboard(embedCode)}
            className="ml-2 bg-blue-500 text-white py-1 px-2 rounded"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wall;
