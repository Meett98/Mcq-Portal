import dotenv from "dotenv";

// Load .env file
dotenv.config();
const {
  PORT = 9999,
  BODY_LIMIT = "5mb",
  ALLOW_CORS_ORIGIN = "",
  ALLOW_CORS_METHODS = "",
} = process.env;

const REQUIRED_CONFIG = ["ALLOW_CORS_ORIGIN", "ALLOW_CORS_METHODS"];

REQUIRED_CONFIG.forEach((key) => {
  if (!process.env[key]) {
    console.error("[Error] Missing SERVER Config:", key);
    return process.exit(1);
  }
});

const CORS_OPTIONS = {
  methods: ALLOW_CORS_METHODS,
  origin: ALLOW_CORS_ORIGIN,
  credentials: true,
};

const SERVER_CONFIG = {
  PORT,
  BODY_LIMIT,
  CORS_OPTIONS,
};

export default SERVER_CONFIG
