import express from 'express';
import dotenv from 'dotenv'; 
import pg from 'pg';  // Import the entire pg module
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';  // Add JWT for token generation

dotenv.config();  // Load environment variables

const app = express();
const port = process.env.PORT || 9890;
const JWT_SECRET = process.env.JWT_SECRET || 'testiview-secret-key';  // Use environment variable in production

// CORS configuration
app.use(cors({
  origin: ['https://testiview-frontend.vercel.app', '*'],  // Allow frontend and embedded views
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware for body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Database connection using pg.Pool
const { Pool } = pg;  // Destructure Pool from the imported pg module
const pool = new Pool({
  connectionString: process.env.DATABASE_URLS,  // Connection string from your database provider
  ssl: {
    rejectUnauthorized: false,  // Required for cloud databases (e.g., Heroku, Neon)
  },
});

// Handle GET requests to the root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the backend API");
});

// POST request for signup
app.post("/signup", async (req, res) => {
  const { email, password } = req.body; 
  try {
    const client = await pool.connect();  // Get a client from the pool
    const checkResult = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    
    if (checkResult.rows.length > 0) {
      client.release();
      return res.status(400).send("Email already exists");
    }
    
    const insertResult = await client.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id", 
      [email, password]
    );
    
    const userId = insertResult.rows[0].id;
    
    // Generate an embed token for the new user
    const token = generateEmbedToken(userId);
    
    client.release();  // Release the client back to the pool
    res.status(201).json({ 
      message: "User registered successfully", 
      userId: userId,
      embedToken: token
    });
    
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).send("Internal Server Error"); 
  }
});

// POST request for login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const client = await pool.connect();  // Get a client from the pool
    const result = await client.query("SELECT id, password FROM users WHERE email=$1", [email]);
    
    if (result.rows.length > 0) {
      const storedPassword = result.rows[0].password;
      if (password === storedPassword) {
        const userId = result.rows[0].id;
        
        // Generate an embed token
        const token = generateEmbedToken(userId);
        
        client.release();  // Release the client back to the pool
        return res.status(200).json({ 
          userId: userId,
          embedToken: token
        });
      } else {
        client.release();
        return res.status(400).send("Wrong password");
      }
    } else {
      client.release();
      return res.status(404).send("User not found");
    }
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).send("Internal Server Error");
  }
});

// Generate embed token for a user
function generateEmbedToken(userId) {
  return jwt.sign(
    { userId: userId, purpose: 'testimonial-embed' },
    JWT_SECRET,
    { expiresIn: '30d' } // Token valid for 30 days
  );
}

// Endpoint to regenerate embed token
app.post("/generate-embed-token", async (req, res) => {
  const { userId } = req.body;
  
  if (!userId) {
    return res.status(400).send("User ID is required");
  }
  
  try {
    // Check if user exists
    const client = await pool.connect();
    const userCheck = await client.query("SELECT 1 FROM users WHERE id = $1", [userId]);
    client.release();
    
    if (userCheck.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    
    // Generate a new token
    const token = generateEmbedToken(userId);
    
    res.status(200).json({ embedToken: token });
  } catch (err) {
    console.error("Error generating embed token:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.query.token;
  const userId = req.query.userId;
  
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Verify the token is for the correct user and purpose
    if (decoded.userId != userId || decoded.purpose !== 'testimonial-embed') {
      return res.status(403).json({ error: "Invalid token" });
    }
    
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// POST request for response submission
app.post("/response", async (req, res) => {
  const { user_id, name, experience, specific_change, video_url, rating } = req.body;
  // Log the received data for debugging purposes
  console.log("Received data:", req.body);
  try {
    // Step 1: Check if the user exists in the users table
    const userCheckResult = await pool.query("SELECT 1 FROM users WHERE id = $1", [user_id]);
    if (userCheckResult.rows.length === 0) {
      return res.status(400).send("User with the given user_id does not exist.");
    }
    const client = await pool.connect();  // Get a client from the pool
    // Insert the new response into the test_data table
    await client.query(
      "INSERT INTO test_data (user_id, author_name, content, rating, video_url) VALUES ($1, $2, $3, $4, $5)",
      [user_id, name, experience || specific_change, rating, video_url]
    );
    client.release();  // Release the client back to the pool
    // Send success response
    res.status(201).send("Your response was saved successfully.");
  } catch (err) {
    // Log error details for debugging
    console.error("Error during response saving:", err.message);
    console.error(err.stack);  // This gives the full stack trace for debugging
    res.status(500).send("Internal Server Error");
  }
});

// GET request to fetch testimonials
app.get("/testimonials", async (req, res) => {
  const userId = req.query.userId; // Get userId from query parameters
  try {
    const client = await pool.connect();  // Get a client from the pool
    // Query to fetch reviews for the specific user or all reviews if no userId is provided
    const query = userId 
      ? "SELECT * FROM test_data WHERE user_id = $1"  // Fetch reviews for specific user
      : "SELECT * FROM test_data";  // Fetch all reviews
    const result = await client.query(query, [userId]);
    client.release();  // Release the client back to the pool
    res.status(200).json(result.rows);  // Return reviews as a JSON response
  } catch (err) {
    console.error("Error fetching testimonials:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Authenticated endpoint for testimonial wall
app.get("/testimonials-wall", verifyToken, async (req, res) => {
  const userId = req.query.userId; // Already verified in verifyToken middleware
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM test_data WHERE user_id = $1", [userId]);
    client.release();
    
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching testimonials for wall:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Public endpoint to check if a token is valid
app.get("/verify-token", async (req, res) => {
  const { userId, token } = req.query;
  
  if (!userId || !token) {
    return res.status(400).json({ valid: false, error: "Missing userId or token" });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if the token is for the correct user and purpose
    const isValid = decoded.userId == userId && decoded.purpose === 'testimonial-embed';
    
    res.status(200).json({ valid: isValid });
  } catch (err) {
    res.status(200).json({ valid: false, error: "Invalid or expired token" });
  }
});

// Server listening
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
