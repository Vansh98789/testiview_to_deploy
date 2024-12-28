CREATE TABLE users (
  id SERIAL PRIMARY KEY,  
  email VARCHAR(100) UNIQUE NOT NULL,  
  password VARCHAR(255) NOT NULL, 
  created_at TIMESTAMP DEFAULT NOW() 
);


CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,  -- The user receiving the testimonial
  author_name VARCHAR(100),  -- Name of the person giving the testimonial
  content TEXT NOT NULL,  -- The testimonial message
  rating INT CHECK (rating >= 1 AND rating <= 5),  -- Optional rating (if included)
  video_url VARCHAR(255),  -- URL of the video testimonial (stored in cloud storage)
  created_at TIMESTAMP DEFAULT NOW()  -- Timestamp for when the testimonial was submitted
);

CREATE TABLE embed_codes (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  embed_code TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
