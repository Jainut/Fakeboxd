import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import express from "express";
import bcrypt from "bcrypt";

const db = drizzle(process.env.DATABASE_URL!);
const router = express.Router();

router.get("/ping", (req, res) => {
    res.status(200).json({ message: "Pong!" });
});

export default router;