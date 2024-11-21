// Load environment variables
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import Routes from "./api/routes/index.mjs";
import SERVER_CONFIG from "./config/SERVER_CONFIG.mjs";

const { BODY_LIMIT, CORS_OPTIONS } = SERVER_CONFIG;

const startServer = async () => {
    const app = express();
  
    // Middleware setup
    app.use(cookieParser());
    app.use(cors(CORS_OPTIONS));
    app.use(express.json({ limit: BODY_LIMIT }));
    app.use(express.urlencoded({ limit: BODY_LIMIT, extended: true }));
    app.use(helmet());
  
    // Initialize routes
    Routes.forEach(({ path, router }) => {
        app.use(path, router);
      });
  
    // Start the server
    app.listen(SERVER_CONFIG.PORT, () => {
      console.log(`Server running on port ${SERVER_CONFIG.PORT}`);
    });
  
    return app;
  };

export default startServer