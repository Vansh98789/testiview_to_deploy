import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ReactPlayer from "react-player";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Wall = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [layout, setLayout] = useState("fixed");
  const [searchParams] = useSearchParams();

  // Fetch layout from URL query parameters
  useEffect(() => {
    const layoutType = searchParams.get("layout");
    setLayout(layoutType || "fixed");
  }, [searchParams]);

  // Fetch testimonials from the backend
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

        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        // Log the full response for debugging
        const data = await response.json();
        console.log("Data received from API:", data);

        setTestimonials(data); // Set the testimonials state
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }
    };

    fetchTestimonials();
  }, []);

  // Copy embed code to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  // Embed code for each layout
  const getEmbedCode = () => {
    switch (layout) {
      case "animated":
        return `<iframe height="800px" id='testimonialto-vansh-test-review-tag-all-light-animated' src="https://testiview-frontend.vercel.app/wall?layout=animated" frameborder="0" scrolling="no" width="100%"></iframe>`;
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

  // Slick Carousel settings
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Infinite loop scrolling
    speed: 500, // Transition speed
    slidesToShow: 3, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at a time
    centerMode: true, // Center current slide
    focusOnSelect: true, // Focus on selected slide
    arrows: true, // Show next/previous arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // 2 slides on medium screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, // 1 slide on smaller screens
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Wall of Testimonials</h1>

      {/* Render Layout */}
      {layout === "carousel" && (
        <Slider {...settings}>
          {testimonials.length === 0 ? (
            <p>No testimonials available at the moment.</p>
          ) : (
            testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="carousel-card bg-white p-6 rounded-lg shadow-lg m-4"
              >
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
            ))
          )}
        </Slider>
      )}

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
