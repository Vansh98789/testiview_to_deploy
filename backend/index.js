import express from "express";
import dotenv from "dotenv"; 
import pg from "pg";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config(); 

const app = express();
const port = process.env.PORT || 9890;

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
}));


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Database connection
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

db.connect();

// POST request for signup
app.post("/signup", async (req, res) => {
    const { email, password } = req.body; 

    try {
        const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (checkResult.rows.length > 0) {
            return res.status(400).send("Email already exists");
        }

        await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
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
        const result = await db.query("SELECT id, password FROM users WHERE email=$1", [email]);
        
        if (result.rows.length > 0) {
            const storedPassword = result.rows[0].password;

            if (password === storedPassword) {
                const userId = result.rows[0].id;
                return res.status(200).json({ userId });
            } else {
                return res.status(400).send("Wrong password");
            }
        } else {
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
        await db.query(
            "INSERT INTO test_data (user_id, name, experience, specify_change, video_url) VALUES ($1, $2, $3, $4, $5)",
            [user_id, name, experience, specific_change, video_url]
        );
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
        // If userId is provided, filter testimonials by userId
        const result = userId 
            ? await db.query("SELECT * FROM test_data WHERE user_id = $1", [userId])
            : await db.query("SELECT * FROM test_data"); // Fetch all if no userId is provided

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
