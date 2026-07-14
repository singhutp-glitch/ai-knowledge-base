import cors from "cors";
import { config } from "../../config/env.js";

const allowedOrigins = [
    "http://localhost:5173",
    config.frontendUrl,
].filter(Boolean);
console.log(allowedOrigins);
export const corsMiddleware = cors({
    origin(origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
});