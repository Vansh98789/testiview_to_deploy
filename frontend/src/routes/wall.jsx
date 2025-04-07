import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ReactPlayer from "react-player";

const Wall = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [layout, setLayout] = useState("fixed");
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const layoutType = searchParams.get("layout");
    setLayout(layoutType || "fixed");
  }, [searchParams]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const userId = searchParams.get("userId");
      const token = searchParams.get("token");

      if (!userId || !token) {
        setError("Missing userId or token in URL.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://testiview-backend.vercel.app/testimonials-wall?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setTestimonials(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [searchParams]);

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Wall of Testimonials</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
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
    </div>
  );
};

export default Wall;
