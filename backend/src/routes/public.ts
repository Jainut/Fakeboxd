// Imports ========

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { users } from '../../drizzle/schema';
import express from "express";
import bcrypt from "bcrypt";

// Imports ========


// Database and Router Setup ========

const db = drizzle(process.env.DATABASE_URL!);
const router = express.Router();

// User Registration Route ========

router.post('/register/user', async (req, res) => { // Sign up route for users
    const data = req.body;
    const hashedPassword = await bcrypt.hash(data.password_hash, 10); // Password hashing

    const userExists = await db.select().from(users).where(eq(users.email, data.email)).execute(); // User existence check for no duplicate
    const normalizedEmail = data.email.toLowerCase(); // Normalizing email to lowercase for consistency

    try {
    const user: typeof users.$inferInsert = {
        name: data.name,
        email: normalizedEmail,
        passwordHash: hashedPassword,
    }

    if(!data.name || !data.email || !data.password_hash) { // Error handling for missing fields
        return res.status(400).json({ message: "Missing required fields" });
    }

    if(!validEmail(normalizedEmail)) { // Error handling for invalid emails
        return res.status(400).json({ message: "Invalid email format, try another one" });
    }

    if(userExists.length > 0) { // Error handling for already registered emails
        return res.status(400).json({ message: "Email already registered" });
    }

    await db.insert(users).values(user); // Inserting data into the database

    return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: "Internal server error! Try again later" });
    }
});

function validEmail(email: string) { // Email validation function
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export default router; // Exporting route
