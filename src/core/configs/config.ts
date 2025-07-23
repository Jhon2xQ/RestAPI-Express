import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;

export const USER_TOKEN_TTL = 7200; // (in second) (20 hours)
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "secret";
