import express from "express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { authenticateUser } from './middleware/auth.js';

const app = express();

app.get('/protected-feature', authenticateUser, (req, res) => {
    // FastAPI usually stores the user identifier in the 'sub' field
    const userId = req.user.sub; 
    res.json({ data: `Successfully accessed by user ${userId}` });
});



const PORT = ENV.PORT || 3001;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log("Server is connected on PORT: ", PORT);
        })
    } catch (error) {
        console.error("🚒 Error connecting the server", error)
    }
}

startServer();