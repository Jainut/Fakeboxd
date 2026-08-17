"use strict";
// Imports ========
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Imports ========
// Database and Router Setup ========
const db = (0, node_postgres_1.drizzle)(process.env.DATABASE_URL);
const router = express_1.default.Router();
// User Registration Route ========
router.post('/register/user', async (req, res) => {
    const data = req.body;
    const hashedPassword = await bcrypt_1.default.hash(data.password_hash, 10); // Password hashing
    const userExists = await db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, data.email)).execute(); // User existence check for no duplicate
    const normalizedEmail = data.email.toLowerCase(); // Normalizing email to lowercase for consistency
    try {
        const user = {
            name: data.name,
            email: normalizedEmail,
            passwordHash: hashedPassword,
        };
        if (!data.name || !data.email || !data.password_hash) { // Error handling for missing fields
            return res.status(400).json({ message: "Missing required fields" });
        }
        if (!validEmail(normalizedEmail)) { // Error handling for invalid emails
            return res.status(400).json({ message: "Invalid email format, try another one" });
        }
        if (userExists.length > 0) { // Error handling for already registered emails
            return res.status(400).json({ message: "Email already registered" });
        }
        await db.insert(schema_1.users).values(user); // Inserting data into the database
        return res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: "Internal server error! Try again later" });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) { // Error handling for invalid data types
            return res.status(400).json({ message: "Missing email or password" });
        }
        const normalizedEmail = email.toLowerCase(); // Normalizing email to lowercase for consistency
        const [user] = await db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, normalizedEmail)).limit(1); // Fetching user from the database
        if (!user) { // Error handling for unregistered emails
            return res.status(400).json({ message: "Email or password is incorrect" });
        }
        const passwordMatch = await bcrypt_1.default.compare(password, user.passwordHash); // Password comparison
        if (!passwordMatch) { // Error handling for incorrect passwords
            return res.status(400).json({ message: "Email or password is incorrect" });
        }
        return res.status(200).json({ message: "User logged in successfully" });
    }
    catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: "Internal server error! Try again later" });
    }
});
function validEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
exports.default = router; // Exporting route
