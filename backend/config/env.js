import dotenv from "dotenv";
dotenv.config();

export const config ={
     port: process.env.PORT || 3000,

    databaseUrl: process.env.DATABASE_URL,

    jwtSecret: process.env.JWT_SECRET,

    geminiApiKey: process.env.GEMINI_API_KEY,

    tavilyApiKey: process.env.TAVILY_API_KEY,
    frontendUrl: process.env.FRONTEND_URL,
};

// config/env.js

const required = [
    "DATABASE_URL",
    "JWT_SECRET",
    "GEMINI_API_KEY",
    "TAVILY_API_KEY",
    'FRONTEND_URL'
];

for (const key of required) {
    if (!process.env[key]) {
        throw new Error(`Missing environment variable: ${key}`);
    }
}