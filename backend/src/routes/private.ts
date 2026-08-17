import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { movies } from '../drizzle/schema';
import express from "express";
import bcrypt from "bcrypt";

const db = drizzle(process.env.DATABASE_URL!);
const router = express.Router();

router.post('/register/movie', async (req, res) => {
    const data = req.body;

    const movie: typeof movies.$inferInsert = {
        title: data.title,
        description: data.description,
        durationMinutes: data.durationMinutes,
        releaseYear: data.releaseYear,
        coverUrl: data.coverUrl,
    };

    await db.insert(movies).values(movie);

    res.status(201).json({ message: "Movie registered successfully!" });
});

export default router;