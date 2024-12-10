import express from "express";
import { submitReport, getReports } from "../controller/reportController.js";

const router = express.Router();

// POST: Submit a new report
router.post("/", submitReport);

// GET: Get all reports (for testing/admin purposes)
router.get("/", getReports);

// Default export the router
export default router;
