// Load environment variables
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import startServer from "./startServer.mjs";
import connectToDB from "./connectToDB.mjs";


const app = express();

// Main execution
(async () => {
  const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mcq_portal";
  // MongoDB connection
  await connectToDB(MONGO_URI);
  await startServer();
})();
