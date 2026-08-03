import express from "express";
import cors from "cors";
import { createServer } from "http";
import publicRouter from "./routes/public";
import privateRouter from "./routes/private";

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
}));

const PORT = process.env.PORT || 3000;

const server = createServer(app);

app.use(express.json());
app.use('/', publicRouter);
app.use('/', privateRouter);

const selfPing = () => {
    setInterval(() => {
        fetch(`http://localhost:${PORT}/ping`)
            .then(() => console.log('Ping enviado com sucesso!'))
            .catch((error) => console.error('Erro ao enviar ping:', error));
    }, 60000); // Envia um ping a cada 60 segundos
}

server.listen(PORT, () => {
    console.log(`Rodando Fakeboxd na porta ${PORT}`);
    selfPing();
});

