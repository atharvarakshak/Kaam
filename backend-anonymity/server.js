import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv"
import helmet from "helmet";
import connectDB from "./config/connectDb.js"; 
import reportRoutes from "./routes/reportRoutes.js";


// Initialize app
const app = express();

// Middleware
dotenv.config();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());


// Connect to the database
connectDB();

// Routes
app.use("/api/reports", reportRoutes);

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
