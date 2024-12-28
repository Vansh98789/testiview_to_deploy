import express from 'express';
import dotenv from 'dotenv'; 
import { Pool } from 'pg';  // Use Pool for connection pooling
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();  // Load environment variables

const app = express();
const port = process.env.PORT || 9890;

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',  // Make sure this is your frontend URL
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// Middleware for body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Database connection using pg.Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // Connection string from your database provider
  ssl: {
    rejectUnauthorized: false,  // Required for cloud databases (e.g., Heroku, Neon)
  },
});

// POST request for signup
app.post("/signup", async (req, res) => {
  const { email, password } = req.body; 

  try {
    const client = await pool.connect();  // Get a client from the pool
    const checkResult = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    if (checkResult.rows.length > 0) {
      return res.status(400).send("Email already exists");
    }

    await client.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
    client.release();  // Release the client back to the pool
    res.status(201).send("User registered successfully");
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
        client.release();  // Release the client back to the pool
        return res.status(200).json({ userId });
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

// POST request for response submission
app.post("/response", async (req, res) => {
  const { user_id, name, experience, specific_change, video_url } = req.body;
  
  try {
    const client = await pool.connect();  // Get a client from the pool
    await client.query(
      "INSERT INTO test_data (user_id, name, experience, specify_change, video_url) VALUES ($1, $2, $3, $4, $5)",
      [user_id, name, experience, specific_change, video_url]
    );
    client.release();  // Release the client back to the pool
    res.status(201).send("Your response saved successfully");
  } catch (err) {
    console.error("Error during response saving:", err);
    res.status(500).send("Internal Server Error");
  }
});

// GET request to fetch testimonials
app.get("/testimonials", async (req, res) => {
  const userId = req.query.userId; // Get userId from query parameters

  try {
    const client = await pool.connect();  // Get a client from the pool
    const result = userId 
      ? await client.query("SELECT * FROM test_data WHERE user_id = $1", [userId])
      : await client.query("SELECT * FROM test_data");  // Fetch all if no userId is provided

    client.release();  // Release the client back to the pool
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching testimonials:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Server listening
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
