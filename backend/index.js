import express from 'express';
import dotenv from 'dotenv'; 
import pg from 'pg';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const port = process.env.PORT || 9890;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

app.use(cors({
  origin: 'https://testiview-frontend.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URLS,
  ssl: { rejectUnauthorized: false },
});

app.get("/", (req, res) => {
  res.send("Welcome to the backend API");
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body; 

  try {
    const client = await pool.connect();
    const checkResult = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    if (checkResult.rows.length > 0) {
      return res.status(400).send("Email already exists");
    }

    const insertResult = await client.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id", [email, password]);
    const userId = insertResult.rows[0].id;
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });

    client.release();
    res.status(201).json({ message: "User registered successfully", userId, token });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).send("Internal Server Error"); 
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query("SELECT id, password FROM users WHERE email=$1", [email]);

    if (result.rows.length > 0) {
      const storedPassword = result.rows[0].password;

      if (password === storedPassword) {
        const userId = result.rows[0].id;
        const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });

        client.release();
        return res.status(200).json({ userId, token });
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

app.post("/response", async (req, res) => {
  const { user_id, name, experience, specific_change, video_url, rating } = req.body;

  console.log("Received data:", req.body);

  try {
    const userCheckResult = await pool.query("SELECT 1 FROM users WHERE id = $1", [user_id]);
    if (userCheckResult.rows.length === 0) {
      return res.status(400).send("User with the given user_id does not exist.");
    }

    const client = await pool.connect();
    await client.query(
      "INSERT INTO test_data (user_id, author_name, content, rating, video_url) VALUES ($1, $2, $3, $4, $5)",
      [user_id, name, experience || specific_change, rating, video_url]
    );

    client.release();
    res.status(201).send("Your response was saved successfully.");
  } catch (err) {
    console.error("Error during response saving:", err.message);
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/testimonials", async (req, res) => {
  const userId = req.query.userId;

  try {
    const client = await pool.connect();
    const query = userId 
      ? "SELECT * FROM test_data WHERE user_id = $1" 
      : "SELECT * FROM test_data";
    const result = await client.query(query, [userId]);

    client.release();
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching testimonials:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/testimonials-wall", async (req, res) => {
  const { userId, token } = req.query;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.userId !== parseInt(userId)) {
      return res.status(403).send("Invalid token or user ID mismatch");
    }

    const client = await pool.connect();
    const result = await client.query("SELECT * FROM test_data WHERE user_id = $1", [userId]);

    client.release();
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error verifying token or fetching testimonials:", err);
    res.status(401).send("Unauthorized or invalid token");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
