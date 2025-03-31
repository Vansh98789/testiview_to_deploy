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
          `https://testiview-backend.vercel.app/testimonials-wall?userId=${userId}`
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
  }, []);

  // Handle iframe resizing after load
  useEffect(() => {
    const iframe = document.getElementById("testimonialto-vansh-test-review-tag-all-light");
    if (iframe) {
      iframe.onload = () => {
        console.log("Iframe loaded. Sending resize message.");
        iframe.contentWindow.postMessage("resize", "https://testiview-frontend.vercel.app");
      };
    }
  }, [layout]); // Runs when layout changes

  // Embed code for each layout
  const getEmbedCode = () => {
    switch (layout) {
      case "animated":
        return `<script type="text/javascript">
          document.addEventListener("DOMContentLoaded", function() {
            const iframe = document.getElementById('testimonialto-vansh-test-review-tag-all-light-animated');
            if (iframe) {
              iframe.onload = () => {
                iframe.contentWindow.postMessage("resize", "https://testiview-frontend.vercel.app");
              };
            }
          });
        </script>
        <iframe 
          id='testimonialto-vansh-test-review-tag-all-light-animated' 
          src="https://testiview-frontend.vercel.app/wall?layout=animated" 
          frameborder="0" 
          scrolling="no" 
          width="100%">
        </iframe>
        <script type="text/javascript">
          iFrameResize({ log: false, checkOrigin: false }, '#testimonialto-vansh-test-review-tag-all-light-animated');
        </script>`;

      case "fixed":
        return `<script type="text/javascript">
          document.addEventListener("DOMContentLoaded", function() {
            const iframe = document.getElementById('testimonialto-vansh-test-review-tag-all-light');
            if (iframe) {
              iframe.onload = () => {
                iframe.contentWindow.postMessage("resize", "https://testiview-frontend.vercel.app");
              };
            }
          });
        </script>
        <iframe 
          id='testimonialto-vansh-test-review-tag-all-light' 
          src="https://testiview-frontend.vercel.app/wall?layout=fixed" 
          frameborder="0" 
          scrolling="no" 
          width="100%" 
          style="height: 800px;">
        </iframe>
        <script type="text/javascript">
          iFrameResize({ log: false, checkOrigin: false }, '#testimonialto-vansh-test-review-tag-all-light');
        </script>`;

      case "carousel":
        return `<script type="text/javascript">
          document.addEventListener("DOMContentLoaded", function() {
            const iframe = document.getElementById('testimonialto-carousel-vansh-test-review-tag-all-light');
            if (iframe) {
              iframe.onload = () => {
                iframe.contentWindow.postMessage("resize", "https://testiview-frontend.vercel.app");
              };
            }
          });
        </script>
        <iframe 
          id='testimonialto-carousel-vansh-test-review-tag-all-light' 
          src="https://testiview-frontend.vercel.app/wall?layout=carousel" 
          frameborder="0" 
          scrolling="no" 
          width="100%">
        </iframe>
        <script type="text/javascript">
          iFrameResize({ log: false, checkOrigin: false }, '#testimonialto-carousel-vansh-test-review-tag-all-light');
        </script>`;

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
