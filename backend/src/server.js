import express from "express";
import path from "path";
import cors from "cors";


import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";

import chatRoutes from "./routes/chatRoute.js";
import sessionRoutes from "./routes/sessionRoute.js";

const app = express();



// middleware
app.use(express.json());
// credentials:true meaning?? => server allows a browser to include cookies on request
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));


app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

// make our app ready for deployment


const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();