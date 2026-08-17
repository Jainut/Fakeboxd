"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const schema_1 = require("../drizzle/schema");
const express_1 = __importDefault(require("express"));
const db = (0, node_postgres_1.drizzle)(process.env.DATABASE_URL);
const router = express_1.default.Router();
router.post('/register/movie', async (req, res) => {
    const data = req.body;
    const movie = {
        title: data.title,
        description: data.description,
        durationMinutes: data.durationMinutes,
        releaseYear: data.releaseYear,
        coverUrl: data.coverUrl,
    };
    await db.insert(schema_1.movies).values(movie);
    res.status(201).json({ message: "Movie registered successfully!" });
});
exports.default = router;
