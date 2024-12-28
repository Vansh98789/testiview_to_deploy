1)CHANGE TESTINOMIAL CODE AND TESTINOMIAL IN DEMO PAGE
2) copy button not working in demo page
3)login is not working in home page


//database->
//////user to store login details/////
CREATE TABLE users (
  id SERIAL PRIMARY KEY,  
  email VARCHAR(100) UNIQUE NOT NULL,  
  password VARCHAR(255) NOT NULL, 
  created_at TIMESTAMP DEFAULT NOW() 
);

///// testinomial data//////
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,  -- The user receiving the testimonial
  author_name VARCHAR(100),  -- Name of the person giving the testimonial
  content TEXT NOT NULL,  -- The testimonial message
  rating INT CHECK (rating >= 1 AND rating <= 5),  -- Optional rating (if included)
  video_url VARCHAR(255),  -- URL of the video testimonial (stored in cloud storage)
  created_at TIMESTAMP DEFAULT NOW()  -- Timestamp for when the testimonial was submitted
);

//// store the link of form where they can submit the testinomial /////

/////store the link of wall of review to display on other website/////
CREATE TABLE embed_codes (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  embed_code TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);


signup page complete to work