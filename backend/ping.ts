// Imports ====

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import { users } from './drizzle/schema';
import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import { createServer } from "http";
import { movies } from './drizzle/schema';

// Imports ====

const db = drizzle(process.env.DATABASE_URL!);
const router = express.Router();

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
}));

const PORT = process.env.PORT || 3001;

const server = createServer(app);

const selfPing = () => {
    setInterval(async () => {
        try {
            await fetch(`http://localhost:${PORT}/ping`)
            console.log('Pingou com sucesso, twin ✌️😭')
        } catch (error) {
            console.error('Error pra pingar, twin ✌️😭', error);
        }
    }, 60_000); // Envia um ping a cada 60 segundos
}

const dbPing = () => {
    setInterval(async () => {
        try {
            await db.execute(sql`SELECT 1`);
            console.log('DB Ping success 🔥');
        } catch (error) {
            console.error('DB Ping error:', error);
        }
    }, 259_200_000); // Envia um ping a cada 72 horas
}

app.get('/ping', (req, res) => {
    res.sendStatus(200);
});

server.listen(PORT, () => {
    console.log(`Rodando ping na porta: ${PORT}`);
    selfPing();
    dbPing();
});